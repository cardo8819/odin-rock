//global elements
const startButton = document.querySelector("#start-btn");
const startContainer = document.querySelector("#start-container");
const headerH1 = document.querySelector("header h1")
const gameDisplay = document.querySelector("#game-display");
const roundWinnerDisplay = document.querySelector("#game-display h2");
const roundInfo = document.querySelector("#game-display h3");
const playerScoreDisplay = document.querySelector("#player p");
const computerScoreDisplay = document.querySelector("#computer p");
const playerImage = document.querySelectorAll(".selection img");
const displayModalBtn = document.createElement("button");

//audio
const clickSound = document.querySelector("#start-click");
const winAudio = document.querySelector("#win-audio");
const loseAudio = document.querySelector("#lose-audio")

//global variables
const computerSelection = ["Rock", "Paper", "Scissors"];
let roundWinner = "";
let gameOver = false;
let playerScore = 0;
let computerScore = 0;
let gameWinner = "";

function getComputerChoice() {
    return computerSelection[Math.floor(Math.random() * computerSelection.length)];
}

startButton.addEventListener("click", () => {
    const clickSound = document.querySelector("#start-click");
    clickSound.play();
    playGame();
})

function playGame() {
    let playerScore = 0;
    let computerScore = 0;
    startContainer.style.display = "none";
    gameDisplay.style.display = "flex";
    headerH1.id = "animate"

    function playRound(playerSelection, computerSelection) {

        if (playerSelection === computerSelection) {
            roundWinner = `Draw`;
        }
        else if (playerSelection === "Rock" && computerSelection === "Scissors") {
            roundWinner = `Player`;
            playerScore++;
        }
        else if (playerSelection === "Paper" && computerSelection === "Rock") {
            roundWinner = `Player`;
            playerScore++;
        }
        else if (playerSelection === "Scissors" && computerSelection === "Paper") {
            roundWinner = "Player";
            playerScore++;
        }
        else {
            roundWinner = "Computer";
            computerScore++;
        }

        updateScoreDisplay(roundWinner, playerSelection, computerSelection);
        if (playerScore === 5 || computerScore === 5) {
            gameOver = true;
            toggleEventListeners()
            displayResult()
        }
    }

    function updateScoreDisplay(winner, playerSelection, computerSelection) {
        const playerImg = document.createElement("img");
        const computerImg = document.createElement("img");
        playerImg.src = `images/${(playerSelection.slice(0, 1).toLowerCase() + playerSelection.slice(1))}.png`;
        computerImg.src = `images/${(computerSelection.slice(0, 1).toLowerCase() + computerSelection.slice(1))}.png`;
        const playScoresCard = document.querySelector("#player .scores-card");
        playScoresCard.innerHTML = `<img src=${playerImg.src}>`
        const computerScoresCard = document.querySelector("#computer .scores-card");
        computerScoresCard.innerHTML = `<img src=${computerImg.src}>`

        playerScoreDisplay.textContent = `PLAYER: ${playerScore}`;
        computerScoreDisplay.textContent = `COMPUTER: ${computerScore}`;

        switch (winner) {
            case "Player":
                roundWinnerDisplay.textContent = `PLAYER Wins!`;
                roundInfo.textContent = `${playerSelection} beats ${(computerSelection.slice(0, 1).toLowerCase() + computerSelection.slice(1))}!`
                break;
            case "Computer":
                roundWinnerDisplay.textContent = `COMPUTER Wins!`;
                roundInfo.textContent = `${computerSelection} beats ${(playerSelection.slice(0, 1).toLowerCase() + playerSelection.slice(1))}!`
                break;
            case "Draw":
                roundWinnerDisplay.textContent = `Its a tie!`;
                roundInfo.textContent = `${playerSelection} draws with ${(computerSelection.slice(0, 1).toLowerCase() + computerSelection.slice(1))}`
        }
    }

    function handleClick(e) {
        const playerSelection = e.target.id;

        const clickSound = document.querySelector("#start-click");
        clickSound.play();
        const getPlayerChoice = playerSelection;
        playRound(getPlayerChoice, getComputerChoice())

    }

    function toggleEventListeners() {
        !gameOver ? playerImage.forEach((img) => img.addEventListener("click", handleClick)) : playerImage.forEach((img) => img.removeEventListener("click", handleClick))
    }
    toggleEventListeners()


    function displayResult() {
        const container = document.querySelector("#container");
        const displayModal = document.createElement("div");
        displayModal.classList.add("modal");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const displayModalH1 = document.createElement("h2");
        const displayModalBtn = document.createElement("button");
        displayModalBtn.id = "reset";
        displayModalBtn.textContent = "Play Again";
        if (computerScore > playerScore) {
            displayModalH1.textContent = `You Lost! ${computerScore} : ${playerScore}`;
            gameWinner = "Computer";
        } else {
            displayModalH1.textContent = `You Won! ${playerScore} : ${computerScore}`;
            gameWinner = "Player"
        }
        modalContent.appendChild(displayModalH1);
        modalContent.appendChild(displayModalBtn);
        displayModal.appendChild(modalContent);
        container.appendChild(displayModal);
        const winAudio = document.querySelector("#win-audio");
        const loseAudio = document.querySelector("#lose-audio")
        gameWinner === "Player" ? winAudio.play() : loseAudio.play();
        displayModalBtn.addEventListener("click", reset);
    }

    function reset() {
        document.querySelector(".modal").remove();
        winAudio.currentTime = 0;
        loseAudio.currentTime = 0;
        winAudio.pause();
        loseAudio.pause();
        startContainer.style.display = "flex";
        gameDisplay.style.display = "none";
        roundWinner = "";
        gameWinner = "";
        gameOver = false;
        playerScore = 0;
        computerScore = 0;
        roundWinnerDisplay.textContent = `Make Your choice`
        roundInfo.textContent = "First to score 5 Wins!";
        playerScoreDisplay.textContent = `PLAYER: 0`;
        computerScoreDisplay.textContent = `COMPUTER: 0`;
        const resetPlayerScoreCardImg = document.querySelector("#player .scores-card img");
        resetPlayerScoreCardImg.remove()
        const resetComputerScoreCardImg = document.querySelector("#computer .scores-card img");
        resetComputerScoreCardImg.remove();
        headerH1.removeAttribute("id");
    }
}