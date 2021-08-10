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

  // Add to storagge
  setStorage(key, item);

  return;
}

export default function FetchUserData(key) {
  if (localStorage.getItem(key)) {
    // Get parsed item from storage, return it as string
    const userInfo = JSON.parse(localStorage.getItem("token"));
    const currentDate = new Date();
    if (userInfo.expiry > currentDate.getTime()) {
      return userInfo;
    } else {
      getSpotifyCreds(key);
      return localStorage.getItem("key");
    }
  } else if (window.location.hash.length > 0) {
    const token = getSpotifyCreds(key);
    return token;
  }
}
