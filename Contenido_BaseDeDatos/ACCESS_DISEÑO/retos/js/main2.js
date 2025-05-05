// Función para iniciar el juego cuando se hace clic en "Iniciar Juego"
document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('start-container').style.display = 'none'; // Ocultar la pantalla de inicio
    document.getElementById('game-container').style.display = 'block'; // Mostrar el contenedor del juego
    startTimer(); // Llamar a la función de temporizador para iniciar la cuenta regresiva
});

// Habilitar el botón de validación si todas las respuestas son seleccionadas
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
        const allSelected = Array.from(document.querySelectorAll('select')).every(select => select.value !== "");
        document.getElementById('validate-btn').disabled = !allSelected;
        // Animación en la respuesta seleccionada
        select.classList.add('animated-option');
    });
});

// Función para validar las respuestas
document.getElementById('validate-btn').addEventListener('click', function() {
    let score = 0;

    // Respuestas correctas definidas
    const answers = [
        { id: 'relation1', correct: 'correcta' },
        { id: 'relation2', correct: 'correcta' },
        { id: 'relation3', correct: 'correcta' },
        { id: 'relation4', correct: 'correcta' }
    ];

    // Comprobar respuestas
    answers.forEach(answer => {
        const selected = document.getElementById(answer.id).value;
        const selectedOption = document.getElementById(answer.id).options[document.getElementById(answer.id).selectedIndex];

        if (selected === answer.correct) {
            selectedOption.classList.add('correcta');
            score++;
        } else {
            selectedOption.classList.add('incorrecta');
        }
    });

    // Mostrar el mensaje de resultado
    const resultMessage = document.getElementById('result-message');
    const resultContainer = document.getElementById('result-container');
    const resultActions = document.querySelector('.result-actions');

    resultMessage.innerHTML = `Tu puntaje es: ${score}/4`;

    // Mostrar explicaciones según el puntaje
    if (score === 4) {
        resultMessage.innerHTML += "<br>¡Excelente! Has respondido correctamente a todas las preguntas.";
    } else {
        resultMessage.innerHTML += "<br>Algunas respuestas son incorrectas. Reintenta.";
    }

    // Mostrar los resultados
    resultContainer.style.display = 'block';

    // Mostrar botones correspondientes
    if (score >= 3) {
        resultActions.style.display = 'block'; // Mostrar 'Siguiente Reto'
        document.querySelector('.btn-success').textContent = 'Siguiente Reto';
        document.querySelector('.btn-success').onclick = function() {
            nextChallenge();  // Llamar a la función para el siguiente reto
        };
    } else {
        resultActions.style.display = 'block'; // Mostrar 'Reiniciar Juego'
        document.querySelector('.btn-primary').onclick = function() {
            restartGame(); // Llamar a la función para reiniciar el juego
        };
    }
});

// Función para reiniciar el juego
function restartGame() {
    // Resetear las respuestas seleccionadas
    document.querySelectorAll('select').forEach(select => {
        select.value = "";
    });

    // Ocultar el contenedor de resultados y deshabilitar el botón de validación
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('validate-btn').disabled = true;
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block'; // Mostrar la pantalla de inicio
}

// Función para avanzar al siguiente reto
function nextChallenge() {
    // Redirigir a otra página HTML (modifica la URL según tu necesidad)
    window.location.href = "RETO_3.html";  // Cambia la URL a la que deseas redirigir
}

// Cronómetro
let timerInterval;

function startTimer() {
    let timeLeft = 180; // Tiempo inicial de 180 segundos (3 minutos)
    const timerElement = document.getElementById('timer');
    
    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("El tiempo se ha agotado. ¡Game Over!");
            // Opcional: al finalizar el tiempo, se puede detener el juego automáticamente
            document.getElementById('validate-btn').disabled = true; // Deshabilitar el botón de validación al acabar el tiempo
        }
    }, 1000);
}
