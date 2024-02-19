function getUserInput(promptMessage) {
  let userInput = prompt(`${promptMessage}`);
  while (userInput === null || userInput.trim() === "") {
    userInput = prompt("Invalid input! Please enter a non-empty string:");
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
      (platform) => platform.name === platformName
    );
    return selectedPlatform ? selectedPlatform.id : null;
  });

  const validSelectedPlatformIds = selectedPlatformIds.filter(
    (id) => id !== null
  );

  return validSelectedPlatformIds;
}
export { getUserInput, promptForPlatforms };