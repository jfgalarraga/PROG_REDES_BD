// Lista de preguntas y respuestas sobre medios de conexión de redes
var preguntas = [
    { pregunta: "¿Cómo se llama el cable con pares de colores que conecta computadoras?", respuesta: "utp" },
    { pregunta: "¿Qué capa del modelo OSI juega con cables y señales?", respuesta: "fisica" },
    { pregunta: "¿Qué usamos para enviar internet por el aire?", respuesta: "wifi" },
    { pregunta: "¿Qué cable usan las redes para no hacer ruido?", respuesta: "coaxial" },
    { pregunta: "¿Qué medio de conexión usa luz para transmitir datos?", respuesta: "fibra" },
    { pregunta: "¿Qué tipo de red necesita cables para conectar todo?", respuesta: "guiada" },
    { pregunta: "¿Cómo se llama el cable que parece trenzado?", respuesta: "utp" },
    { pregunta: "¿Qué capa del modelo OSI conecta dispositivos físicamente?", respuesta: "fisica" },
    { pregunta: "¿Cómo se llama el cable más común para redes de casa?", respuesta: "ethernet" }
];


var intento = 0;
var endgame = false;
var acertados = 0;
var modoOscuro = false;
var preguntaActual = "";
var palabraActual = "";

function play(dir) {
    var audio = new Audio(dir);
    audio.play();
}

function teclado(btn, palabra) {
    if (window.endgame == false) {
        let encontrado = false;
        let letra = btn.textContent;
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i].toUpperCase() == letra) {
                let correcta = document.querySelector("#letra" + i);
                correcta.textContent = palabra[i].toUpperCase();
                encontrado = true;
                window.acertados += 1;
            }
        }
        if (encontrado) {
            btn.disabled = true;
            btn.classList.remove("tecla");
            btn.classList = "teclaUsadaCorrecta";
            play("audio/acertada.mp3");
        } else {
            btn.disabled = true;
            btn.classList.remove("tecla");
            btn.classList = "teclaUsadaIncorrecta";
            play("audio/error.mp3");
            drawGame();
        }

        if (window.acertados == palabra.length) {
            youWin();
        }
    }
    return;
}

function initGame() {
    // Seleccionar pregunta y palabra aleatoria
    let indice = Math.floor(Math.random() * preguntas.length);
    let seleccion = preguntas[indice];
    preguntaActual = seleccion.pregunta;
    palabraActual = seleccion.respuesta;

    // Mostrar pregunta
    document.querySelector("#pregunta").textContent = preguntaActual;

    drawGame();

    let correctas = document.querySelector(".correctas");
    for (let i = 0; i < palabraActual.length; i++) {
        const letra = document.createElement("div");
        letra.id = "letra" + i;
        letra.classList = "letraCorrecta";
        letra.textContent = "";
        correctas.append(letra);
    }

    let teclado_f1 = "qwertyuiop";
    let teclado_f2 = "asdfghjklñ";
    let teclado_f3 = "zxcvbnm";

    let f1 = document.querySelector(".fila1");
    for (let i = 0; i < teclado_f1.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f1[i].toUpperCase();
        tecla.id = teclado_f1[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabraActual); });
        f1.append(tecla);
    }

    let f2 = document.querySelector(".fila2");
    for (let i = 0; i < teclado_f2.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f2[i].toUpperCase();
        tecla.id = teclado_f2[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabraActual); });
        f2.append(tecla);
    }

    let f3 = document.querySelector(".fila3");
    for (let i = 0; i < teclado_f3.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f3[i].toUpperCase();
        tecla.id = teclado_f3[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabraActual); });
        f3.append(tecla);
    }
    return;
}

function removeChilds(nodo) {
    if (nodo.hasChildNodes) {
        while (nodo.childNodes.length >= 1) {
            nodo.removeChild(nodo.firstChild);
        }
    }
    return;
}

