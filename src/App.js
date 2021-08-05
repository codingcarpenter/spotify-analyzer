import { useState } from "react";
import FetchUserData from "./FetchUserToken";
import AuthButton from "./Components/AuthButton";

function App() {
  const user = FetchUserData("token");
  const [userInfo, setUserInfo] = useState();

  function fetchData(e, offsetAmount = 0) {
    fetch(
      `https://api.spotify.com/v1/me/tracks?offset=${offsetAmount}&limit=50`,
      {
        headers: {
          Authorization: `${user.token_type} ${user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setUserInfo(data));

    checkFetchPagination();
  }

  function checkFetchPagination() {
    // if(userInfo.)
  }

  return (
    <div className="App">
      <AuthButton />
      <button onClick={fetchData}>Click to get info</button>
      {typeof userInfo !== "undefined" && (
        <ul>
          {userInfo.items.map((song) => (
            <li key={song.track.id}>{song.track.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
