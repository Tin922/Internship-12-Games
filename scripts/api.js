const baseUrl = "https://api.rawg.io/api/games";
const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

function isGameSafe(game) {
  if (game.esrb_rating == null || game.esrb_rating.id == 5) {
    return false;
  } else return true;
}
async function FetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.filter(isGameSafe);
  } catch (error) {
    console.log(error);
  }
}
async function getTopRatedGames() {
  const url = `${baseUrl}?key=${apiKey}&ordering=-metacritic`;
  const games = await FetchData(`${url}`);
  return games;
}

export { getTopRatedGames };
