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
export {
  getUserInput,
  promptForPlatforms,
  promptForValidNumber,
  promptForDevelopers,
};
