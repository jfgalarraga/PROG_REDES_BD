// script.js

const conceptos = [
    { nombre: 'Nombre', tipo: 'Texto' },
    { nombre: 'Fecha de nacimiento', tipo: 'Fecha/Hora' },
    { nombre: 'Precio', tipo: 'Número' },
    { nombre: 'Foto', tipo: 'Objeto OLE' }
];

const opciones = [
    'Texto', 'Número', 'Fecha/Hora', 'Objeto OLE',
    'Autonumérico', 'Sí/No', 'Memo', 'Hipervínculo'
];

let droppedConceptos = {};
let correctAnswers = 0;
let timer;
let timeLeft = 60;

function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    droppedConceptos = {};
    correctAnswers = 0;
    timeLeft = 60;
    document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
    
    loadConceptos();
    loadOpciones();
    startTimer();
}

function loadConceptos() {
    const container = document.getElementById('conceptos-container');
    container.innerHTML = '';

    conceptos.forEach(concepto => {
        const div = document.createElement('div');
        div.classList.add('category');
        div.id = `concepto-${concepto.nombre}`;
        div.innerHTML = `<h5>${concepto.nombre}</h5>`;
        div.ondragover = allowDrop;
        div.ondrop = (event) => drop(event, concepto.nombre);
        container.appendChild(div);
    });
}

function loadOpciones() {
    const container = document.getElementById('opciones-container');
    container.innerHTML = '';

    const shuffledOpciones = opciones.sort(() => Math.random() - 0.5);

    shuffledOpciones.forEach(opcion => {
        const div = document.createElement('div');
        div.classList.add('draggable');
        div.setAttribute('draggable', 'true');
        div.id = `opcion-${opcion}`;
        div.innerText = opcion;
        div.ondragstart = drag;
        container.appendChild(div);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event, conceptoNombre) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);

    if (droppedConceptos[conceptoNombre]) {
        alert('Ya colocaste una opción en esta categoría.');
        return;
    }

    event.target.appendChild(draggedElement);
    droppedConceptos[conceptoNombre] = draggedElement.innerText;

    if (Object.keys(droppedConceptos).length === conceptos.length) {
        document.getElementById('validate-btn').disabled = false;
    }
}

function validateAnswers() {
    correctAnswers = 0;

    conceptos.forEach(concepto => {
        const categoria = document.getElementById(`concepto-${concepto.nombre}`);
        const respuesta = droppedConceptos[concepto.nombre];

        if (respuesta === concepto.tipo) {
            categoria.classList.add('correct');
            correctAnswers++;
        } else {
            categoria.classList.add('incorrect');
        }
    });

    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    resultContainer.style.display = 'block';
    resultContainer.classList.add('animate__animated', 'animate__fadeIn');

    if (correctAnswers >= 3) {
        resultMessage.innerHTML = `
            <div class="alert alert-success text-center">
                <h4 class="mb-3">¡Felicidades! 🎉</h4>
                <p>Has obtenido una nota de: <strong>${correctAnswers}/${conceptos.length}</strong></p>
                <button id="next-challenge-btn" class="btn btn-primary mt-3">Siguiente reto</button>
            </div>
        `;
        document.getElementById('next-challenge-btn').addEventListener('click', () => {
            window.location.href = 'RETO_2.html';

        });
    } else {
        resultMessage.innerHTML = `
            <div class="alert alert-danger text-center">
                <h4 class="mb-3">¡Juego terminado! 🙁</h4>
                <p>Tu nota es: <strong>${correctAnswers}/${conceptos.length}</strong></p>
                <p><strong>¡Intenta nuevamente para mejorar tu puntuación!</strong></p>
                <button id="restart-btn" class="btn btn-warning mt-3">Reiniciar</button>
            </div>
        `;

        document.getElementById('restart-btn').addEventListener('click', restartGame);
    }

    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            validateAnswers();
        }
    }, 1000);
}

function restartGame() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
    document.getElementById('validate-btn').disabled = true;

    droppedConceptos = {};
    correctAnswers = 0;
    timeLeft = 60;
    document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('validate-btn').addEventListener('click', validateAnswers);
