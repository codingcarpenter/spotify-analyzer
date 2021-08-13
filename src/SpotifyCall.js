const spotUrl = "https://api.spotify.com/v1/me/tracks";

export default async function spotCall(user, offset = 0) {
  let response = await fetch(`${spotUrl}?limit=50&offset=${offset}`, {
    headers: {
      Authorization: `${user.token_type} ${user.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error, status: ${response.status}`);
  }

  let userData = await response.json();

  return userData;
}
