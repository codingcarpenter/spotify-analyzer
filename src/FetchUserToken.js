function setStorage(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
}

async function getSpotifyCreds(key) {
  // Gather URL pieces
  const params = new URLSearchParams(window.location.href.split("#")[1]),
    token = params.get("access_token"),
    token_type = params.get("token_type"),
    ttl = params.get("expires_in"),
    time = new Date();

  // Set token and timestamp
  const item = {
    token: token,
    token_type: token_type,
    expiry: time.getTime() + parseInt(ttl),
  };

  // Add to storage
  setStorage(key, item);

  return;
}

export default function FetchUserData(key) {
  if (localStorage.getItem(key)) {
    // Get string from LS and parse to JSON
    const userInfo = JSON.parse(localStorage.getItem("token"));
    // Get current date to extract time and compare
    const currentDate = new Date();
    if (userInfo.expiry > currentDate.getTime()) {
      // If not expired, return info
      return userInfo;
    } else {
      // If expired get the creds from the URL string
      getSpotifyCreds(key);
      return localStorage.getItem("key");
    }
  } else if (window.location.hash.length > 0) {
    // If LS hasn't been set, fetch the data from the URL and set it
    const token = getSpotifyCreds(key);
    return token;
  }
}
