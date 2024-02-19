function getUserInput(promptMessage) {
  let userInput = prompt(`${promptMessage}`);
  while (userInput === null || userInput.trim() === "") {
    userInput = prompt("Neispravan unos!");
  }
  return userInput;
}
function promptForPlatforms(platforms) {
  const userInput = prompt("Unesite imena platformi odvojena zarezima:");
  const selectedPlatformNames = userInput
    .split(",")
    .map((platform) => platform.trim());

  const selectedPlatformIds = selectedPlatformNames.map((platformName) => {
    const selectedPlatform = platforms.find(
      (platform) => platform.name.toLowerCase() === platformName.toLowerCase()
    );
    return selectedPlatform ? selectedPlatform.id : null;
  });

  const validSelectedPlatformIds = selectedPlatformIds.filter(
    (id) => id !== null
  );

  return validSelectedPlatformIds;
}
function promptForValidNumber() {
  let userInput;
  do {
    userInput = prompt("Upisite ID igre:");
    const number = parseFloat(userInput);
    if (!isNaN(number) && number > 0) {
      return number;
    }
  } while (true);
}
function promptForDevelopers(developers) {
  const userInput = prompt("Unesite imena developera odvojena zarezima:");
  const selectedDevelopers = userInput
    .split(",")
    .map((developer) => developer.trim());

  const selectedDeveloperObjects = selectedDevelopers.map((developerName) => {
    const selectedDeveloper = developers.find(
      (developer) =>
        developer.name.toLowerCase() === developerName.toLowerCase()
    );
    return selectedDeveloper;
  });
  return selectedDeveloperObjects;
}
function promptForDates() {
  let startDate, endDate;
  let validFormat = /^\d{4}-\d{2}-\d{2}$/;

  do {
    startDate = prompt("Upisite pocetni datum (YYYY-MM-DD):");
    endDate = prompt("Upisite krajni datum (YYYY-MM-DD):");

    if (!validFormat.test(startDate) || !validFormat.test(endDate)) {
      alert("Neispravan format! Upsite datume u obliku YYYY-MM-DD ");
    } else if (startDate > endDate) {
      alert("Pocetni datum ne moze biti poslije krajnog datuma!");
    } else {
      return { startDate, endDate };
    }
  } while (true);
}
function promptForMetacriticScores() {
  let minRating, maxRating;

  do {
    minRating = prompt("Upisite minimani metacritic rating:");
    maxRating = prompt("Upisite maksimalni metacritic rating:");

    minRating = Number(minRating);
    maxRating = Number(maxRating);

    if (
      isNaN(minRating) ||
      isNaN(maxRating) ||
      minRating < 0 ||
      minRating > 100 ||
      maxRating < 0 ||
      maxRating > 100 ||
      minRating >= maxRating
    ) {
      alert(
        "Minimalni rating ne smije biti veci od maksimalnog ratinga i rating treba biti između 1 i 100!"
      );
    } else {
      return { minRating, maxRating };
    }
  } while (true);
}

export {
  getUserInput,
  promptForPlatforms,
  promptForValidNumber,
  promptForDevelopers,
  promptForDates,
  promptForMetacriticScores,
};
