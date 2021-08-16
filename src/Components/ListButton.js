import FetchUserSongs from "../FetchUserSongs";

const ListButton = ({ updateInfo, user }) => {
  return (
    <>
      <button onClick={async () => updateInfo(await FetchUserSongs({ user }))}>
        Click to get info
      </button>
    </>
  );
};

export default ListButton;
