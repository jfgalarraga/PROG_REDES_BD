const quizData = [
    {
      question: "¿Cuál de estos dispositivos te conecta al WiFi sin cables?",
      options: ["Router", "Teléfono fijo", "Impresora con cable"],
      correct: "Router",
      explanation: "El router distribuye la señal WiFi, permitiéndote conectarte sin cables.",
    },
    {
      question: "Si estás usando infrarrojos, ¿qué NO puedes hacer?",
      options: ["Conectar dos dispositivos cercanos", "Atravesar paredes", "Enviar datos de un control remoto"],
      correct: "Atravesar paredes",
      explanation: "Los infrarrojos no pueden atravesar paredes, ya que necesitan línea de vista.",
    },
    {
      question: "¿Qué tecnología ayuda a enviar tu selfie al espacio y de vuelta?",
      options: ["Satélite", "Cable de red", "Bluetooth"],
      correct: "Satélite",
      explanation: "Los satélites permiten la comunicación a larga distancia, incluso a través del espacio.",
    },
    {
      question: "¿Qué frecuencia WiFi es más rápida pero tiene menor alcance?",
      options: ["2.4 GHz", "5 GHz", "10 GHz"],
      correct: "5 GHz",
      explanation: "La banda de 5 GHz es más rápida, pero su alcance es más limitado que el de 2.4 GHz.",
    },
    {
      question: "¿Qué dispositivo usarías para compartir música con tus amigos a corta distancia?",
      options: ["Bluetooth", "Satélite", "Cable de fibra óptica"],
      correct: "Bluetooth",
      explanation: "Bluetooth es ideal para conexiones cercanas, como compartir música o archivos.",
    },
    {
      question: "¿Qué tipo de señal usan las microondas para calentar tu comida y transmitir datos?",
      options: ["Ondas de radio", "Microondas", "Ondas de sonido"],
      correct: "Microondas",
      explanation: "Las microondas son ondas electromagnéticas usadas tanto para calentar alimentos como para transmitir datos.",
    },
    {
      question: "¿Qué tecnología invisible a tus ojos te permite cambiar de canal con el control remoto?",
      options: ["Infrarrojos", "Bluetooth", "WiFi"],
      correct: "Infrarrojos",
      explanation: "Los controles remotos utilizan infrarrojos para enviar señales al televisor.",
    },
    {
      question: "Estás en una isla desierta. ¿Qué tecnología te conectaría al mundo?",
      options: ["Satélite", "Cable coaxial", "Bluetooth"],
      correct: "Satélite",
      explanation: "Los satélites permiten la comunicación desde lugares remotos como una isla desierta.",
    },
    {
      question: "¿Qué medio de conexión te permite navegar por internet mientras caminas por casa?",
      options: ["WiFi", "Fibra óptica", "Cable coaxial"],
      correct: "WiFi",
      explanation: "WiFi permite la conexión inalámbrica dentro de un rango determinado.",
    },
    {
      question: "¿Qué conexión sigue funcionando aunque estés bajo una roca (literalmente)?",
      options: ["Cable de fibra óptica", "WiFi", "Infrarrojos"],
      correct: "Cable de fibra óptica",
      explanation: "Los cables de fibra óptica no dependen de señales inalámbricas y funcionan sin interferencias.",
    },
  ];
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const nextQuestionButton = document.getElementById("next-question");
  const animationCanvas = document.getElementById("animationCanvas");
  const ctx = animationCanvas.getContext("2d");
  const resultModal = document.getElementById("result-modal");
  const scoreElement = document.getElementById("score");
  const restartGameButton = document.getElementById("restart-game");
  const progressBar = document.getElementById("progress-bar");

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.textContent = option;
      button.onclick = () => checkAnswer(button, option);
      optionsElement.appendChild(button);
    });
  
    feedbackElement.classList.add("hidden");
    nextQuestionButton.classList.add("hidden");
    clearAnimation();
    updateProgressBar();
  }
  
  function checkAnswer(selectedButton, selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
  
    // Desactivar todos los botones para evitar múltiples elecciones
    const buttons = document.querySelectorAll(".options .btn");
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.textContent === currentQuestion.correct) {
        button.style.backgroundColor = "#28a745"; // Resaltar la respuesta correcta en verde
      } else {
        button.style.backgroundColor = "#dc3545"; // Resaltar las incorrectas en rojo
      }
    });
  
    // Mostrar retroalimentación
    feedbackElement.classList.remove("hidden");
    if (selectedOption === currentQuestion.correct) {
      feedbackElement.textContent = `¡Correcto! ${currentQuestion.explanation}`;
      feedbackElement.classList.add("correct");
      feedbackElement.classList.remove("incorrect");
      score++;
    } else {
      feedbackElement.textContent = `¡Incorrecto! ${currentQuestion.explanation}`;
      feedbackElement.classList.add("incorrect");
      feedbackElement.classList.remove("correct");
    }
  
    // Mostrar el botón "Continuar" después de la selección
    nextQuestionButton.classList.remove("hidden");
  
    // Llamar a la animación asociada
    startAnimation(currentQuestion.correct);
  }
  
  function startAnimation(type) {
    if (type === "Router") animateRouter();
    else if (type === "WiFi") animateWiFiInHome();
    else if (type === "Infrarrojos") animateInfraredControl();
    else if (type === "Satélite") animateSatellite();
    else if (type === "Bluetooth") animateBluetoothSharing();
    else if (type === "Microondas") animateMicrowaveSignal();
    else if (type === "Celular") animateCellular();
    else if (type === "Atravesar paredes") animateInfraredWall();
    else if (type === "5 GHz") animateWiFiComparison();
    else if (type == "Cable de fibra óptica") animateFiberOpticImproved();
  }
  

