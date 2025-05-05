const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startPosition = { x: 50, y: canvas.height / 2 };
const endPosition = { x: canvas.width - 50, y: canvas.height / 2 };
let currentPath = [];
let obstacles = [];
let selectedCable = null;
let isDrawing = false;

// Opciones de cables
const cables = {
  UTP: { maxDistance: 100, color: "#ffdd57" },
  Coaxial: { maxDistance: 500, color: "#ff5722" },
  "Fibra Óptica": { maxDistance: Infinity, color: "#00ffcc" },
};

// Preguntas
const questions = [
  {
    question: "¿Cuál es el alcance máximo del cable UTP?",
    options: ["100 metros", "500 metros", "1 kilómetro"],
    answer: "100 metros",
    cable: "UTP",
  },
  {
    question: "¿Qué cable tiene un alcance de entre 100 y 500 metros?",
    options: ["UTP", "Fibra Óptica", "Coaxial"],
    answer: "Coaxial",
    cable: "Coaxial",
  },
  {
    question: "¿Qué cable es más adecuado para largas distancias?",
    options: ["UTP", "Coaxial", "Fibra Óptica"],
    answer: "Fibra Óptica",
    cable: "Fibra Óptica",
  },
  {
    question: "¿Qué cable es más flexible y económico?",
    options: ["UTP", "Fibra Óptica", "Coaxial"],
    answer: "UTP",
    cable: "UTP",
  },
  {
    question: "¿Qué cable es más resistente a interferencias?",
    options: ["Coaxial", "UTP", "Fibra Óptica"],
    answer: "Fibra Óptica",
    cable: "Fibra Óptica",
  },
  {
    question: "¿Qué cable tiene conectores RJ45?",
    options: ["UTP", "Coaxial", "Fibra Óptica"],
    answer: "UTP",
    cable: "UTP",
  },
  {
    question: "¿Qué cable se usa principalmente para TV por cable?",
    options: ["Coaxial", "UTP", "Fibra Óptica"],
    answer: "Coaxial",
    cable: "Coaxial",
  },
  {
    question: "¿Qué cable utiliza luz para transmitir datos?",
    options: ["Fibra Óptica", "UTP", "Coaxial"],
    answer: "Fibra Óptica",
    cable: "Fibra Óptica",
  },
  {
    question: "¿Qué cable puede alcanzar velocidades más altas?",
    options: ["Fibra Óptica", "UTP", "Coaxial"],
    answer: "Fibra Óptica",
    cable: "Fibra Óptica",
  },
  {
    question: "¿Qué cable es ideal para redes de área local (LAN)?",
    options: ["UTP", "Fibra Óptica", "Coaxial"],
    answer: "UTP",
    cable: "UTP",
  },
];

let currentQuestionIndex = 0;

// Generar obstáculos dinámicos
function generateObstacles() {
    obstacles = [];
    for (let i = 0; i < 5; i++) {
      obstacles.push({
        x: Math.random() * (canvas.width - 200) + 100, // Evitar bordes
        y: Math.random() * (canvas.height - 100) + 50,
        width: 40,
        height: 40,
      });
    }
  }
  

// Dibujar obstáculos
function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach((obstacle) => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }
  

// Detectar colisión con obstáculos
function isColliding(x, y) {
    return obstacles.some(
      (obstacle) =>
        x > obstacle.x &&
        x < obstacle.x + obstacle.width &&
        y > obstacle.y &&
        y < obstacle.y + obstacle.height
    );
  }
  

// Dibujar dispositivos y el camino actual
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Dibujar dispositivos
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(startPosition.x, startPosition.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endPosition.x, endPosition.y, 20, 0, Math.PI * 2);
    ctx.fill();
  
    // Dibujar obstáculos
    drawObstacles();
  
    // Dibujar el camino actual
    if (currentPath.length > 0) {
      ctx.strokeStyle = selectedCable ? cables[selectedCable].color : "white";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let point of currentPath) {
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();
  
      // Resplandor en el cable
      ctx.shadowBlur = 15;
      ctx.shadowColor = cables[selectedCable]?.color || "white";
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  
    requestAnimationFrame(drawGame);
  }
// Mostrar pregunta
// Lógica para dibujar el camino (mousedown)
canvas.addEventListener("mousedown", (e) => {
    if (!selectedCable) {
      alert("Por favor responde correctamente para seleccionar un cable.");
      return;
    }
  
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // Comprobar si el clic se realiza en el dispositivo de origen
    if (
      Math.sqrt((x - startPosition.x) ** 2 + (y - startPosition.y) ** 2) < 20
    ) {
      isDrawing = true;
      currentPath = [{ x: startPosition.x, y: startPosition.y }];
    }
  });
  
  // Evento mousemove para trazar la línea mientras se mueve el mouse
  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // Detener el dibujo si hay colisión
    if (isColliding(x, y)) {
      alert("¡Te chocaste con un obstáculo! Intenta nuevamente.");
      currentPath = [];
      isDrawing = false;
    } else {
      currentPath.push({ x, y });
    }
  });
  
  // Evento mouseup para terminar el trazado
  canvas.addEventListener("mouseup", () => {
    if (isDrawing) {
      isDrawing = false;
  
      const lastPoint = currentPath[currentPath.length - 1];
      const dx = endPosition.x - lastPoint.x;
      const dy = endPosition.y - lastPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < 20) {
        alert("¡Conexión Exitosa!");
        resetGame();
      } else {
        alert("¡No alcanzaste el destino! Intenta nuevamente.");
        currentPath = [];
      }
    }
  });
  
  // Mostrar pregunta
  function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
  
    // Obtener la pregunta actual
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    // Limpiar respuestas anteriores
    answersElement.innerHTML = "";
  
    // Crear botones de respuesta
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList = "btn";
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      answersElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.answer) {
      selectedCable = currentQuestion.cable; // Asigna el cable correcto
      alert(
        `¡Correcto! Puedes usar el cable ${selectedCable} para conectar los dispositivos.`
      );
  
      // Mostrar el área de juego
      document.getElementById("question-section").classList.add("hidden");
      document.getElementById("game-section").classList.remove("hidden");
  
      // Generar obstáculos y comenzar el juego
      generateObstacles();
      drawGame();
    } else {
      alert("¡Incorrecto! Por favor, intenta nuevamente.");
    }
  }
// Reiniciar el juego
function selectCable(cableType) {
    if (!selectedCable) {
      alert("Por favor responde correctamente para seleccionar un cable.");
      return;
    }
  
    if (cableType !== selectedCable) {
      alert(
        `¡Cable incorrecto! Necesitas usar el cable ${selectedCable} para esta conexión.`
      );
      return;
    }
  
    alert(`Has seleccionado correctamente el cable ${cableType}. ¡Conéctalo ahora!`);
  }
  
// Actualiza esta función para reiniciar el juego después de una conexión exitosa
function resetGame() {
    currentPath = [];
    isDrawing = false;
    selectedCable = null; // Resetea el cable seleccionado
    document.getElementById("game-section").classList.add("hidden");
    document.getElementById("question-section").classList.remove("hidden");
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; // Avanza a la siguiente pregunta
    showQuestion();
  }
  

// Iniciar el juego mostrando la primera pregunta
showQuestion();
