// Obtener referencias a elementos HTML relevantes
const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("comp-score");
const userChoiceImg = document.getElementById("user-img");
const compChoiceImg = document.getElementById("computer-img");
const choseContainer = document.querySelector(".choose");
const options = document.querySelectorAll(".option");

let userScore = 0;
let compScore = 0;

// Función para obtener la elección aleatoria de la computadora
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Función para convertir la elección de la computadora en una imagen
function convertToImage(choice) {
    return `img/${choice}.png`;
}

// Función para comparar las elecciones y determinar el resultado
function compareChoices(userChoice, compChoice) {
    if (userChoice === compChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && compChoice === 'scissor') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissor' && compChoice === 'paper')
    ) {
        return 'user';
    } else {
        return 'comp';
    }
}

// Función para actualizar la puntuación
function updateScore(result) {
    if (result === 'user') {
        userScore++;
    } else if (result === 'comp') {
        compScore++;
    }
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;

    // Verificar si el usuario o la computadora han alcanzado los 5 puntos
    if (userScore === 5 || compScore === 5) {
        // Mostrar el pop-up
        const message = checkWinner();
        const popupMessage = document.getElementById("popup-message");
        popupMessage.textContent = message;
        const popup = document.getElementById("popup");
        popup.style.display = "block";
    }
}

// Función para reiniciar el juego
function restartGame() {
    userScore = 0;
    compScore = 0;
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    userChoiceImg.src = 'img/rock.png';
    compChoiceImg.src = 'img/scissor.png';
    // Ocultar el pop-up
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Función para verificar quién ganó el juego
function checkWinner() {
    if (userScore === 5) {
        return "Congratulations! You win the game!";
    } else if (compScore === 5) {
        return "Computer wins the game!";
    }
}

// Agregar event listener al botón de reseteo
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", restartGame);

// Función principal para manejar el juego
function playGame(userChoice) {
    const compChoice = getComputerChoice();
    const result = compareChoices(userChoice, compChoice);
    updateScore(result);
    showChoices(userChoice, compChoice);
}

// Función para mostrar las elecciones en las imágenes
function showChoices(userChoice, compChoice) {
    userChoiceImg.src = convertToImage(userChoice);
    compChoiceImg.src = convertToImage(compChoice);
}

// Agregar event listeners a las opciones de elección
options.forEach(option => {
    option.addEventListener('click', function() {
        const userChoice = this.getAttribute("data-option");
        playGame(userChoice);
    });
});