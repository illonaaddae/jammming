import { codeChallenge, codeVerifier } from "./helpers";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URL;

export async function authorizeAndAuthenticateUser() {
  await getAccessToken().then(async () => {
    const response = await middleWare("me");
    localStorage.setItem("userId", response.result.id);
    return;
  });
  authorizeUser();
}

export async function authorizeUser() {
  if (!isTokenEpired()) return;

  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export async function getAccessToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // stored in the previous step
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!code || !codeVerifier) {
    return;
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

    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.access_token) {
      localStorage.setItem("token", JSON.stringify(response));
      const expiry = Date.now() + response.expires_in * 1000;
      localStorage.setItem("expiry", expiry);
    }

    window.location.replace(import.meta.env.VITE_REDIRECT_URL);

    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export function isTokenEpired() {
  const currentTime = Date.now();
  const tokenEpiriy = Number(localStorage.getItem("expiry") ?? 0);

  if (currentTime > tokenEpiriy) {
    localStorage.clear();
    return true;
  } else {
    return false;
  }
}

export async function middleWare(path, method = "GET") {
  let result;
  let errorMsg;
  const spotifyUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;
  if (isTokenEpired()) {
    const token = await getAccessToken();

    try {
      if (!token) return;
      const response = await fetch(`${spotifyUrl}/${path}`, {
        method,
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      });

      result = await response.json();
    } catch (error) {
      errorMsg = error.error.message;
    }
  }
  // If fetching with new token fails, try with the token from localStorage
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    try {
      const response = await fetch(`${spotifyUrl}/${path}`, {
        method,
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      });
      result = await response.json();
    } catch (error) {
      errorMsg = error.error.message;
    }
  }

  return { errorMsg, result };
}
