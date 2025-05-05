const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let animationFrame;
let currentQuestionIndex = 0;
const scenarios = [
  {
    question: "Conectar un audífono inalámbrico a un teléfono.",
    correct: "Bluetooth",
    explanation: "Bluetooth es ideal para conexiones de corto alcance como audífonos.",
  },
  {
    question: "Transmitir datos entre una computadora y un router a corta distancia.",
    correct: "WiFi",
    explanation: "WiFi es ideal para transmitir datos de manera inalámbrica a corta distancia.",
  },
  {
    question: "Enviar señales a un satélite en órbita.",
    correct: "Satélite",
    explanation: "Los satélites son ideales para comunicaciones de larga distancia.",
  },
];

function drawBase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el dispositivo inicial
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Dispositivo", canvas.width / 2 - 40, canvas.height / 2 - 30);
}

drawBase();

function animateBluetooth() {
  let waveRadius = 0;

  function wave() {
    drawBase();

    // Dibujar ondas concéntricas
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(102, 153, 255, ${1 - i * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        waveRadius - i * 15,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    // Dibujar "dispositivos" cercanos conectados
    const devices = [
      { x: canvas.width / 2 + 50, y: canvas.height / 2 - 50 },
      { x: canvas.width / 2 - 50, y: canvas.height / 2 + 50 },
      { x: canvas.width / 2 + 70, y: canvas.height / 2 + 70 },
    ];

    devices.forEach((device, index) => {
      ctx.fillStyle = "#6699ff";
      ctx.beginPath();
      ctx.arc(device.x, device.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Dibujar líneas de conexión
      ctx.strokeStyle = "#6699ff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(device.x, device.y);
      ctx.stroke();
    });

    waveRadius += 2;

    if (waveRadius > 100) {
      waveRadius = 0;
    }

    animationFrame = requestAnimationFrame(wave);
  }

  wave();
}

function animateWiFi() {
  let waveRadius = 0;

  function wave() {
    drawBase();

    // Dibujar ondas grandes
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(102, 255, 102, ${1 - i * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        waveRadius - i * 30,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    waveRadius += 3;

    if (waveRadius > canvas.width) {
      waveRadius = 0;
    }

    animationFrame = requestAnimationFrame(wave);
  }

  wave();
}

function animateSatellite() {
  let lines = [];

  // Generar líneas iniciales
  for (let i = 0; i < 10; i++) {
    lines.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: Math.random() * Math.PI * 2,
      length: 0,
    });
  }

  function wave() {
    drawBase();

    lines.forEach((line) => {
      ctx.strokeStyle = "rgba(255, 255, 102, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(
        canvas.width / 2 + Math.cos(line.angle) * line.length,
        canvas.height / 2 + Math.sin(line.angle) * line.length
      );
      ctx.stroke();

      line.length += 5;

      if (line.length > canvas.width / 2) {
        line.length = 0;
      }
    });

    animationFrame = requestAnimationFrame(wave);
  }

  wave();
}

function startAnimation(type) {
  cancelAnimationFrame(animationFrame);

  if (type === "Bluetooth") {
    animateBluetooth();
  } else if (type === "WiFi") {
    animateWiFi();
  } else if (type === "Satélite") {
    animateSatellite();
  }
}

function resetAnimation() {
  cancelAnimationFrame(animationFrame);
  drawBase();
}

function loadNextScenario() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= scenarios.length) {
    currentQuestionIndex = 0; // Reinicia al inicio si se terminan las preguntas
  }

  const scenario = scenarios[currentQuestionIndex];
  document.getElementById("question").textContent = scenario.question;
  document.getElementById("feedback").textContent = "";
  resetAnimation();
}

function checkAnswer(answer) {
  const scenario = scenarios[currentQuestionIndex];
  const feedback = document.getElementById("feedback");

  if (answer === scenario.correct) {
    feedback.textContent = `¡Correcto! ${scenario.explanation}`;
    feedback.style.backgroundColor = "#28a745";
    startAnimation(scenario.correct);

    setTimeout(() => {
      loadNextScenario();
    }, 3000); // Espera 3 segundos antes de cargar el siguiente escenario
  } else {
    feedback.textContent = "¡Incorrecto! Intenta nuevamente.";
    feedback.style.backgroundColor = "#dc3545";
  }
}

loadNextScenario();