function clearAnimation() {
  ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
}
function animateFiberOpticImproved() {
    const rockX = animationCanvas.width / 2 - 60; // Roca en el centro
    const rockY = animationCanvas.height / 2 - 30;
    const rockWidth = 120;
    const rockHeight = 60;
  
    const cableStartX = 50; // Inicio del cable
    const cableStartY = animationCanvas.height / 2;
    const cableEndX = animationCanvas.width - 50; // Final del cable
    const cableEndY = animationCanvas.height / 2;
  
    const controlPointX = animationCanvas.width / 2; // Punto de control de la curva
    const controlPointY = cableStartY - 70; // Punto más alto de la curva
    let lightT = 0; // Posición de la luz en la curva (0 a 1)
  
    function draw() {
      clearAnimation();
  
      // Dibujar el cable de fibra óptica (curvado)
      ctx.strokeStyle = "rgba(0, 128, 255, 1)"; // Azul para el cable
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cableStartX, cableStartY); // Inicio del cable
      ctx.quadraticCurveTo(controlPointX, controlPointY, cableEndX, cableEndY); // Curva sobre la roca
      ctx.stroke();
  
      // Dibujar la roca
      ctx.fillStyle = "rgba(128, 128, 128, 1)"; // Gris para la roca
      ctx.fillRect(rockX, rockY, rockWidth, rockHeight);
  
      // Dibujar el dispositivo al final del cable
      ctx.fillStyle = "rgba(255, 165, 0, 1)"; // Naranja para el dispositivo
      ctx.fillRect(cableEndX - 20, cableEndY - 30, 40, 60); // Dispositivo rectangular
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "12px Arial";
      ctx.fillText("Dispositivo", cableEndX - 30, cableEndY + 50);
  
      // Calcular la posición de la luz en la curva (usando interpolación)
      const lightX =
        (1 - lightT) * (1 - lightT) * cableStartX +
        2 * (1 - lightT) * lightT * controlPointX +
        lightT * lightT * cableEndX;
      const lightY =
        (1 - lightT) * (1 - lightT) * cableStartY +
        2 * (1 - lightT) * lightT * controlPointY +
        lightT * lightT * cableEndY;
  
      // Dibujar la luz que viaja por el cable
      ctx.fillStyle = "rgba(255, 255, 0, 1)"; // Amarillo para la luz
      ctx.beginPath();
      ctx.arc(lightX, lightY, 8, 0, Math.PI * 2); // Luz como un círculo
      ctx.fill();
  
      // Incrementar la posición de la luz a lo largo de la curva
      lightT += 0.02;
      if (lightT > 1) {
        lightT = 0; // Reiniciar la luz cuando llega al final
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  
  
  
function animateWiFi() {
    let radius = 0;
    const maxRadius = Math.min(animationCanvas.width, animationCanvas.height) / 2;
  
    function draw() {
      clearAnimation();
      ctx.strokeStyle = `rgba(0, 255, 127, ${1 - radius / maxRadius})`;
      ctx.lineWidth = 2;
  
      for (let i = 0; i < 6; i++) {
        const currentRadius = radius - i * 30;
        if (currentRadius > 0) {
          ctx.beginPath();
          ctx.arc(
            animationCanvas.width / 2,
            animationCanvas.height / 2,
            currentRadius,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }
  
      radius += 4;
      if (radius > maxRadius + 150) {
        radius = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  function animateDesertIsland() {
    const islandX = animationCanvas.width / 4; // Posición de la isla
    const islandY = animationCanvas.height - 100; // Parte inferior del canvas
    const satelliteX = animationCanvas.width - 100; // Posición del satélite
    const satelliteY = 100; // Parte superior derecha
    let wavePosition = 0;
  
    function draw() {
      clearAnimation();
  
      // Dibujar la isla
      ctx.fillStyle = "rgba(34, 139, 34, 1)"; // Color verde para la isla
      ctx.beginPath();
      ctx.arc(islandX, islandY, 50, 0, Math.PI * 2); // Círculo para la isla
      ctx.fill();
  
      // Dibujar el agua alrededor de la isla
      ctx.fillStyle = "rgba(0, 191, 255, 0.5)"; // Agua alrededor
      ctx.beginPath();
      ctx.arc(islandX, islandY, 60, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar la antena en la isla
      ctx.fillStyle = "rgba(128, 128, 128, 1)"; // Base de la antena
      ctx.fillRect(islandX - 5, islandY - 50, 10, 50); // Torre de la antena
      ctx.beginPath();
      ctx.moveTo(islandX, islandY - 50); // Antena superior
      ctx.lineTo(islandX - 15, islandY - 70);
      ctx.lineTo(islandX + 15, islandY - 70);
      ctx.closePath();
      ctx.fill();
  
      // Dibujar el satélite
      ctx.fillStyle = "rgba(255, 255, 0, 1)";
      ctx.beginPath();
      ctx.arc(satelliteX, satelliteY, 15, 0, Math.PI * 2); // Satélite como un círculo amarillo
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("Satélite", satelliteX - 20, satelliteY + 30);
  
      // Dibujar las señales desde el satélite hacia la antena
      ctx.strokeStyle = `rgba(0, 255, 0, ${1 - wavePosition / 100})`; // Ondas verdes con desvanecimiento
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const radius = wavePosition - i * 20;
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(satelliteX, satelliteY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar línea de conexión entre el satélite y la antena
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; // Línea de conexión blanca
      ctx.beginPath();
      ctx.moveTo(satelliteX, satelliteY);
      ctx.lineTo(islandX, islandY - 50); // Conectar a la antena
      ctx.stroke();
  
      // Incrementar posición de las ondas
      wavePosition += 3;
      if (wavePosition > 100) {
        wavePosition = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  
  function animateInfraredControl() {
    const remoteX = 100; // Posición inicial del control remoto
    const remoteY = animationCanvas.height - 150; // Parte inferior izquierda del canvas
    const tvX = animationCanvas.width - 200; // Posición de la televisión
    const tvY = 100; // Parte superior derecha
    let beamWidth = 0; // Para simular el rayo dinámico
  
    function draw() {
      clearAnimation();
  
      // Dibujar el control remoto
      ctx.fillStyle = "rgba(128, 128, 128, 1)";
      ctx.fillRect(remoteX, remoteY, 40, 100); // Rectángulo del control remoto
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.beginPath();
      ctx.arc(remoteX + 20, remoteY, 8, 0, Math.PI * 2); // LED del control remoto
      ctx.fill();
  
      // Dibujar la televisión
      ctx.fillStyle = "rgba(0, 0, 128, 1)";
      ctx.fillRect(tvX, tvY, 150, 100); // Rectángulo de la pantalla
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "14px Arial";
      ctx.fillText("TV", tvX + 60, tvY + 60); // Texto en el televisor
  
      // Dibujar el rayo infrarrojo
      ctx.strokeStyle = `rgba(255, 0, 0, ${0.5 + beamWidth / 100})`; // Rayo con desvanecimiento dinámico
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(remoteX + 20, remoteY); // Desde el LED del control remoto
      ctx.lineTo(tvX + 75, tvY + 50); // Hasta el receptor de la TV
      ctx.stroke();
  
      // Dibujar el receptor en la TV
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.beginPath();
      ctx.arc(tvX + 75, tvY + 50, 5, 0, Math.PI * 2); // Pequeño círculo en la TV
      ctx.fill();
  
      // Simular el efecto dinámico del rayo infrarrojo
      beamWidth += 2;
      if (beamWidth > 100) {
        beamWidth = 0; // Reiniciar el efecto del rayo
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  
  function animateSatellite() {
    const earthX = animationCanvas.width / 2;
    const earthY = animationCanvas.height / 2;
    const satelliteOrbitRadius = 150;
    const satelliteSize = 15;
    let satelliteAngle = 0;
    let waveRadius = 0;
  
    function draw() {
      clearAnimation();
  
      // Dibujar la "Tierra"
      ctx.fillStyle = "rgba(0, 100, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(earthX, earthY, 80, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar el satélite
      const satelliteX = earthX + satelliteOrbitRadius * Math.cos(satelliteAngle);
      const satelliteY = earthY + satelliteOrbitRadius * Math.sin(satelliteAngle);
      ctx.fillStyle = "rgba(255, 255, 0, 1)";
      ctx.beginPath();
      ctx.arc(satelliteX, satelliteY, satelliteSize, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar "ondas de datos" (transmisión desde el satélite)
      ctx.strokeStyle = `rgba(0, 255, 0, ${1 - waveRadius / 200})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const currentRadius = waveRadius - i * 40;
        if (currentRadius > 0) {
          ctx.beginPath();
          ctx.arc(satelliteX, satelliteY, currentRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar "punto de recepción" en la Tierra
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.beginPath();
      ctx.arc(earthX, earthY + 100, 10, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar línea de conexión
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(satelliteX, satelliteY);
      ctx.lineTo(earthX, earthY + 100); // Punto de recepción
      ctx.stroke();
  
      // Incrementar el radio de las ondas y la posición del satélite
      waveRadius += 3;
      if (waveRadius > 200) {
        waveRadius = 0;
      }
  
      satelliteAngle += 0.02;
      if (satelliteAngle > Math.PI * 2) {
        satelliteAngle = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  function animateWiFiInHome() {
    const routerX = animationCanvas.width / 2;
    const routerY = animationCanvas.height / 2;
    let waveRadius = 0;
  
    // Dispositivos móviles moviéndose dinámicamente
    const devices = [
      { x: 100, y: 100, dx: 2, dy: 1, color: "rgba(0, 255, 255, 1)" },
      { x: animationCanvas.width - 100, y: 200, dx: -1.5, dy: 1.2, color: "rgba(255, 165, 0, 1)" },
      { x: 200, y: animationCanvas.height - 100, dx: 1.8, dy: -1.5, color: "rgba(127, 0, 255, 1)" },
      { x: animationCanvas.width - 150, y: animationCanvas.height - 150, dx: -1, dy: -1, color: "rgba(255, 0, 127, 1)" },
    ];
  
    function draw() {
      clearAnimation();
  
      // Dibujar el router en el centro
      ctx.fillStyle = "rgba(0, 128, 255, 1)";
      ctx.beginPath();
      ctx.arc(routerX, routerY, 20, 0, Math.PI * 2);
      ctx.fill();
  
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "14px Arial";
      ctx.fillText("Router WiFi", routerX - 35, routerY - 30);
  
      // Dibujar las ondas de WiFi
      ctx.strokeStyle = `rgba(0, 255, 0, ${1 - waveRadius / 300})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const currentRadius = waveRadius - i * 40;
        if (currentRadius > 0) {
          ctx.beginPath();
          ctx.arc(routerX, routerY, currentRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar los dispositivos conectados
      devices.forEach((device) => {
        // Dibujar el dispositivo como un círculo
        ctx.fillStyle = device.color;
        ctx.beginPath();
        ctx.arc(device.x, device.y, 10, 0, Math.PI * 2);
        ctx.fill();
  
        // Dibujar línea de conexión al router
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(device.x, device.y);
        ctx.lineTo(routerX, routerY);
        ctx.stroke();
  
        // Mover el dispositivo
        device.x += device.dx;
        device.y += device.dy;
  
        // Rebotar el dispositivo en los bordes del canvas
        if (device.x < 0 || device.x > animationCanvas.width) device.dx *= -1;
        if (device.y < 0 || device.y > animationCanvas.height) device.dy *= -1;
      });
  
      // Incrementar el radio de las ondas y reiniciar cuando superen cierto tamaño
      waveRadius += 3;
      if (waveRadius > 300) {
        waveRadius = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  function animateWiFiComparison() {
    const ballSize = 15;
    const startY = animationCanvas.height / 3;
    const labelOffset = 50;
    let position24GHz = 50; // Posición inicial para 2.4 GHz
    let position5GHz = 50; // Posición inicial para 5 GHz
    let waveRadius24GHz = 0;
    let waveRadius5GHz = 0;
  
    function draw() {
      clearAnimation();
  
      // Dibujar las etiquetas
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText("2.4 GHz (Mayor alcance, menor velocidad)", 50, startY - labelOffset);
      ctx.fillText("5 GHz (Menor alcance, mayor velocidad)", 50, startY * 2 - labelOffset);
  
      // Dibujar las ondas para 2.4 GHz
      ctx.strokeStyle = `rgba(0, 128, 255, ${1 - waveRadius24GHz / 100})`; // Azul con desvanecimiento
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const radius = waveRadius24GHz - i * 20;
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(position24GHz, startY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar la bola para 2.4 GHz
      ctx.fillStyle = "rgba(0, 128, 255, 1)";
      ctx.beginPath();
      ctx.arc(position24GHz, startY, ballSize, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar las ondas para 5 GHz
      ctx.strokeStyle = `rgba(255, 165, 0, ${1 - waveRadius5GHz / 60})`; // Naranja con desvanecimiento
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const radius = waveRadius5GHz - i * 10;
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(position5GHz, startY * 2, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar la bola para 5 GHz
      ctx.fillStyle = "rgba(255, 165, 0, 1)";
      ctx.beginPath();
      ctx.arc(position5GHz, startY * 2, ballSize, 0, Math.PI * 2);
      ctx.fill();
  
      // Incrementar la posición y el tamaño de las ondas
      position24GHz += 1; // 2.4 GHz se mueve más lento
      position5GHz += 2; // 5 GHz se mueve más rápido
  
      waveRadius24GHz += 2;
      waveRadius5GHz += 3;
  
      // Reiniciar la posición de las bolas cuando salen del canvas
      if (position24GHz > animationCanvas.width) {
        position24GHz = 50;
        waveRadius24GHz = 0;
      }
      if (position5GHz > animationCanvas.width) {
        position5GHz = 50;
        waveRadius5GHz = 0;
      }
  
      // Reiniciar ondas si superan cierto tamaño
      if (waveRadius24GHz > 100) waveRadius24GHz = 0;
      if (waveRadius5GHz > 60) waveRadius5GHz = 0;
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }  
  
  
  function animateBluetoothSharing() {
    const deviceLeftX = 100;
    const deviceRightX = animationCanvas.width - 100;
    const deviceY = animationCanvas.height / 2;
    let wavePosition = 0;
  
    function draw() {
      clearAnimation();
  
      // Dibujar el dispositivo de la izquierda
      ctx.fillStyle = "rgba(0, 128, 255, 1)";
      ctx.fillRect(deviceLeftX - 30, deviceY - 50, 60, 100); // Rectángulo del dispositivo
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "12px Arial";
      ctx.fillText("Teléfono A", deviceLeftX - 35, deviceY + 70);
  
      // Dibujar el dispositivo de la derecha
      ctx.fillStyle = "rgba(255, 165, 0, 1)";
      ctx.fillRect(deviceRightX - 30, deviceY - 50, 60, 100); // Rectángulo del dispositivo
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("Teléfono B", deviceRightX - 35, deviceY + 70);
  
      // Dibujar las ondas de datos (que viajan del dispositivo A al B y viceversa)
      ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
      ctx.lineWidth = 2;
  
      // Onda del dispositivo A al dispositivo B
      ctx.beginPath();
      ctx.arc(
        deviceLeftX + 30 + wavePosition,
        deviceY,
        20,
        0,
        Math.PI * 2
      );
      ctx.stroke();
  
      // Onda del dispositivo B al dispositivo A
      ctx.beginPath();
      ctx.arc(
        deviceRightX - 30 - wavePosition,
        deviceY,
        20,
        0,
        Math.PI * 2
      );
      ctx.stroke();
  
      // Dibujar un icono de música en el medio para reforzar el concepto
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "24px Arial";
      ctx.fillText("♪", animationCanvas.width / 2 - 10, deviceY + 10);
  
      // Incrementar la posición de las ondas
      wavePosition += 4;
      if (wavePosition > deviceRightX - deviceLeftX - 60) {
        wavePosition = 0; // Reinicia la onda cuando alcanza el otro dispositivo
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  
  function animateMicrowaveSignal() {
    const microwaveX = 150; // Posición del microondas
    const microwaveY = animationCanvas.height / 2 - 50; // Centro del canvas
    const waveStartX = microwaveX + 100; // Punto inicial de las ondas
    const waveStartY = microwaveY + 40;
    let wavePosition = 0;
    let heatGlow = 0;
    let glowDirection = 1;
  
    function draw() {
      clearAnimation();
  
      // Dibujar el microondas
      ctx.fillStyle = "rgba(128, 128, 128, 1)";
      ctx.fillRect(microwaveX, microwaveY, 100, 80); // Cuerpo del microondas
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(microwaveX + 10, microwaveY + 10, 80, 60); // Ventana del microondas
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "12px Arial";
      ctx.fillText("Microondas", microwaveX + 10, microwaveY + 75);
  
      // Dibujar el plato dentro del microondas
      ctx.fillStyle = `rgba(255, 0, 0, ${0.5 + heatGlow / 20})`;
      ctx.beginPath();
      ctx.arc(microwaveX + 50, microwaveY + 40, 15, 0, Math.PI * 2);
      ctx.fill();
  
      // Dibujar ondas de microondas que salen
      ctx.strokeStyle = `rgba(255, 165, 0, ${1 - wavePosition / 200})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const radius = wavePosition - i * 20;
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(waveStartX, waveStartY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar el receptor de las ondas
      const receiverX = animationCanvas.width - 100;
      const receiverY = animationCanvas.height / 2;
      ctx.fillStyle = "rgba(0, 0, 255, 1)";
      ctx.fillRect(receiverX - 20, receiverY - 40, 40, 80); // Receptor
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "12px Arial";
      ctx.fillText("Receptor", receiverX - 25, receiverY + 50);
  
      // Dibujar líneas que conectan el microondas al receptor
      ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
      ctx.beginPath();
      ctx.moveTo(waveStartX, waveStartY);
      ctx.lineTo(receiverX, receiverY);
      ctx.stroke();
  
      // Actualizar la posición de las ondas y el efecto de calor
      wavePosition += 3;
      if (wavePosition > 200) {
        wavePosition = 0;
      }
  
      heatGlow += glowDirection;
      if (heatGlow > 20 || heatGlow < 0) {
        glowDirection *= -1;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  
  function animateFiberOptic() {
    let particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * animationCanvas.width,
      y: Math.random() * animationCanvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));
  
    function draw() {
      clearAnimation();
      ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
  
        p.x += p.vx;
        p.y += p.vy;
  
        if (p.x < 0 || p.x > animationCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > animationCanvas.height) p.vy *= -1;
      });
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  function animateCellular() {
    let towerX = animationCanvas.width / 2;
    let towerY = animationCanvas.height / 2;
    let waveRadius = 0;
  
    function draw() {
      clearAnimation();
      ctx.fillStyle = "gray";
      ctx.fillRect(towerX - 5, towerY - 50, 10, 50); // Torre
  
      ctx.strokeStyle = `rgba(127, 0, 255, ${1 - waveRadius / animationCanvas.width})`;
      ctx.lineWidth = 2;
  
      ctx.beginPath();
      ctx.arc(towerX, towerY, waveRadius, 0, Math.PI * 2);
      ctx.stroke();
  
      waveRadius += 3;
      if (waveRadius > animationCanvas.width / 2) {
        waveRadius = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }

  function animateRouter() {
    let waveRadius = 0;
    const routerX = animationCanvas.width / 2;
    const routerY = animationCanvas.height - 50;
    const devices = [
      { x: 150, y: 100, color: "rgba(0, 255, 255, 1)" },
      { x: 300, y: 50, color: "rgba(255, 165, 0, 1)" },
      { x: 500, y: 120, color: "rgba(127, 0, 255, 1)" },
      { x: 650, y: 80, color: "rgba(255, 0, 127, 1)" },
    ];
  
    function draw() {
      clearAnimation();
  
      // Dibujar el router
      ctx.fillStyle = "rgba(0, 0, 255, 1)";
      ctx.fillRect(routerX - 50, routerY, 100, 30);
  
      // Dibujar antenas del router
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(routerX - 30, routerY - 20, 6, 20);
      ctx.fillRect(routerX + 25, routerY - 20, 6, 20);
  
      // Dibujar ondas WiFi desde el router
      ctx.strokeStyle = `rgba(0, 255, 0, ${1 - waveRadius / 300})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const currentRadius = waveRadius - i * 40;
        if (currentRadius > 0) {
          ctx.beginPath();
          ctx.arc(routerX, routerY - 10, currentRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
  
      // Dibujar dispositivos conectados y líneas de conexión
      devices.forEach((device) => {
        // Dispositivo
        ctx.fillStyle = device.color;
        ctx.beginPath();
        ctx.arc(device.x, device.y, 10, 0, Math.PI * 2);
        ctx.fill();
  
        // Línea de conexión
        ctx.strokeStyle = device.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(routerX, routerY);
        ctx.lineTo(device.x, device.y);
        ctx.stroke();
      });
  
      waveRadius += 4;
      if (waveRadius > 300) {
        waveRadius = 0;
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }

  function animateInfraredWall() {
    const emitterX = 100; // Posición del emisor (control remoto)
    const emitterY = animationCanvas.height / 2;
    const wallX = animationCanvas.width / 2; // Pared en el centro del canvas
    const wallY = animationCanvas.height / 2 - 100;
    const wallWidth = 30;
    const wallHeight = 200;
    let beamX = emitterX;
  
    function draw() {
      clearAnimation();
  
      // Dibujar el emisor (control remoto)
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.fillRect(emitterX - 10, emitterY - 10, 20, 20);
  
      // Dibujar la pared
      ctx.fillStyle = "rgba(128, 128, 128, 0.8)";
      ctx.fillRect(wallX, wallY, wallWidth, wallHeight);
  
      // Dibujar el rayo infrarrojo
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(emitterX, emitterY);
      if (beamX < wallX) {
        ctx.lineTo(beamX, emitterY); // El rayo se detiene al llegar a la pared
      } else {
        ctx.lineTo(wallX, emitterY); // El rayo choca con la pared
      }
      ctx.stroke();
  
      // Dibujar el efecto de "choque" al llegar a la pared
      if (beamX >= wallX) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(wallX, emitterY, 10, 0, Math.PI * 2);
        ctx.fill();
      }
  
      // Incrementar la posición del rayo hasta que choque con la pared
      beamX += 5;
      if (beamX > wallX + 10) {
        beamX = emitterX; // Reinicia el rayo
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
    
    
  function showResult() {
    const totalQuestions = quizData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    let resultMessage = "";
  
    if (percentage === 100) {
      resultMessage = "¡Perfecto! ¡Eres un experto!";
    } else if (percentage >= 80) {
      resultMessage = "¡Muy bien! Tienes un excelente conocimiento.";
    } else if (percentage >= 50) {
      resultMessage = "¡Bien hecho! Pero aún puedes mejorar.";
    } else {
      resultMessage = "¡Sigue practicando! Puedes hacerlo mejor.";
    }
  
    scoreElement.innerHTML = `
      <span style="font-size: 2rem; color: #ffc107;">Puntuación: ${score}/${totalQuestions}</span><br>
      <span>${resultMessage}</span>
    `;
  
    resultModal.classList.remove("hidden");
    resultModal.style.display = "block"; // Asegúrate de mostrar el modal
    progressBar.style.width = "0%";
  
    const playAgainButton = document.getElementById("play-again");
    playAgainButton.onclick = restartGame; // Asigna la función al botón dinámico
  }
  
  function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    resultModal.classList.add("hidden");
    resultModal.style.display = "none"; // Oculta el modal al reiniciar
    loadQuestion();
  }
  
  
  nextQuestionButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
      showResult();
    } else {
      loadQuestion();
    }
  };
  
  
  restartGameButton.onclick = restartGame;

  loadQuestion();
  