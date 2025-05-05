// Preguntas y respuestas
const questions = [
    {
      question: "¿Qué significan las siglas LAN?",
      options: {
        a: "Large Area Network",
        b: "Local Area Network",
        c: "Low Access Network",
        d: "Long Area Network"
      },
      correctAnswer: "b",
      explanation: "LAN significa 'Local Area Network' (Red de Área Local), que es una red que conecta dispositivos dentro de un área limitada."
    },
    {
      question: "¿Cuál es el propósito principal de una red LAN?",
      options: {
        a: "Conectar dispositivos a nivel mundial",
        b: "Transmitir señales de radio de larga distancia",
        c: "Conectar dispositivos en un área limitada",
        d: "Proporcionar acceso directo a redes satelitales"
      },
      correctAnswer: "c",
      explanation: "El propósito principal de una red LAN es conectar dispositivos en un área geográfica limitada, como una oficina o edificio."
    },
    {
      question: "¿En qué tipo de entornos se utiliza comúnmente una red LAN?",
      options: {
        a: "En redes submarinas",
        b: "En un conjunto de satélites",
        c: "En habitaciones, edificios o conjuntos de edificios",
        d: "En áreas rurales sin infraestructura"
      },
      correctAnswer: "c",
      explanation: "Una LAN se utiliza comúnmente en habitaciones, edificios o conjuntos de edificios para interconectar dispositivos como computadoras y servidores."
    },
    {
      question: "¿Cómo se le llama al dispositivo que está conectado en la red LAN?",
      options: {
        a: "Router",
        b: "Servidor",
        c: "Nodo",
        d: "Conmutador"
      },
      correctAnswer: "c",
      explanation: "Un dispositivo conectado en una red LAN se llama 'Nodo', que puede ser cualquier dispositivo capaz de recibir o enviar datos en la red."
    },
    {
      question: "¿Qué tipo de interconexión se utiliza en una red LAN?",
      options: {
        a: "Solo por cables de cobre",
        b: "Solo por ondas de radio",
        c: "Por cables o mediante ondas inalámbricas",
        d: "Exclusivamente por fibra óptica"
      },
      correctAnswer: "c",
      explanation: "Una red LAN puede utilizar tanto cables como ondas inalámbricas para interconectar dispositivos. No se limita a un solo tipo de conexión."
    },
    {
      question: "¿Qué dispositivos pueden interconectarse en una red de área local (LAN)?",
      options: {
        a: "Solo teléfonos móviles",
        b: "Solo computadoras portátiles",
        c: "Varios dispositivos como computadoras, impresoras y servidores",
        d: "Solo televisores inteligentes"
      },
      correctAnswer: "c",
      explanation: "En una LAN, se pueden interconectar varios dispositivos, como computadoras, impresoras, servidores y más, permitiendo compartir recursos."
    }
  ];
  
  let currentQuestionIndex = 0;
  
  // Función para cargar la pregunta
  function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const questionContainer = document.getElementById('questionContainer');
      questionContainer.innerHTML = `
        <h3>${currentQuestionIndex + 1}. ${question.question}</h3>
        <label>
          <input type="radio" name="answer" value="a"> A) ${question.options.a}
        </label>
        <label>
          <input type="radio" name="answer" value="b"> B) ${question.options.b}
        </label>
        <label>
          <input type="radio" name="answer" value="c"> C) ${question.options.c}
        </label>
        <label>
          <input type="radio" name="answer" value="d"> D) ${question.options.d}
        </label>
        <div class="feedback" id="feedback"></div>
      `;
    } else {
      // Cuando termine el cuestionario, muestra un mensaje de agradecimiento
      const questionContainer = document.getElementById('questionContainer');
      questionContainer.innerHTML = "<h3>¡Felicidades, has completado el cuestionario!</h3>";
      document.querySelector("button[type='submit']").style.display = 'none'; // Esconde el botón de enviar
    }
  }
  
  // Iniciar cuestionario cuando se hace clic en el botón "Aprendamos Jugando"
  document.getElementById("startQuizBtn").addEventListener("click", function() {
    document.getElementById("startQuizBtn").style.display = "none";
    document.getElementById("quizFormContainer").style.display = "block";
    loadQuestion();
  });
  
  // Manejar la validación y retroalimentación
  document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const feedbackElement = document.getElementById("feedback");
  
    if (selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedAnswer.value === currentQuestion.correctAnswer) {
        feedbackElement.innerHTML = `<p class="feedback-correct">¡Correcto! Sabes lo que significa LAN.</p>`;
        
        // Si la respuesta es correcta, pasar a la siguiente pregunta inmediatamente
        setTimeout(function() {
          currentQuestionIndex++;
          loadQuestion();
        }, 1000); // Espera 1 segundo antes de cargar la siguiente pregunta
      } else {
        feedbackElement.innerHTML = `<p class="feedback-incorrect">¡Incorrecto! No te preocupes, aquí está la explicación: ${currentQuestion.explanation}</p>`;
        
        // Si la respuesta es incorrecta, espera 5 segundos antes de pasar a la siguiente pregunta
        setTimeout(function() {
          currentQuestionIndex++;
          loadQuestion();
        }, 8000); // Espera 5 segundos para leer la explicación
      }
    } else {
      feedbackElement.innerHTML = `<p class="feedback-incorrect">Por favor selecciona una respuesta.</p>`;
    }
  });
  
// video de youtube clases de  direccion
document.getElementById('showVideoC').addEventListener('click', function() {
    document.getElementById('videoC').classList.remove('d-none');
  });



//topologias
document.addEventListener('DOMContentLoaded', function () {
  const toggles = document.querySelectorAll('.toggle-text');  // Seleccionamos las palabras que activarán el colapso

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      // Buscar el siguiente contenedor .collapse dentro de este li
      const collapseElement = this.closest('li').querySelector('.collapse');
      
      // Verificar si el contenido está colapsado o expandido
      const isCollapsed = !collapseElement.classList.contains('show');

      // Cambiar el estado de expansión del contenido
      if (isCollapsed) {
        collapseElement.classList.add('show');  // Expandir el contenido
      } else {
        collapseElement.classList.remove('show');  // Colapsar el contenido
      }
    });
  });
});

