import { generateCodeChallenge } from "./helpers";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URL;
const spotifyUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;

// Lock to prevent multiple simultaneous initializations (React StrictMode fix)
let isInitializing = false;

// Required scopes for the app
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
].join(" ");

/**
 * Main initialization function - checks for auth code or existing token
 */
export async function initializeSpotify() {
  // Prevent multiple simultaneous calls (React StrictMode runs useEffect twice)
  if (isInitializing) {
    console.log("Already initializing, skipping...");
    return;
  }
  isInitializing = true;

  console.log("=== initializeSpotify started ===");
  console.log("Current URL:", window.location.href);
  console.log("localStorage contents:", {
    code_verifier: localStorage.getItem("code_verifier") ? "exists" : "missing",
    token: localStorage.getItem("token") ? "exists" : "missing",
    expiry: localStorage.getItem("expiry"),
    userId: localStorage.getItem("userId"),
  });

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // If we have an authorization code, exchange it for a token
  if (code) {
    console.log("Found authorization code in URL");
    // Clean up URL immediately to prevent re-using the code on refresh
    window.history.replaceState({}, document.title, window.location.pathname);

    const codeVerifier = localStorage.getItem("code_verifier");

    if (!codeVerifier) {
      console.error("No code_verifier found - starting fresh authorization");
      localStorage.clear();
      isInitializing = false;
      await authorizeUser();
      return;
    }

    console.log("Exchanging code for token...");
    const tokenData = await getAccessToken(code);

    // If token exchange failed, DON'T auto-redirect to prevent loop
    // Just log the error - user can refresh to try again
    if (!tokenData) {
      console.error(
        "Token exchange failed - clear localStorage and refresh to try again"
      );
      isInitializing = false;
      return;
    }
    console.log("Token exchange successful!");
    isInitializing = false;
    return;
  }

  // If token is expired or doesn't exist, redirect to authorize
  if (isTokenExpired()) {
    console.log("Token expired or missing - redirecting to authorize");
    isInitializing = false;
    await authorizeUser();
    return;
  }

  console.log("Token valid - app ready");
  // Token exists and is valid - fetch user ID if we don't have it
  if (!localStorage.getItem("userId")) {
    const response = await makeApiRequest("me");
    if (response?.result?.id) {
      localStorage.setItem("userId", response.result.id);
    }
  }
  isInitializing = false;
}

/**
 * Redirect user to Spotify authorization page
 */
export async function authorizeUser() {
  // Generate fresh code verifier and challenge
  const { verifier, challenge } = await generateCodeChallenge();

  // Store verifier for token exchange
  localStorage.setItem("code_verifier", verifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

/**
 * Exchange authorization code for access token
 */
export async function getAccessToken(code) {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!code || !codeVerifier) {
    console.error("Missing code or code_verifier");
    return null;
  }

  try {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.error) {
      console.error("Token error:", data.error_description);
      localStorage.clear();
      return null;
    }

    if (data.access_token) {
      localStorage.setItem("token", JSON.stringify(data));
      const expiry = Date.now() + data.expires_in * 1000;
      localStorage.setItem("expiry", expiry);

      // Get user ID
      const userResponse = await fetch(`${spotifyUrl}/me`, {
        headers: {
          Authorization: `${data.token_type} ${data.access_token}`,
        },
      });
      const userData = await userResponse.json();
      if (userData.id) {
        localStorage.setItem("userId", userData.id);
      }
    }

    return data;
  } catch (error) {
    console.error("Error getting access token:", error.message);
    return null;
  }
}

/**
 * Refresh the access token using refresh_token
 */
export async function refreshAccessToken() {
  const tokenData = JSON.parse(localStorage.getItem("token"));

  if (!tokenData?.refresh_token) {
    localStorage.clear();
    await authorizeUser();
    return null;
  }

  try {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "refresh_token",
        refresh_token: tokenData.refresh_token,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.error) {
      console.error("Refresh token error:", data.error_description);
      localStorage.clear();
      await authorizeUser();
      return null;
    }

    if (data.access_token) {
      // Keep the refresh token if not returned in response
      const newTokenData = {
        ...data,
        refresh_token: data.refresh_token || tokenData.refresh_token,
      };
      localStorage.setItem("token", JSON.stringify(newTokenData));
      const expiry = Date.now() + data.expires_in * 1000;
      localStorage.setItem("expiry", expiry);
    }

    return data;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    localStorage.clear();
    await authorizeUser();
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired() {
  const currentTime = Date.now();
  const tokenExpiry = Number(localStorage.getItem("expiry") ?? 0);
  const token = localStorage.getItem("token");

  // No token or expired
  if (!token || currentTime >= tokenExpiry) {
    return true;
  }

  return false;
}

/**
 * Get valid access token (refreshes if needed)
 */
async function getValidToken() {
  if (isTokenExpired()) {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    if (tokenData?.refresh_token) {
      const newToken = await refreshAccessToken();
      return newToken;
    }
    return null;
  }

  return JSON.parse(localStorage.getItem("token"));
}

/**
 * Make API request to Spotify
 */
export async function makeApiRequest(path, body = null, method = "GET") {
  const token = await getValidToken();

  if (!token) {
    await authorizeUser();
    return { result: null, errorMsg: "No valid token" };
  }

  try {
    const options = {
      method,
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        "Content-Type": "application/json",
      },
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${spotifyUrl}/${path}`, options);

    // Handle 401 - token might be invalid
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Retry with new token
        options.headers.Authorization = `${newToken.token_type} ${newToken.access_token}`;
        const retryResponse = await fetch(`${spotifyUrl}/${path}`, options);
        const result = await retryResponse.json();
        return { result, errorMsg: null };
      }
      return { result: null, errorMsg: "Authentication failed" };
    }

    // Handle no content responses
    if (response.status === 204) {
      return { result: { success: true }, errorMsg: null };
    }

    const result = await response.json();

    if (result.error) {
      return { result: null, errorMsg: result.error.message };
    }

    return { result, errorMsg: null };
  } catch (error) {
    console.error("API request error:", error);
    return { result: null, errorMsg: error.message };
  }
}

/**
 * Search for tracks
 */
export async function searchTracks(searchTerm) {
  const encodedTerm = encodeURIComponent(searchTerm);
  return makeApiRequest(`search?q=${encodedTerm}&type=track&limit=50`);
}

/**
 * Create a new playlist
 */
export async function createPlaylist(name, description = "") {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return { result: null, errorMsg: "User ID not found" };
  }

  return makeApiRequest(
    `users/${userId}/playlists`,
    {
      name,
      description,
      public: false,
    },
    "POST"
  );
}

/**
 * Add tracks to a playlist
 */
export async function addTracksToPlaylist(playlistId, trackUris) {
  return makeApiRequest(
    `playlists/${playlistId}/tracks`,
    {
      uris: trackUris,
    },
    "POST"
  );
}

// Export for backward compatibility
export const middleWare = makeApiRequest;
export const authorizeAndAuthenticateUser = initializeSpotify;
