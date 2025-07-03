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
  const tokenExpiry = Date.now() + res.expires_in;
  console.log(tokenExpiry);
  localStorage.setItem("token", JSON.stringify(res));
  localStorage.setItem("expiry", JSON.stringify(tokenExpiry));

  return res;
}

export function isTokenEpired() {
  const currentTime = Date.now();
  const tokenEpiriy = localStorage.getItem("expiriy") ?? 0;
  if (currentTime > tokenEpiriy) {
    localStorage.clear();
    return true;
  } else {
    return false;
  }
}

 export async function middleWare(path, method="GET") {
    if(isTokenEpired()) {
        const {
            access_token,
            token_type
        } = getAccessToken();

        try {
            const response = await fetch(``)

            
        } catch (error) {
            
        }

    }




}
