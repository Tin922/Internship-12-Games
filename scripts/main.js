import { getTopRatedGames } from "./api.js";

const firstTaskContainer = document.querySelector(
  "#first_task .games_container"
);
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
let games = await getTopRatedGames();
appendGames(games, firstTaskContainer);