function newGame() {
    const estado = document.querySelector("#estado");
    estado.classList.add("state-nodisplay"); // Oculta el mensaje
    estado.classList.remove("stateAnimation", "youWin", "gameOver"); // Limpia las clases
    estado.textContent = ""; // Limpia el texto

    // Reinicia variables y el estado del juego
    let pantalla = document.querySelector("canvas");
    let pincel = pantalla.getContext("2d");
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);

    window.intento = 0;
    window.endgame = false;
    window.acertados = 0;

    // Reinicia el teclado y las letras
    let f1 = document.querySelector(".fila1");
    removeChilds(f1);
    let f2 = document.querySelector(".fila2");
    removeChilds(f2);
    let f3 = document.querySelector(".fila3");
    removeChilds(f3);
    let correctas = document.querySelector(".correctas");
    removeChilds(correctas);

    initGame(); // Inicia un nuevo juego
}

function drawGame() {
    let pantalla = document.querySelector("canvas");
    let pincel = pantalla.getContext("2d");

    pincel.beginPath();
    if (window.intento == 0) {
        // BASE
        pincel.moveTo(355, 350);
        pincel.lineTo(0, 350);
    }
    if (window.intento == 1) {
        // COL
        pincel.moveTo(105, 0);
        pincel.lineTo(105, 350);
    }
    if (window.intento == 2) {
        // VIGA
        pincel.moveTo(155, 0);
        pincel.lineTo(105, 50);
    }
    if (window.intento == 3) {
        // CUERDA
        pincel.moveTo(255, 80);
        pincel.lineTo(255, 0);
    }
    if (window.intento == 4) {
        // CABEZA
        pincel.moveTo(255, 50);
        pincel.arc(255, 110, 30, -Math.PI / 2, Math.PI * 3 / 2, true);
    }
    if (window.intento == 5) {
        // TORSO
        pincel.moveTo(255, 225);
        pincel.lineTo(255, 140);
    }
    if (window.intento == 6) {
        // BRAZO IZQUIERDO
        pincel.moveTo(275, 200);
        pincel.lineTo(255, 150);
    }
    if (window.intento == 7) {
        // BRAZO DERECHO
        pincel.moveTo(235, 200);
        pincel.lineTo(255, 150);
    }
    if (window.intento == 8) {
        // PIERNA IZQUIERDA
        pincel.moveTo(275, 270);
        pincel.lineTo(255, 225);
    }
    if (window.intento == 9) {
        // PIERNA DERECHA
        pincel.moveTo(235, 270);
        pincel.lineTo(255, 225);
        gameOver();
    }

    pincel.lineWidth = 6;
    pincel.strokeStyle = "#000000"; // Cambiar el color a negro
    pincel.stroke();
    window.intento += 1;
    return;
}


function gameOver() {
    const estado = document.querySelector("#estado"); // Selecciona el contenedor del mensaje
    estado.classList.remove("state-nodisplay");
    estado.classList.add("stateAnimation", "gameOver");
    estado.textContent = "Juego Terminado. Intenta nuevamente.";
    window.endgame = true; // Marca el juego como finalizado
    play("audio/lose.mp3");
}


function youWin() {
    const estado = document.querySelector("#estado"); // Selecciona el contenedor del mensaje
    estado.classList.remove("state-nodisplay");
    estado.classList.add("stateAnimation", "youWin");
    estado.textContent = "¡Felicidades, has ganado!";
    window.endgame = true; // Marca el juego como finalizado
    play("audio/win.mp3");
}


document.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function () {
        const menu = document.querySelector('#menu');
        const juego = document.querySelector('#juego');

        // Cambiar clases para mostrar el juego y ocultar el menú
        menu.classList.add("no-display");
        juego.classList.remove("no-display");

        // Iniciar el juego
        newGame();
    });
});
const newgame = document.querySelector('#new');
newgame.addEventListener('click', function () {
    newGame(); // Inicia un nuevo juego
});

// Botón Desistir
const des = document.querySelector('#des');
des.addEventListener('click', function () {
    const menu = document.querySelector('#menu');
    const juego = document.querySelector('#juego');
    menu.classList.remove("no-display");
    juego.classList.add("no-display");
});
