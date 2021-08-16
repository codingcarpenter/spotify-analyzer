import { useState } from "react";
// Components
import AuthButton from "./Components/AuthButton";
import ListButton from "./Components/ListButton";
// Functions
import FetchUserToken from "./FetchUserToken";

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
      <ListButton user={user} updateInfo={updateInfo} />
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
