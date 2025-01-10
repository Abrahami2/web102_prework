/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// grab the games container
const gamesContainer = document.getElementById("games-container");

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
*/

function addGamesToPage(games) {
    deleteChildElements(gamesContainer);

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h3>${game.name}</h3>
            <p><strong>Pledged:</strong> $${game.pledged}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create summary statistics
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();

/*****************************************************************************
/*****************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 */

function filterUnfundedOnly() {
    console.log("filterUnfundedOnly called"); // Debugging log

    // Clear existing games from the container
    deleteChildElements(gamesContainer);

    // Filter games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the filtered games
    console.log("Unfunded games:", unfundedGames);

    // Add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    console.log("filterFundedOnly called"); // Debugging log

    // Clear existing games from the container
    deleteChildElements(gamesContainer);

    // Filter games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the filtered games
    console.log("Funded games:", fundedGames);

    // Add the funded games to the DOM
    addGamesToPage(fundedGames);
}

function showAllGames() {
    console.log("showAllGames called"); // Debugging log

    // Clear existing games from the container
    deleteChildElements(gamesContainer);

    // Add all games from the GAMES_JSON array to the DOM
    addGamesToPage(GAMES_JSON);
}

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to the buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Expose functions to the global scope for testing in the console
window.filterUnfundedOnly = filterUnfundedOnly;
window.filterFundedOnly = filterFundedOnly;
window.showAllGames = showAllGames;

/*****************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, DOM manipulation
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// calculate the total number of games
const totalGames = GAMES_JSON.length;

// calculate the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a template string with proper grammar
const displayStr = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
    Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded.
    We need your help to fund these amazing games!
`;

// create a new paragraph element and set its inner text to the template string
const displayParagraph = document.createElement("p");
displayParagraph.innerText = displayStr;

// append the paragraph element to the description container
descriptionContainer.appendChild(displayParagraph);
/*****************************************************************************
/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, DOM manipulation
 */

// grab the containers for the top two funded games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// sort the games by the amount of money pledged in descending order
const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// destructure the top two games from the sorted array
const [topGame, secondGame] = sortedGames;

// get and log the first word of the most funded game's name
const firstWordTopGame = topGame.name.split(" ")[0];
console.log(`First word of the most funded game: ${firstWordTopGame}`);

// get and log the first word of the second most funded game's name
const firstWordSecondGame = secondGame.name.split(" ")[0];
console.log(`First word of the second most funded game: ${firstWordSecondGame}`);

// create a new element for the top funded game
const topGameElement = document.createElement("p");
topGameElement.innerText = `🏆 ${topGame.name} raised $${topGame.pledged.toLocaleString()}`;

// append the new element to the first game container
firstGameContainer.appendChild(topGameElement);

// create a new element for the second most funded game
const secondGameElement = document.createElement("p");
secondGameElement.innerText = `🥈 ${secondGame.name} raised $${secondGame.pledged.toLocaleString()}`;

// append the new element to the second game container
secondGameContainer.appendChild(secondGameElement);
