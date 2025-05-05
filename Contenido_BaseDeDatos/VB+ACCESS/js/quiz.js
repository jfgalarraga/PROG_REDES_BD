const questions = document.querySelectorAll('.question');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const finalizeButton = document.getElementById('finalizeButton');
const resetButton = document.getElementById('resetButton');
const form = document.getElementById('testForm');
const congratulationsMessage = document.getElementById('congratulations');
const tryAgainMessage = document.getElementById('tryAgain');
const solutionContainer = document.getElementById('solutionContainer'); // Contenedor de la solución
let currentQuestion = 0;

function updateQuestionVisibility() {
  questions.forEach((question, index) => {
    question.classList.toggle('active', index === currentQuestion);
  });

  prevButton.disabled = currentQuestion === 0;
  nextButton.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
  finalizeButton.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';

  validateAnswers();
}

function validateAnswers() {
  const allAnswered = Array.from(questions).every((question, index) => {
    const inputs = question.querySelectorAll("input[type='radio']");
    return Array.from(inputs).some(input => input.checked);
  });

  finalizeButton.disabled = !allAnswered;
}

prevButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateQuestionVisibility();
  }
});

nextButton.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateQuestionVisibility();
  }
});

finalizeButton.addEventListener('click', () => {
  const answers = new FormData(form);
  let correctAnswers = 0;

  for (let value of answers.values()) {
    if (value === 'correcto') correctAnswers++;
  }

  const totalQuestions = questions.length;
  const percentage = (correctAnswers / totalQuestions) * 100;

  // Mostrar mensaje de éxito o fallo según el porcentaje de respuestas correctas
  if (percentage >= 80) {
    congratulationsMessage.style.display = 'block';
    tryAgainMessage.style.display = 'none';
  } else {
    tryAgainMessage.style.display = 'block';
    congratulationsMessage.style.display = 'none';
  }

  alert(`¡Test finalizado! Tu calificación es: ${correctAnswers}/${totalQuestions}`);

  // Mostrar el solucionario cuando el test haya sido completado
  solutionContainer.style.display = 'block';
});

resetButton.addEventListener('click', () => {
  // Reiniciar el formulario y las preguntas
  form.reset();
  currentQuestion = 0;
  updateQuestionVisibility();

  // Ocultar los mensajes de felicitaciones o intento fallido
  congratulationsMessage.style.display = 'none';
  tryAgainMessage.style.display = 'none';

  // Ocultar el solucionario al reiniciar
  solutionContainer.style.display = 'none';
});

updateQuestionVisibility();

document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', validateAnswers);
});
