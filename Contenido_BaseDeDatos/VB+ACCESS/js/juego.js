const steps = [
  "Abrir Microsoft Access.",
  "Seleccionar 'Base de Datos en Blanco'.",
  "Crear una tabla con los campos necesarios.",
  "Ir a la pestaña 'Crear' y seleccionar 'Asistente de Formulario'.",
  "Personalizar el formulario agregando botones correspondientes del CRUD.",
  "Guardar y probar el formulario creado.",
  "Cerrar Access.",
  "Abrir un archivo existente.",
  "Revisar las tablas creadas.",
  "Exportar datos a Excel."
];

const correctSteps = [
  "Abrir Microsoft Access.",
  "Seleccionar 'Base de Datos en Blanco'.",
  "Crear una tabla con los campos necesarios.",
  "Ir a la pestaña 'Crear' y seleccionar 'Asistente de Formulario'.",
  "Personalizar el formulario agregando botones correspondientes del CRUD.",
  "Guardar y probar el formulario creado."
];

let attempts = 5;
let currentStepIndex = 0;
let selectedOrder = [];

const container = document.getElementById("game-container");
const feedbackDiv = document.getElementById("feedback");
const gameOverDiv = document.getElementById("game-over");
const showSolutionBtn = document.getElementById("show-solution-btn");
const solutionContainer = document.getElementById("solution-container");

function createBubble(step) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = step;

  // Posicionar la burbuja dentro del contenedor
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const bubbleSize = 120;

  // Asegurarse de que la burbuja no se salga del contenedor
  bubble.style.top = `${Math.random() * (containerHeight - bubbleSize)}px`;
  bubble.style.left = `${Math.random() * (containerWidth - bubbleSize)}px`;

  bubble.addEventListener("click", () => {
    if (step === correctSteps[currentStepIndex]) {
      // Paso correcto: ocultar burbuja
      currentStepIndex++;
      selectedOrder.push(step);
      bubble.classList.add("hidden");
      feedbackDiv.innerHTML = `¡Correcto! Orden seleccionado: ${selectedOrder.join(' -> ')}`;

      if (currentStepIndex === correctSteps.length) {
        endGame(true);
      }
    } else {
      // Paso incorrecto: tachar burbuja
      attempts--;
      bubble.classList.add("incorrect");
      feedbackDiv.textContent = `¡Elección incorrecta! Pierdes un intento. Quedan ${attempts} intentos.`;

      if (attempts === 0) {
        endGame(false);
      }
    }
  });

  container.querySelector(".burbujas").appendChild(bubble);
}

function startGame() {
  const shuffledSteps = [...steps];
  shuffledSteps.sort(() => Math.random() - 0.5); // Mezclar el orden de los pasos

  shuffledSteps.forEach((step) => {
    createBubble(step); // Crear burbuja por cada paso
  });
}

function endGame(win) {
  container.style.display = "none"; // Ocultar el contenedor del juego
  feedbackDiv.style.display = "none"; // Ocultar el feedback
  gameOverDiv.style.display = "block"; // Asegurar que el contenedor de fin de juego sea visible

  // Limpiar clases anteriores
  gameOverDiv.classList.remove("win", "lose");

  // Mostrar el mensaje de fin de juego con animación
  setTimeout(() => {
    gameOverDiv.classList.add(win ? "win" : "lose");
    gameOverDiv.innerHTML = win
      ? "¡Felicidades! Completaste el juego correctamente. 🎉"
      : "Juego terminado. Te quedaste sin intentos. 😞";
    
    // Asegurarse de que el mensaje sea visible con animación
    gameOverDiv.style.opacity = 1;
    gameOverDiv.style.transform = "translate(-50%, -50%)"; // Centrar el mensaje
  }, 100);

  // Mostrar el botón de solución después de finalizar el juego
  showSolutionBtn.style.display = 'block'; // Hacer visible el botón de solución

  // Eliminar burbujas restantes
  document.querySelectorAll(".bubble").forEach((bubble) => bubble.remove());
}


function restartGame() {
  // Restablecer el estado del juego
  attempts = 5;
  currentStepIndex = 0;
  selectedOrder = [];

  // Limpiar el feedback antes de reiniciar
  feedbackDiv.innerHTML = "";  // Limpiar el contenido de feedback
  feedbackDiv.style.display = "block"; // Asegurarse de que el feedback esté visible

  container.style.display = "block"; // Volver a mostrar el contenedor
  gameOverDiv.style.display = "none"; // Ocultar el mensaje de fin de juego
  gameOverDiv.style.opacity = 0; // Ocultar el mensaje antes de reiniciar

  // Limpiar burbujas y reiniciar el juego
  document.querySelectorAll(".bubble").forEach((bubble) => bubble.remove());
  startGame(); // Iniciar el juego de nuevo

  // Ocultar el botón de ver solución
  showSolutionBtn.style.display = 'none';

  // Limpiar el contenedor de la solución
  solutionContainer.style.display = 'none';
  solutionContainer.innerHTML = ''; // Limpiar el texto de la solución
}


// Mostrar la solución cuando el jugador haga clic en el botón
function Solution() {
  // Mostrar la secuencia correcta de pasos como texto dentro del contenedor
  solutionContainer.style.display = 'block'; // Asegurar que el contenedor sea visible
  solutionContainer.innerHTML = "La solución es: <br>" + correctSteps.join(" -> ");
}

startGame(); // Iniciar el juego cuando la página se carga
