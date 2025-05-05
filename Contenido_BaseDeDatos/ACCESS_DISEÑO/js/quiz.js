// Definir las preguntas y las opciones de respuesta
const questions = [
  {
    question: "¿Qué es una base de datos en Microsoft Access?",
    options: ["Un conjunto de tablas", "Una hoja de cálculo", "Un documento de texto", "Un gráfico"],
    correctAnswer: 0
  },
  {
    question: "¿Cuál es el formato de archivo predeterminado de Access?",
    options: [".xlsx", ".mdb", ".docx", ".pptx"],
    correctAnswer: 1
  },
  {
    question: "¿Qué es una tabla en Access?",
    options: ["Un objeto para almacenar datos", "Un gráfico de barras", "Un reporte visual", "Un formulario de entrada"],
    correctAnswer: 0
  },
  {
    question: "¿Qué es una clave primaria?",
    options: ["Un campo único para identificar registros", "Un tipo de consulta", "Una relación entre tablas", "Un reporte"],
    correctAnswer: 0
  },
  {
    question: "¿Qué es una consulta en Access?",
    options: ["Una forma de analizar datos", "Un tipo de tabla", "Un formulario de ingreso", "Un campo de texto"],
    correctAnswer: 0
  },
  {
    question: "¿Cuál es la función de un formulario en Access?",
    options: ["Introducir datos en una tabla", "Mostrar los resultados de una consulta", "Guardar archivos en la base de datos", "Ninguna de las anteriores"],
    correctAnswer: 0
  },
  {
    question: "¿Qué tipo de datos puede tener una tabla?",
    options: ["Texto", "Número", "Fecha y hora", "Todos los anteriores"],
    correctAnswer: 3
  },
  {
    question: "¿Cuál de los siguientes no es un tipo de dato en Access?",
    options: ["Texto", "Número", "Fecha", "Archivo adjunto"],
    correctAnswer: 3
  },
  {
    question: "¿Qué es una base de datos relacional?",
    options: ["Es una base de datos que almacena datos en tablas relacionadas", "Una base de datos de solo lectura", "Una base de datos que no permite relaciones", "Ninguna de las anteriores"],
    correctAnswer: 0
  },
  {
    question: "¿Cuál es la principal diferencia entre una tabla y una consulta?",
    options: ["La tabla almacena datos, la consulta los busca", "La consulta almacena datos, la tabla los busca", "Ambas hacen lo mismo", "Ninguna de las anteriores"],
    correctAnswer: 0
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswers = 0;
let timer;
let timeLeft = 6 * 60; // 6 minutos en segundos

const startExamBtn = document.getElementById('startExamBtn');
const examContainer = document.getElementById('exam-container');
const contextContainer = document.getElementById('context-container');
const timerDisplay = document.getElementById('timer');
const questionsContainer = document.getElementById('questions');
const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');
const certificateBtn = document.getElementById('certificateBtn');
const seeCorrectAnswersBtn = document.getElementById('seeCorrectAnswersBtn'); // Nuevo botón

// Iniciar examen
startExamBtn.addEventListener('click', startExam);

function startExam() {
  contextContainer.style.display = 'none';
  examContainer.style.display = 'block';
  loadQuestion();
  startTimer();
}

// Cargar preguntas
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const options = question.options.map((option, index) => {
    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
    return `
      <label>
        <input type="radio" name="question${currentQuestionIndex}" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
        ${optionLetter}. ${option}
      </label>
    `;
  }).join('');

  questionsContainer.innerHTML = `
    <div class="question">
      <h4>${question.question}</h4>
      <div class="options">
        ${options}
      </div>
    </div>
  `;
}

// Iniciar cronómetro
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishExam();
    } else {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

// Navegar entre preguntas
nextBtn.addEventListener('click', function () {
  const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    finishExam();
  }
  previousBtn.style.display = 'block';
});

previousBtn.addEventListener('click', function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

function finishExam() {
  clearInterval(timer);
  examContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  calculateResult();
}

// Calcular los resultados
function calculateResult() {
  correctAnswers = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correctAnswers++;
    }
  });

  resultMessage.innerHTML = `Obtuviste ${correctAnswers} de ${questions.length} respuestas correctas.`;

  if (correctAnswers >= 7) {
    certificateBtn.disabled = false;
  }

  retryBtn.addEventListener('click', function () {
    location.reload();
  });

  homeBtn.addEventListener('click', function () {
    window.location.href = "indexContenido.html"; // Cambia esto a la página de inicio
  });

  certificateBtn.addEventListener('click', function () {
    window.location.href = "certificado.html"; // Cambia esto a la página de certificado
  });

  // Asegúrate de que el botón "Ver respuestas correctas" aparezca aquí
  seeCorrectAnswersBtn.style.display = 'block';
}

// Mostrar respuestas correctas (con la opción correcta marcada)
seeCorrectAnswersBtn.addEventListener('click', function () {
  let resultHTML = '';
  
  questions.forEach((question, index) => {
    const correctOptionLetter = String.fromCharCode(65 + question.correctAnswer); // A, B, C, D
    const selectedOptionLetter = String.fromCharCode(65 + (userAnswers[index] !== undefined ? userAnswers[index] : -1)); // A, B, C, D
    const selectedOption = userAnswers[index] !== undefined ? question.options[userAnswers[index]] : '';
    
    resultHTML += `
      <div class="question">
        <h4>${question.question}</h4>
        <div class="options">
          <p><strong>Respuesta correcta:</strong> ${correctOptionLetter}. ${question.options[question.correctAnswer]}</p>
          <p><strong>Tu respuesta:</strong> ${selectedOptionLetter}. ${selectedOption}</p>
        </div>
      </div>
    `;
  });

  resultMessage.innerHTML += `<hr><h4>Respuestas Correctas:</h4>${resultHTML}`;
});
