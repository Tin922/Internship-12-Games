import {
  getTopRatedGames,
  getSerachedGames,
  fetchDataPlatforms,
  fetchDataPlatformsUserInput,
} from "./api.js";
import { promptForPlatforms } from "./input.js";

const firstTaskContainer = document.querySelector(
  "#first_task .games_container"
);
const secondTaskContainer = document.querySelector(
  "#second_task .games_container"
);
const search_games_button = document.querySelector(".search_games_button");

function createGameInfo(game) {
  if (game.background_image == null)
    game.background_image = "./assets/no_image.png";
  return `<div class="game_info">          
          <h4>${game.name}</h4>
          <p>Datum izlaska: ${game.released}</p>
          <p>Metacritic ocjena: ${game.metacritic}</p>
          <img src="${game.background_image}" alt="${game.name}"/>
        </div>`;
}
function appendGames(games, container) {
  for (const game of games) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = createGameInfo(game);
    container.appendChild(card);
  }
}

async function searchByPlatforms(platforms) {
  const platformsArray = [];
  for (const platform of platforms) {
    platformsArray.push(platform.name);
  }
  alert(`Top 10 platformi su: ${platformsArray}`);
  const userRequestedPlatformsIds = promptForPlatforms(platforms);
  console.log(userRequestedPlatformsIds);
  const gamesByConsoles = await fetchDataPlatformsUserInput(
    userRequestedPlatformsIds
  );
  console.log(gamesByConsoles);
}

appendGames(await getTopRatedGames(), firstTaskContainer);
search_games_button.addEventListener("click", async () => {
  search_games_button.style.display = "none";
  appendGames(await getSerachedGames(), secondTaskContainer);
});

searchByPlatforms(await fetchDataPlatforms());
