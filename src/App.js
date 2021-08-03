import FetchUserData from "./FetchUserToken";
import AuthButton from "./Components/AuthButton";

function App() {
  const user = FetchUserData("token");
  return (
    <div className="App">
      <AuthButton />
      {user}
      {/* <button
        onClick={() => {
          fetch(`https://api.spotify.com/v1/me/tracks`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }}
      >
        Click to get info
      </button> */}
    </div>
  );
}

export default App;
