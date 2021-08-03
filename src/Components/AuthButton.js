const AuthButton = () => {
  const baseUrl = "https://accounts.spotify.com/authorize";
  const clientID = "f6beaca53cae46fd9d20eb0e9ea7d22f";
  const resType = "token";
  const redirectUri = "http://localhost:3000";
  const scopes =
    "playlist-read-private playlist-read-collaborative user-library-read";
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `${baseUrl}?&client_id=${clientID}&response_type=${resType}&redirect_uri=${redirectUri}&scope=${scopes}`;
        }}
      >
        Click to Authorize
      </button>
    </>
  );
};

export default AuthButton;
