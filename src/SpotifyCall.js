const spotUrl = "https://api.spotify.com/v1/me/tracks";

export default async function spotCall(user) {
  const authHeaders = {
    headers: { Authorization: `${user.token_type} ${user.token}` },
  };

  const firstResponse = await fetch(
    `${spotUrl}?limit=50&offset=0`,
    authHeaders
  );

  if (!firstResponse.ok) {
    throw new Error(`HTTP error, status: ${firstResponse.status}`);
  }

  const firstCallData = await firstResponse.json();

  const numberOfCalls = Math.ceil(firstCallData.total / 50);

  let urlArray = [];
  for (let i = 1; i < numberOfCalls; i++) {
    urlArray.push(`${spotUrl}?limit=50&offset=${i * 50}`);
  }

  const secondaryResponses = await Promise.all(
    urlArray.map((url) =>
      fetch(url, authHeaders).then((response) => response.json())
    )
  );

  const finalResults = secondaryResponses.reduce(
    (accu, response) => [...accu, ...response.items],
    [...firstCallData.items]
  );

  return finalResults;
}
