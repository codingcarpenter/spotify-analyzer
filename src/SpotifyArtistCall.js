const spotUrl = "https://api.spotify.com/v1/artists";

function chunkArray(array, size) {
  const res = [];
  while (array.length > 0) {
    const chunk = array.splice(0, size);
    res.push(chunk);
  }
  return res;
}

export default async function artistCall(user, ids) {
  const authHeaders = {
    headers: { Authorization: `${user.token_type} ${user.token}` },
  };

  const artistIDs = chunkArray([...ids], 50);

  const artists = await Promise.all(
    artistIDs.map((idArray) =>
      fetch(`${spotUrl}?ids=${idArray.join(",")}`, authHeaders).then(
        (response) => response.json()
      )
    )
  );

  const finalResults = artists.reduce(
    (accu, response) => [...accu, ...response.artists],
    []
  );

  console.log(finalResults);
}
