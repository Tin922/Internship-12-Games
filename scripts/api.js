import { getUserInput, promptForValidNumber } from "./input.js";
const baseUrl = "https://api.rawg.io/api/games";
const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";
const baseUrlPlatforms = "https://api.rawg.io/api/platforms";
const baseUrlStores = "https://api.rawg.io/api/stores";
const baseUrlDevelopers = "https://api.rawg.io/api/developers";

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
async function getSerachedGames() {
  const userInput = getUserInput("Unesite ime igre koju zelite pretraziti");
  const url = `${baseUrl}?key=${apiKey}&search=${userInput}`;
  const games = await FetchData(`${url}`);
  console.log(games);
  games.sort((a, b) => {
    return new Date(b.released) - new Date(a.released);
  });
  return games.slice(0, 10);
}
async function fetchDataPlatforms() {
  try {
    const response = await fetch(`${baseUrlPlatforms}?key=${apiKey}`);
    const data = await response.json();
    data.results.sort((a, b) => b.games_count - a.games_count);
    return data.results.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
}
async function fetchDataPlatformsUserInput(ids) {
  try {
    const response = await fetch(`${baseUrl}?key=${apiKey}&platforms=${ids}`);
    const data = await response.json();
    const games = data.results.filter(isGameSafe);
    games.sort((a, b) => a.name.localeCompare(b.name));
    return games.slice(0, 20);
  } catch (error) {
    console.log(error);
  }
}
async function fetchDataWithGameId(searchedGameId) {
  try {
    const response = await fetch(`${baseUrl}?key=${apiKey}`);
    const data = await response.json();
    const games = data.results.filter(isGameSafe);
    const searchedGame = games.find((el) => el.id === searchedGameId);
    return searchedGame;
  } catch (error) {
    console.log(error);
  }
}

async function fetchStoresWithGameId(searchedGameId) {
  try {
    const response = await fetch(
      `${baseUrl}/${searchedGameId}/stores?key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
async function fetchAndFilterStoresWithId(storesId) {
  try {
    const response = await fetch(`${baseUrlStores}?key=${apiKey}`);
    const data = await response.json();
    const storeIds = storesId.map(
      (store) => store.store_id
    ); /* get storesId from user input */
    const filteredStores = data.results.filter((store) =>
      storeIds.includes(store.id)
    );
    console.log(filteredStores);
    return filteredStores;
  } catch (error) {
    console.log(error);
  }
}

async function fetchDevelopers() {
  try {
    const response = await fetch(`${baseUrlDevelopers}?key=${apiKey}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getGamesByDeveloper(developer) {
  try {
    const response = await fetch(
      `${baseUrl}?key=${apiKey}&developers=${developer.id}`
    );
    const data = await response.json();
    const games = data.results.filter(isGameSafe);
    games.sort((a, b) => b.rating - a.rating);
    return games.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
}

export {
  getTopRatedGames,
  getSerachedGames,
  fetchDataPlatforms,
  fetchDataPlatformsUserInput,
  fetchDataWithGameId,
  fetchStoresWithGameId,
  fetchAndFilterStoresWithId,
  fetchDevelopers,
  getGamesByDeveloper,
};
