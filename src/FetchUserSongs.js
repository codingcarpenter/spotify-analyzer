import SpotCall from "./SpotifyCall";

export default async function fetchData(user) {
  // Wait for original call for users data
  const userData = await SpotCall(user.user);
  let userSongs = [...userData.items];

  // Find remainder after dividing by call limit
  if (userData.total % 50 >= 0) {
    const numberOfCalls = Math.ceil(userData.total / 50);
    // Make a number of calls equal to the total divided by 50, +1 if there is a remainder
    for (let i = 1; i <= numberOfCalls; i++) {
      const offset = i * 50;
      if (offset < userData.total) {
        // Call using offset for each page
        const nextPage = await SpotCall(user.user, offset);
        const pageSongs = nextPage.items;
        // Loop returned data and push them into the array of objects userSongs
        for (let j = 0; j < pageSongs.length; j++) {
          userSongs.push(pageSongs[j]);
        }
      } else {
        break;
      }
    }
    // Return completed array of songs
    return userSongs;
  }
}
