document.getElementById("startButton").addEventListener("click", function() {
    // Ocultar la pantalla de introducción
    document.getElementById("introScreen").style.display = "none";
    
    // Mostrar la pantalla del juego
    document.getElementById("gameScreen").style.display = "block";
    
    // Iniciar el juego
    startGame();
});

function startGame() {
    let devicesArea = document.getElementById("devicesArea");
    let status = document.getElementById("status");

    // Dispositivos que el jugador debe arrastrar (modem, switch y computadora)
    const devices = [
        { id: "modem", name: "Modem", imgSrc: "https://img.icons8.com/ios/452/modem.png", correctBox: "box1" },
        { id: "switch", name: "Switch", imgSrc: "https://img.icons8.com/ios/452/switch.png", correctBox: "box2" },
        { id: "computer", name: "Computadora", imgSrc: "https://img.icons8.com/ios/452/computer.png", correctBox: "box3" },
        { id: "tv", name: "Televisor", imgSrc: "https://img.icons8.com/ios/452/television.png", correctBox: "box2" }, // Dispositivo extra para confundir
        { id: "phone", name: "Teléfono", imgSrc: "https://img.icons8.com/ios/452/smartphone.png", correctBox: "box3" }, // Otro dispositivo extra
    ];

    // Agregar los dispositivos al área
    devices.forEach(device => {
        let deviceElement = document.createElement("div");
        deviceElement.id = device.id;
        deviceElement.className = "device";
        deviceElement.setAttribute("draggable", "true");
        deviceElement.innerHTML = `<img src="${device.imgSrc}" alt="${device.name}"><p>${device.name}</p>`;
        deviceElement.addEventListener("dragstart", dragStart);
        devicesArea.appendChild(deviceElement);
    });

    // Agregar eventos a los cuadros de destino
    const boxes = document.querySelectorAll(".game-box");
    boxes.forEach(box => {
        box.addEventListener("dragover", allowDrop);
        box.addEventListener("drop", dropDevice);
    });

    // Verificar si el dispositivo se colocó correctamente cuando se presiona el botón
    document.getElementById("verifyButton").addEventListener("click", function() {
        let correctConnections = 0;

        // Revisamos si los dispositivos están en el cuadro correcto en el orden adecuado
        const box1 = document.getElementById("box1").querySelector(".device");
        const box2 = document.getElementById("box2").querySelector(".device");
        const box3 = document.getElementById("box3").querySelector(".device");

        if (box1 && box1.id === "modem") correctConnections++;
        if (box2 && box2.id === "switch") correctConnections++;
        if (box3 && box3.id === "computer") correctConnections++;

        if (correctConnections === 3) {
            status.textContent = "¡Todo está conectado correctamente!";
            status.style.color = "green";
            showDiagram();
        } else {
            status.textContent = "Algunos dispositivos están mal conectados. ¡Inténtalo de nuevo!";
            status.style.color = "red";
        }
    });

    // Mostrar el diagrama de conexión
    function showDiagram() {
        const diagram = document.getElementById("diagram");
        const connectionDiagram = document.getElementById("connectionDiagram");
        
        // Imagen del diagrama (aquí se puede modificar para generar un diagrama real)
        connectionDiagram.src = "../img/DIAGRAMA.png";
        
        diagram.style.display = "block"; // Mostrar el diagrama
    }

    // Función de arrastre
    function dragStart(event) {
        event.dataTransfer.setData("deviceId", event.target.id);
    }

    // Función para permitir el soltar
    function allowDrop(event) {
        event.preventDefault();
    }

    // Función de soltar el dispositivo en el área del cuadro
    function dropDevice(event) {
        event.preventDefault();
        let draggedDeviceId = event.dataTransfer.getData("deviceId");
        let draggedDevice = document.getElementById(draggedDeviceId);
        let targetBox = event.target.id;

        // Verificar si el dispositivo es el correcto para este cuadro
        if (devices.find(device => device.id === draggedDeviceId && device.correctBox === targetBox)) {
            draggedDevice.classList.add("connected");
            event.target.appendChild(draggedDevice); // Colocar dispositivo en el cuadro
        } else {
            status.textContent = "¡Intenta de nuevo!";
            status.style.color = "red";
        }
    }
}

// Botón para reiniciar el juego
document.getElementById("restartButton").addEventListener("click", function() {
    location.reload();
});
