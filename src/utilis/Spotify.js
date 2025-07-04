// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

export async function getAccessToken() {
  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
  });

  const res = await response.json();
  const tokenExpiry = Date.now() + res.expires_in * 1000;

  localStorage.setItem("token", JSON.stringify(res));
  localStorage.setItem("expiry", JSON.stringify(tokenExpiry));

  return res;
}

export function isTokenEpired() {
  const currentTime = Date.now();
  const tokenEpiriy = Number(localStorage.getItem("expiry") ?? 0);
  console.log(currentTime, tokenEpiriy);
  if (currentTime > tokenEpiriy) {
    localStorage.clear();
    return true;
  } else {
    return false;
  }
}

export async function middleWare(path, method = "GET") {
  const spotifyUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;
  if (isTokenEpired()) {
    const token = await getAccessToken();
    console.log(token);

    try {
      if (!token) return;
      const response = await fetch(`${spotifyUrl}/${path}`, {
        method,
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error(error);
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
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
}
