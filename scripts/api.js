const baseUrl = "https://api.rawg.io/api/games";
const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

async function FetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
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
