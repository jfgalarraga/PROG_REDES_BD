const distanceValue = document.getElementById("distanceValue");
const resultText = document.getElementById("resultText");
const resultDiv = document.getElementById("result");
const streakMessage = document.getElementById("streakMessage");

let currentDistance = 0;
let currentStreak = 0; // Racha actual
const winStreak = 5; // Racha necesaria para ganar

function generateRandomDistance() {
  currentDistance = Math.floor(Math.random() * 1000) + 1; // Distancia aleatoria
  distanceValue.textContent = currentDistance;
  resultDiv.className = "result"; // Reiniciar estilo del resultado
  resultText.textContent = ""; // Limpiar texto del resultado
}

function selectCable(cableType) {
  let isCorrect = false;

  if (cableType === "utp" && currentDistance > 0 && currentDistance <= 100) {
    isCorrect = true;
  } else if (cableType === "coaxial" && currentDistance > 100 && currentDistance <= 500) {
    isCorrect = true;
  } else if (cableType === "fiber" && currentDistance > 500) {
    isCorrect = true;
  }

  if (isCorrect) {
    currentStreak++; // Aumentar racha
    resultDiv.className = "result success";
    resultText.textContent = "¡Correcto! Has elegido el cable adecuado.";
    showConnectionAnimation();

    if (currentStreak === winStreak) {
      showStreakMessage("¡Felicidades, has ganado!", true);
    } else {
      setTimeout(generateRandomDistance, 1500);
    }
  } else {
    currentStreak = 0; // Reiniciar racha
    resultDiv.className = "result error";
    resultText.textContent = "¡Incorrecto! Ese cable no es adecuado para esta distancia.";
    showStreakMessage("¡Has perdido! Necesitas una racha de 5 para ganar.", false);
  }
}

function showConnectionAnimation() {
  const gameArea = document.querySelector(".game-area");
  const line = document.createElement("div");
  line.className = "connection-line";
  gameArea.appendChild(line);

  setTimeout(() => {
    gameArea.removeChild(line);
  }, 1500); // Línea desaparece tras animación
}

function showStreakMessage(message, isWin) {
  streakMessage.textContent = message;
  streakMessage.style.background = isWin ? "rgba(46, 204, 113, 0.9)" : "rgba(231, 76, 60, 0.9)";
  streakMessage.classList.add("show");

  setTimeout(() => {
    streakMessage.classList.remove("show");
    generateRandomDistance(); // Reiniciar distancia
  }, 3000);
}

// Iniciar con distancia inicial
generateRandomDistance();

    