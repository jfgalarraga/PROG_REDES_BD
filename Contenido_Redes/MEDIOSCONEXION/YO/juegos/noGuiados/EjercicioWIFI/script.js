const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

let animationFrame;
let frequencyType = "";
let obstacles = [];
let interferencesActive = false;

// Configuración para las frecuencias
const frequencies = {
  "2.4GHz": { range: 700, color: "rgba(102, 255, 102, 0.8)", speed: 1, interferenceRange: 600 },
  "5GHz": { range: 300, color: "rgba(255, 102, 102, 0.8)", speed: 2, interferenceRange: 250 },
};

// Coordenadas de origen
const startPosition = { x: canvas.width / 2, y: canvas.height / 2 };

function drawBase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el punto de origen
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(startPosition.x, startPosition.y, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("📡 Router WiFi", startPosition.x - 50, startPosition.y - 30);

  // Dibujar interferencias si están activadas
  if (interferencesActive) {
    drawInterferences();
  }
}

function generateObstacles() {
  obstacles = [
    { x: 200, y: 150, width: 50, height: 200 },
    { x: 400, y: 100, width: 50, height: 50 },
    { x: 600, y: 200, width: 100, height: 20 },
  ];
}

function drawInterferences() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.strokeStyle = "red";
    ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function checkInterference(waveRadius) {
  return obstacles.filter((obstacle) => {
    const obstacleCenterX = obstacle.x + obstacle.width / 2;
    const obstacleCenterY = obstacle.y + obstacle.height / 2;
    const distance = Math.sqrt(
      (startPosition.x - obstacleCenterX) ** 2 +
        (startPosition.y - obstacleCenterY) ** 2
    );
    return distance <= waveRadius;
  });
}

function animateSignal() {
  drawBase();

  let waveRadius = 0;
  let effectiveRange = interferencesActive
    ? frequencies[frequencyType].interferenceRange
    : frequencies[frequencyType].range;
  const { range, color, speed } = frequencies[frequencyType];

  function wave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();

    const interferedObstacles = interferencesActive
      ? checkInterference(waveRadius)
      : [];

    // Animación de distorsión y atenuación
    if (interferencesActive) {
      interferedObstacles.forEach(() => {
        effectiveRange -= 0.0000000000000001; // Reducir alcance efectivo por cada interferencia
      });
    }

    // Animación de ondas
    for (let i = 0; i < 5; i++) {
      if (waveRadius - i * 20 > 0) {
        ctx.strokeStyle = interferencesActive
          ? `rgba(255, 165, 0, ${1 - i * 0.2})`
          : `${color}`;
        ctx.lineWidth = interferencesActive ? 1.5 : 2;
        ctx.setLineDash(interferencesActive ? [10, 5] : []); // Distorsión
        ctx.beginPath();
        ctx.arc(
          startPosition.x,
          startPosition.y,
          waveRadius - i * 20,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.setLineDash([]); // Resetear
      }
    }

    waveRadius += speed;

    if (waveRadius > effectiveRange) {
      const resultMessage = interferencesActive
        ? `La señal alcanzó ${effectiveRange} metros debido a interferencias.`
        : `La señal alcanzó su rango máximo de ${range} metros.`;
      showResultMessage(resultMessage);
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(wave);
    }
  }

  wave();
}

function toggleInterferences() {
  interferencesActive = !interferencesActive;
  const btn = document.getElementById("toggleInterferences");
  btn.textContent = interferencesActive
    ? "Desactivar Interferencias"
    : "Activar Interferencias";
  if (interferencesActive) {
    generateObstacles();
  }
}

function startSimulation(type) {
  frequencyType = type;
  document.getElementById("resultMessage").classList.add("hidden");
  animateSignal();
}

function showResultMessage(message) {
  const resultText = document.getElementById("resultText");
  resultText.textContent = message;
  document.getElementById("resultMessage").classList.remove("hidden");
}

function restartSimulation() {
  cancelAnimationFrame(animationFrame);
  drawBase();
  document.getElementById("resultMessage").classList.add("hidden");
}

// Inicializa el canvas
drawBase();
