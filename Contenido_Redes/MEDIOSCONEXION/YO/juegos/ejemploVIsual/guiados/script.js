const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

const startPosition = { x: 50, y: canvas.height / 2 };
const endPosition = { x: canvas.width - 50, y: canvas.height / 2 };
let currentSignalPosition = { ...startPosition };
let mediumType = "";
let animationFrame;

function drawBase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Base visual del canvas sin textos internos
}

function animateSignal() {
  drawBase();

  switch (mediumType) {
    case "utp":
      animateUTP();
      break;
    case "fiber":
      animateFiber();
      break;
    case "wifi":
      animateWiFi();
      break;
    case "bluetooth":
      animateBluetooth();
      break;
    case "satellite":
      animateSatellite();
      break;
  }
}

function animateUTP() {
  ctx.strokeStyle = "#ffdd57";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(endPosition.x, endPosition.y);
  ctx.stroke();

  if (currentSignalPosition.x < endPosition.x) {
    currentSignalPosition.x += 1.5; // Más lento
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(currentSignalPosition.x, currentSignalPosition.y, 12, 0, Math.PI * 2);
    ctx.fill();
    animationFrame = requestAnimationFrame(animateSignal);
  } else {
    endAnimation("UTP");
  }
}

function animateFiber() {
  // Dibujar un cable luminoso
  ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(endPosition.x, endPosition.y);
  ctx.stroke();

  if (currentSignalPosition.x < endPosition.x) {
    currentSignalPosition.x += 3; // Velocidad moderada

    // Haz de luz principal
    ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(currentSignalPosition.x, currentSignalPosition.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Rastro brillante detrás de la señal
    for (let i = 1; i <= 8; i++) {
      ctx.fillStyle = `rgba(0, 255, 255, ${0.7 - i * 0.1})`;
      ctx.beginPath();
      ctx.arc(
        currentSignalPosition.x - i * 10,
        currentSignalPosition.y,
        10 - i * 0.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Resplandor dinámico
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(0, 255, 255, 1)";
    ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
    ctx.lineWidth = 2 + Math.sin(currentSignalPosition.x / 10) * 2;
    ctx.beginPath();
    ctx.arc(currentSignalPosition.x, currentSignalPosition.y, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0; // Eliminar sombra

    animationFrame = requestAnimationFrame(animateSignal);
  } else {
    endAnimation("Fibra Óptica");
  }
}

function animateWiFi() {
  if (currentSignalPosition.x < endPosition.x) {
    currentSignalPosition.x += 1; // Más lento

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(255, 102, 102, ${1 - i * 0.25})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(
        currentSignalPosition.x,
        currentSignalPosition.y,
        30 + i * 20,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
    animationFrame = requestAnimationFrame(animateSignal);
  } else {
    endAnimation("WiFi");
  }
}

function animateBluetooth() {
  const bluetoothIcon = new Image();
  bluetoothIcon.src = "./img/149024.png"; // Ruta a tu imagen local

  // Crear 10 dispositivos distribuidos en el canvas
  const devices = [
    { x: 150, y: canvas.height / 4, active: false },
    { x: 250, y: canvas.height / 2.5, active: false },
    { x: 350, y: canvas.height / 1.5, active: false },
    { x: 450, y: canvas.height / 3, active: false },
    { x: 550, y: canvas.height / 1.8, active: false },
    { x: 650, y: canvas.height / 2.5, active: false },
    { x: 750, y: canvas.height / 1.3, active: false },
    { x: 200, y: canvas.height / 1.8, active: false },
    { x: 500, y: canvas.height / 1.3, active: false },
    { x: 700, y: canvas.height / 3.5, active: false },
  ];

  currentSignalPosition = { ...startPosition }; // Reiniciar posición inicial
  const signalRadius = 50; // Alcance del Bluetooth

  function drawBluetoothSignal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();

    // Dibujar dispositivos
    devices.forEach((device) => {
      // Verificar si está dentro del alcance
      const inRange =
        distance(currentSignalPosition, device) <= signalRadius;

      device.active = inRange; // Activar si está en el rango

      // Conexión entre el símbolo Bluetooth y el dispositivo
      if (inRange) {
        ctx.strokeStyle = "rgba(102, 153, 255, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(currentSignalPosition.x, currentSignalPosition.y);
        ctx.lineTo(device.x, device.y);
        ctx.stroke();
      }

      // Dibujar el dispositivo
      ctx.fillStyle = device.active ? "#6699ff" : "rgba(102, 153, 255, 0.4)";
      ctx.beginPath();
      ctx.arc(device.x, device.y, 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // Dibujar el símbolo de Bluetooth
    ctx.drawImage(
      bluetoothIcon,
      currentSignalPosition.x - 15, // Centrar horizontalmente
      currentSignalPosition.y - 15, // Centrar verticalmente
      30, // Ancho
      30 // Alto
    );

    // Dibujar onda de alcance
    ctx.strokeStyle = "rgba(102, 153, 255, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      currentSignalPosition.x,
      currentSignalPosition.y,
      signalRadius,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // Mover el símbolo hacia el destino
    if (currentSignalPosition.x < endPosition.x) {
      currentSignalPosition.x += 2; // Velocidad
      animationFrame = requestAnimationFrame(drawBluetoothSignal);
    } else {
      endAnimation("Bluetooth");
    }
  }

  bluetoothIcon.onload = drawBluetoothSignal; // Dibujar cuando el símbolo cargue
}

// Función para calcular distancia entre dos puntos
function distance(point1, point2) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}



function animateSatellite() {
  const maxLines = 30; // Incrementamos el número de líneas para mayor densidad
  const directions = []; // Almacena las líneas activas
  const lineSpeed = 3; // Velocidad de movimiento
  let currentStep = 0; // Control de tiempo para generar líneas

  // Generar direcciones iniciales
  for (let i = 0; i < maxLines; i++) {
    directions.push({
      x: startPosition.x,
      y: startPosition.y + Math.random() * 200 - 100, // Posición inicial con dispersión vertical
      dx: Math.random() * 0.5 + 0.5, // Incremento en x
      dy: Math.sin(Math.random() * Math.PI * 2) * 2, // Incremento en y para movimiento dinámico
      reachedDestination: false, // Indica si la línea llegó al destino
    });
  }

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase(); // Dibujar base (origen/destino)

    directions.forEach((line) => {
      if (!line.reachedDestination) {
        // Avanzar la línea hacia el destino
        line.x += line.dx * lineSpeed;
        line.y += line.dy;

        // Dibujar la línea
        ctx.strokeStyle = `rgba(204, 204, 204, ${1 - line.x / canvas.width})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        // Si alcanza el destino, marcar como alcanzado
        if (line.x >= endPosition.x) {
          line.reachedDestination = true;
        }
      } else {
        // Regresar al origen de manera gradual
        line.x -= line.dx * lineSpeed * 0.5; // Más lento al regresar
        line.y -= line.dy * 0.5;

        // Dibujar el retorno
        ctx.strokeStyle = `rgba(204, 204, 204, ${line.x / canvas.width})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        // Reiniciar si regresa completamente al origen
        if (line.x <= startPosition.x) {
          line.reachedDestination = false;
          line.x = startPosition.x;
          line.y = startPosition.y + Math.random() * 200 - 100;
        }
      }
    });

    currentStep++;
    if (currentStep < 400) {
      animationFrame = requestAnimationFrame(drawLines);
    } else {
      endAnimation("Satélite");
    }
  }

  drawLines();
}




function endAnimation(type) {
  cancelAnimationFrame(animationFrame);
  document.getElementById("resultText").textContent = `¡Señal enviada exitosamente con ${type}!`;
}

function startSimulation(type) {
  mediumType = type;
  currentSignalPosition = { ...startPosition };
  document.getElementById("resultText").textContent = "";
  animateSignal();
}

drawBase();
