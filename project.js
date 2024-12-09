const maxWins = 3;

const userScoreElement = document.querySelector('.count-user');
const compScoreElement = document.querySelector('.count-comp');
const resultText = document.querySelector('.result');
const userFieldButtons = document.querySelectorAll('.user-field .field');
const playAgainButton = document.querySelector('.play');

const winSound = document.getElementById('sound-win');
const loseSound = document.getElementById('sound-lose');
const drawSound = document.getElementById('sound-draw');
const clickSound = document.getElementById('sound-click');

let userScore = 0;
let compScore = 0;

const choices = ['r', 's', 'p'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, compChoice) {
    if (userChoice === compChoice) return 'draw';
    if (
        (userChoice === 'r' && compChoice === 's') ||
        (userChoice === 's' && compChoice === 'p') ||
        (userChoice === 'p' && compChoice === 'r')
    ) {
        return 'user';
    } else {
        return 'comp';
    }
}

function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
        userScoreElement.textContent = userScore;
    } else if (winner === 'comp') {
        compScore++;
        compScoreElement.textContent = compScore;
    }
}

function playSound(sound) {
    if (sound) {
        sound.currentTime = 0; 
        sound.play();
    }
}

function resetFieldStyles() {
    document.querySelectorAll('.field').forEach(button => {
        button.classList.remove('winner', 'loser');
    });
}

function playRound(userChoice) {
    if (userScore >= maxWins || compScore >= maxWins) {
        resultText.textContent = "Игра завершена. Нажмите 'Играть заново' для новой игры.";
        return;
    }

    const compChoice = getComputerChoice();
    const winner = determineWinner(userChoice, compChoice);

    const userField = document.querySelector(`.user-field .field[data-field="${userChoice}"]`);
    const compField = document.querySelector(`.comp-field .field[data-field="${compChoice}"]`);

    resetFieldStyles();

    if (winner === 'user') {
        userField.classList.add('winner');
        compField.classList.add('loser');
        resultText.textContent = 'Вы выиграли!';
        playSound(winSound);
    } else if (winner === 'comp') {
        userField.classList.add('loser');
        compField.classList.add('winner');
        resultText.textContent = 'Вы проиграли!';
        playSound(loseSound);
    } else {
        resultText.textContent = 'Ничья!';
        playSound(drawSound);
    }

    updateScore(winner);

    if (userScore >= maxWins) {
        resultText.textContent = "Поздравляем, вы выиграли матч! Нажмите 'Играть заново' для новой игры.";
    } else if (compScore >= maxWins) {
        resultText.textContent = "Компьютер выиграл матч. Нажмите 'Играть заново' для новой игры.";
    }
}

userFieldButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.getAttribute('data-field');
        playSound(clickSound);
        playRound(userChoice);
    });
});

playAgainButton.addEventListener('click', () => {
    userScore = 0;
    compScore = 0;
    userScoreElement.textContent = userScore;
    compScoreElement.textContent = compScore;
    resultText.textContent = 'Сделайте выбор';
    resetFieldStyles();
    playSound(clickSound);
});
