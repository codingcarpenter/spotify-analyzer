import { useState } from "react";
// Components
import AuthButton from "./Components/AuthButton";
import ListButton from "./Components/ListButton";
// Functions
import FetchUserToken from "./FetchUserToken";
import FetchArtists from "./SpotifyArtistCall";

function App() {
  const user = FetchUserToken("token");
  const [userSongs, setUserSongs] = useState();
  let artistIDs = new Set();

  function updateInfo(data) {
    setUserSongs(data);

    let i = 0,
      len = data.length;
    while (i < len) {
      artistIDs.add(data[i].track.artists[0].id);
      i++;
    }

    FetchArtists(user, artistIDs);
    return;
  }

  return (
    <div className="App">
      <AuthButton />
      <ListButton user={user} updateInfo={updateInfo} />
      {typeof userSongs !== "undefined" && (
        <ul>
          {userSongs.map((song) => (
            <li key={song.track.id}>{song.track.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
