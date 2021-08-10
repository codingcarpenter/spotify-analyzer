import { useState } from "react";
import FetchUserData from "./FetchUserToken";
import AuthButton from "./Components/AuthButton";

function App() {
  const spotUrl = "https://api.spotify.com/v1/me/tracks";
  const user = FetchUserData("token");
  const [userInfo, setUserInfo] = useState();

  function updateInfo(data) {
    setUserInfo(data);
    return;
  }

  async function spotCall(offset = 0) {
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
  async function fetchData(e) {
    const userData = await spotCall();
    let userSongs = [...userData.items];

    if (userData.total % 50 >= 0) {
      const numberOfCalls = Math.ceil(userData.total / 50);
      for (let i = 1; i <= numberOfCalls; i++) {
        const offset = i * 50;
        if (offset < userData.total) {
          const nextPage = await spotCall(offset);
          const pageSongs = nextPage.items;
          for (let j = 0; j < pageSongs.length; j++) {
            userSongs.push(pageSongs[j]);
          }
        } else {
          break;
        }
      }
      updateInfo(userSongs);
    }
  }

  return (
    <div className="App">
      <AuthButton />
      <button onClick={fetchData}>Click to get info</button>
      {typeof userInfo !== "undefined" && (
        <ul>
          {userInfo.map((song) => (
            <li key={song.track.id}>{song.track.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
