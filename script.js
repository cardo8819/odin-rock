const choose = ["Rock", "Paper", "Scissors"];
const playerScoreDisplay = document.querySelector("#scores #player-score");

const computerScoreDisplay = document.querySelector("#scores #computer-score");
const choiceImg = document.querySelectorAll("#options img");
const resultDiv = document.querySelector("#result");
const resultP = document.createElement("p");
resultDiv.appendChild(resultP);

let clickCount = 0;
let gameRounds = 5;
let humanScore = 0;
let computerScore = 0;
playerScoreDisplay.textContent = `Player: ${humanScore}`;
computerScoreDisplay.textContent = `Computer: ${computerScore}`;

function getComputerChoice() {
    return choose[Math.floor(Math.random() * choose.length)];
}



function playGame() {

    function playRound(humanChoice, computerChoice) {

        if (humanChoice === computerChoice) {
            resultP.textContent = `Its a Tie!! Your choice is ${humanChoice} the Computer's choice is ${computerChoice}`;
        } else if (humanChoice === "Scissors" && computerChoice === "Rock") {
            humanScore++
            resultP.textContent = `You Win!! ${humanChoice} beats ${computerChoice}`;
            playerScoreDisplay.textContent = `Player: ${humanScore}`;
        }
        else if (humanChoice === "Paper" && computerChoice === "Rock") {
            humanScore++
            resultP.textContent = `You Win!! ${humanChoice} beats ${computerChoice}`;
            playerScoreDisplay.textContent = `Player: ${humanScore}`;
        }
        else if (humanChoice === "Rock" && computerChoice === "Scissors") {
            humanScore++
            resultP.textContent = `You Win!! ${humanChoice} beats ${computerChoice}`;
            playerScoreDisplay.textContent = `Player: ${humanScore}`;
        }
        else {
            computerScore++
            resultP.textContent = `You Lose!! ${computerChoice} beats ${humanChoice}!`;
            computerScoreDisplay.textContent = `Computer: ${computerScore}`
        }
    }

    choiceImg.forEach((img) => {
        img.addEventListener("click", handleClick)
    })

    function handleClick(e) {
        
        const getHumanChoice = e.target.id.slice(0,1).toUpperCase() + e.target.id.slice(1, e.target.length);
        
        
        playRound(getHumanChoice, getComputerChoice());
        clickCount++
        if (clickCount === gameRounds) {
            choiceImg.forEach((img) => {
                img.removeEventListener("click", handleClick);
            })
            displayWinner();
        }
    }


    function displayWinner() {
        if (humanScore > computerScore) {
            resultP.textContent = `You Won! ${humanScore} : ${computerScore}`
            
        }
        else if (humanScore === computerScore) {
            resultP.textContent = `Its a Draw! ${humanScore} : ${computerScore}`
            
        }
        else {
            resultP.textContent = `You Lost! ${computerScore} : ${humanScore}`
            
        }
        setTimeout(() => {
            document.querySelector("#gameover").style.display = "flex";
        }, 1000)
    }
    function reset() {
        clickCount = 0;
        gameRounds = 5;
        humanScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = `Player: ${humanScore}`;
        computerScoreDisplay.textContent = `Computer: ${computerScore}`;
        

        resultP.textContent = "";
        document.querySelector("#gameover").style.display = "none";
        choiceImg.forEach((img) => {
            img.addEventListener("click", handleClick);

        })

    }

    document.querySelector("#gameover button").addEventListener("click", reset)
}








playGame();






