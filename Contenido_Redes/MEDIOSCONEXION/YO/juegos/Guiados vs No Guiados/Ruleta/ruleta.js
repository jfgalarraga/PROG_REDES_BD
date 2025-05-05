const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const restartButton = document.createElement("button"); // Botón para reiniciar
restartButton.textContent = "Volver a empezar";
restartButton.className = "btn btn-success mt-4";
restartButton.style.display = "none";
document.querySelector(".container").appendChild(restartButton);

let isSpinning = false;
let angle = 0;
const initialQuestions = [
  {
    pregunta: "¿Cuál de los siguientes es un medio de transmisión no guiado?",
    correct: "Satélite",
    incorrect: ["Cable UTP", "Fibra óptica"],
  },
  {
    pregunta: "¿Qué tipo de medio guiado utiliza pulsos de luz para transmitir datos?",
    correct: "Fibra óptica",
    incorrect: ["Cable coaxial", "Cable UTP"],
  },
  {
    pregunta: "¿Qué medio no guiado se utiliza para la comunicación a largas distancias a través del espacio?",
    correct: "Satélite",
    incorrect: ["WiFi", "Infrarrojos"],
  },
  {
    pregunta: "¿Qué medio de transmisión inalámbrico usa frecuencias de 2.4 GHz y 5 GHz?",
    correct: "WiFi",
    incorrect: ["Bluetooth", "Radiofrecuencia"],
  },
  {
    pregunta: "¿Qué tecnología de transmisión se usa en el control remoto de televisores?",
    correct: "Infrarrojos",
    incorrect: ["Microondas", "WiFi"],
  },
];


let questions = [...initialQuestions]; // Clonar las preguntas iniciales

// Dibujar la ruleta
function drawWheel() {
  const numSections = questions.length;
  const arcSize = (2 * Math.PI) / numSections;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSections; i++) {
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#FFC4C4" : "#FFDDC1";
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      i * arcSize,
      (i + 1) * arcSize
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();

    // Texto
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * arcSize + arcSize / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`Pregunta ${i + 1}`, canvas.width / 2 - 10, 10);
    ctx.restore();
  }
}

// Girar la ruleta
function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const spins = 5 * 360; // Número de vueltas completas
  const randomAngle = Math.random() * 360;
  const targetAngle = spins + randomAngle;

  let currentAngle = 0;
  const spinInterval = setInterval(() => {
    currentAngle += 10;
    angle = (currentAngle * Math.PI) / 180;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawWheel();
    ctx.restore();

    if (currentAngle >= targetAngle) {
      clearInterval(spinInterval);
      isSpinning = false;

      // Determinar la pregunta seleccionada
      const selectedIndex = Math.floor((randomAngle / 360) * questions.length);
      displayQuestion(selectedIndex);
    }
  }, 20);
}

// Mostrar pregunta y opciones
function displayQuestion(index) {
  const question = questions[index];
  const questionTitle = document.getElementById("questionTitle");
  const options = document.getElementById("options");

  // Mostrar la pregunta seleccionada
  questionTitle.textContent = question.pregunta;
  options.innerHTML = ""; // Limpiar opciones anteriores

  // Mezclar opciones (correcta e incorrectas)
  const allAnswers = [question.correct, ...question.incorrect].sort(
    () => Math.random() - 0.5
  );

  // Crear botones para las opciones
  allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.className = "btn btn-primary m-2";
    button.addEventListener("click", () =>
      checkAnswer(answer, question.correct, index)
    );
    options.appendChild(button); // Agregar botón al contenedor
  });
}

// Verificar respuesta
function checkAnswer(selected, correct, index) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    showCorrectMessage(); // Mostrar el mensaje correcto
    feedback.textContent = "¡Correcto!";
    feedback.style.color = "green";

    // Eliminar pregunta seleccionada
    setTimeout(() => {
      questions.splice(index, 1);
      drawWheel(); // Redibujar la ruleta sin la pregunta eliminada
      document.getElementById("questionTitle").textContent = "";
      document.getElementById("options").innerHTML = "";
      feedback.textContent = "";

      if (questions.length === 0) {
        endGame(); // Terminar el juego si no quedan preguntas
      }
    }, 2000);
  } else {
    showIncorrectMessage(); // Mostrar el mensaje incorrecto
    feedback.textContent = "Incorrecto. Intenta de nuevo.";
    feedback.style.color = "red";
  }
}

// Mostrar mensaje de correcto
function showCorrectMessage() {
  const correctMessage = document.getElementById("correctMessage");
  correctMessage.style.display = "block";
  setTimeout(() => {
    correctMessage.style.display = "none";
  }, 2000);
}

// Mostrar mensaje de incorrecto
function showIncorrectMessage() {
  const incorrectMessage = document.getElementById("incorrectMessage");
  incorrectMessage.style.display = "block";
  setTimeout(() => {
    incorrectMessage.style.display = "none";
  }, 2000);
}

// Terminar el juego
function endGame() {
  const questionTitle = document.getElementById("questionTitle");
  const options = document.getElementById("options");
  questionTitle.textContent = "¡Has respondido todas las preguntas!";
  options.innerHTML = "";
  spinButton.style.display = "none"; // Ocultar botón de girar
  restartButton.style.display = "block"; // Mostrar botón de reinicio
}

// Reiniciar el juego
restartButton.addEventListener("click", () => {
  questions = [...initialQuestions]; // Restaurar preguntas originales
  drawWheel(); // Redibujar la ruleta
  const questionTitle = document.getElementById("questionTitle");
  const options = document.getElementById("options");
  questionTitle.textContent = "";
  options.innerHTML = "";
  spinButton.style.display = "block"; // Mostrar botón de girar
  restartButton.style.display = "none"; // Ocultar botón de reinicio
});

// Inicializar
spinButton.addEventListener("click", spinWheel);
drawWheel();
