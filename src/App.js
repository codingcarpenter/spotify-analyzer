import { useState } from "react";
import FetchUserToken from "./FetchUserToken";
import AuthButton from "./Components/AuthButton";
import FetchUserSongs from "./FetchUserData";

function App() {
  const user = FetchUserToken("token");
  const [userInfo, setUserInfo] = useState();

  function updateInfo(data) {
    setUserInfo(data);
    return;
  }

  return (
    <div className="App">
      <AuthButton />
      <button onClick={async () => updateInfo(await FetchUserSongs(user))}>
        Click to get info
      </button>
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
