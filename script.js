const choose = ["Rock", "Paper", "Scissors"];


function getComputerChoice() {
    return choose[Math.floor(Math.random() * choose.length)];
}



function getHumanChoice() {
    let userChoice = false;
    let userSelection = "";
    while (!userChoice) {
        const promptUserChoice = prompt("Rock Paper or Scissors?");
        if (promptUserChoice !== null) {
            const validateChoice = promptUserChoice.trim().slice(0, 1).toUpperCase() + promptUserChoice.trim().slice(1).toLowerCase()
            if (choose.includes(validateChoice)) {
                userSelection = validateChoice;
                userChoice = true;
            }
            else {
                alert("Invalid choice, please choose Rock, Paper, or Scissors.")
            }
        }
    }
    return userSelection;
}


function playGame() {


    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            console.log(`Its a Tie!! Your choice is ${humanChoice} the Computer's choice is ${computerChoice}`);
        } else if (humanChoice === "Scissors" && computerChoice === "Rock") {
            console.log(`You Win!! ${humanChoice} beats ${computerChoice}`);
            humanChoice++
        }
        else if (humanChoice === "Paper" && computerChoice === "Rock") {
            console.log(`You Win!! ${humanChoice} beats ${computerChoice}`);
            humanScore++;
        }
        else {
            console.log(`You Lose!! ${computerChoice} beats ${humanChoice}!`);
            computerScore++;
        }
    }


    for (let i = 1; i < 6; i++) {
        const humanSelection = getHumanChoice()
        const computerSelection = getComputerChoice();
        console.log(`Round ${i}`)
        playRound(humanSelection, computerSelection)
        console.log(`Your Score: ${humanScore} Computers Score: ${computerScore}`)
    }
    let result = `GameOver! ` 
    if(humanScore > computerScore){
        result += `You won! Your score: ${humanScore}, Computer score: ${computerScore}`
    }
    else if(humanScore === computerScore){
        result += `It's a tie! Your score: ${humanScore}, Computer score: ${computerScore}`
    }
    else{
        result +=`You Lost! Your score: ${humanScore}, Computer score: ${computerScore}`
    }
    console.log(result);
}

playGame()