function setStorage(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
}

export default function FetchUserData(key) {
  if (localStorage.getItem(key)) {
    // TODO: Check timestamp for validity
    // Get parsed item from storage, return it as string
    const userToken = JSON.parse(localStorage.getItem("token"));
    return userToken.value;
  } else if (window.location.hash.length > 0) {
    // Gather URL pieces
    const params = new URLSearchParams(window.location.href.split("#")[1]),
      token = params.get("access_token"),
      ttl = params.get("expires_in"),
      time = new Date();

    // Set token and timestamp
    const item = {
      value: token,
      expiry: time.getTime() + parseInt(ttl),
    };

    // Add to storagge
    setStorage(key, item);

    return token;
  }
}
