import {
  getTopRatedGames,
  getSerachedGames,
  fetchDataPlatforms,
  fetchDataPlatformsUserInput,
  fetchDataWithGameId,
  fetchStoresWithGameId,
  fetchAndFilterStoresWithId,
  fetchDevelopers,
  getGamesByDeveloper,
  getGamesByStartAndEndDate,
} from "./api.js";
import {
  promptForDevelopers,
  promptForPlatforms,
  promptForValidNumber,
  promptForDates,
} from "./input.js";

const firstTaskContainer = document.querySelector(
  "#first_task .games_container"
);
const secondTaskContainer = document.querySelector(
  "#second_task .games_container"
);
const thirdTaskContainer = document.querySelector(
  "#third_task .games_container"
);
const fourthTaskContainer = document.querySelector(
  "#fourth_task .games_container"
);
const fifthTaskContainer = document.querySelector(
  "#fifth_task .store_container"
);
const sixthTaskContainer = document.querySelector(
  "#sixth_task .game_contianer"
);
const seventhTaskContainer = document.querySelector(
  "#seventh_task .game_contianer"
);

const search_games_button = document.querySelector(".search_games_button");
const search_games_button_2 = document.querySelector(".search_games_button_2");
const search_games_button_3 = document.querySelector(".search_games_button_3");
const search_games_button_4 = document.querySelector(".search_games_button_4");
const search_games_button_5 = document.querySelector(".search_games_button_5");
const search_games_button_6 = document.querySelector(".search_games_button_6");

function createGameInfo(game) {
  if (game.background_image == null)
    game.background_image = "./assets/no_image.png";
  return `<div class="game_info">          
          <h4>${game.name}</h4>
          <p>Datum izlaska: ${game.released}</p>
          <p>Metacritic ocjena: ${game.metacritic}</p>
          <p>Rating: ${game.rating}</p>
          <img src="${game.background_image}" alt="${game.name}"/>
        </div>`;
}
function appendGames(games, container) {
  if (Array.isArray(games)) {
    for (const game of games) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = createGameInfo(game);
      container.appendChild(card);
    }
  } else {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = createGameInfo(games);
    container.appendChild(card);
  }
}

function searchByPlatforms(platforms) {
  const platformsArray = [];
  for (const platform of platforms) {
    platformsArray.push(platform.name);
  }
  alert(`Top 10 platformi su: ${platformsArray}`);
  const userRequestedPlatformsIds = promptForPlatforms(platforms);
  console.log(userRequestedPlatformsIds);
  return userRequestedPlatformsIds;
}

appendGames(await getTopRatedGames(), firstTaskContainer);
search_games_button.addEventListener("click", async () => {
  secondTaskContainer.innerHTML = "";

  appendGames(await getSerachedGames(), secondTaskContainer);
});

search_games_button_2.addEventListener("click", async () => {
  thirdTaskContainer.innerHTML = "";
  const userRequestedPlatformsIds = searchByPlatforms(
    await fetchDataPlatforms()
  );
  appendGames(
    await fetchDataPlatformsUserInput(userRequestedPlatformsIds),
    thirdTaskContainer
  );
});

search_games_button_3.addEventListener("click", async () => {
  fourthTaskContainer.innerHTML = "";
  const searchedGameById = await fetchDataWithGameId(promptForValidNumber());
  if (searchedGameById == undefined) {
    alert(`Igra s tim id-em ne postoji`);
    return;
  }
  appendGames(searchedGameById, fourthTaskContainer);
  createStarRating(searchedGameById.rating);
});
function createStarRating(rating) {
  const starRatingContainer = document.createElement("div");

  const fullStars = Math.floor(rating);
  const remainder = rating % 1;
  const halfStar = remainder >= 0.25 && remainder < 0.75;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    const fullStar = document.createElement("div");
    fullStar.classList.add("star-rating");
    fullStar.dataset.rating = "1";
    starRatingContainer.appendChild(fullStar);
  }

  if (halfStar) {
    const halfStar = document.createElement("div");
    halfStar.classList.add("star-rating");
    halfStar.dataset.rating = "0.5";
    starRatingContainer.appendChild(halfStar);
  }

  for (let i = 0; i < emptyStars; i++) {
    const emptyStar = document.createElement("div");
    emptyStar.classList.add("star-rating");
    emptyStar.dataset.rating = "0";
    starRatingContainer.appendChild(emptyStar);
  }
  fourthTaskContainer.appendChild(starRatingContainer);
}

search_games_button_4.addEventListener("click", async () => {
  fifthTaskContainer.innerHTML = "";
  const searchedGameByIdForGettingStores = await fetchStoresWithGameId(
    promptForValidNumber()
  );
  if (searchedGameByIdForGettingStores == undefined) {
    alert(`Igra s tim id-em ne postoji`);
    return;
  }
  appendStore(
    await fetchAndFilterStoresWithId(searchedGameByIdForGettingStores),
    fifthTaskContainer
  );
});

function appendStore(stores, container) {
  if (Array.isArray(stores)) {
    for (const game of stores) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = createStoreInfo(game);
      container.appendChild(card);
    }
  } else {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = createStoreInfo(stores);
    container.appendChild(card);
  }
}
function createStoreInfo(store) {
  if (store.image_background == null)
    store.image_background = "./assets/no_image.png";
  return `<div class="store_info">          
          <h4>${store.name}</h4>
          <p>Ime dućana: ${store.name}</p>
          <p>Broj igrica: ${store.games_count}</p>
          <img src="${store.image_background}" alt="${store.name}"/>
        </div>`;
}
search_games_button_5.addEventListener("click", async () => {
  sixthTaskContainer.innerHTML = "";
  const developers = searchByDevelopers(await fetchDevelopers());
  fetchGamesForDevelopers(developers, sixthTaskContainer);
});

async function fetchGamesForDevelopers(developers, container) {
  for (const developer of developers) {
    const developerName = document.createElement("h2");
    developerName.textContent = developer.name;
    container.appendChild(developerName);

    const games = await getGamesByDeveloper(developer);
    appendGames(games, container);
  }
}
function searchByDevelopers(developers) {
  const developersArray = [];
  for (const developer of developers) {
    developersArray.push(developer.name);
  }
  alert(`Developeri su: ${developersArray}`);
  const userRequestedDevelopers = promptForDevelopers(developers);
  return userRequestedDevelopers;
}

search_games_button_6.addEventListener("click", async () => {
  seventhTaskContainer.innerHTML = "";
  let { startDate, endDate } = promptForDates();
  appendGames(
    await getGamesByStartAndEndDate(startDate, endDate),
    seventhTaskContainer
  );
});
