let correctAnswers = 0;

// Función para manejar las respuestas de cualquier pregunta
function checkAnswer(element) {
  console.log('Función llamada');
  
  // Encuentra el contenedor de la pregunta actual
  const questionContainer = element.closest('.question');
  
  // Encuentra el formulario correspondiente y su contenedor de retroalimentación
  const formContainer = questionContainer.closest('.kahoot-content');
  const feedback = formContainer.querySelector('.feedback');
  
  // Opciones de la pregunta actual
  const options = questionContainer.querySelectorAll('input[type="radio"]');
  
  // Limpia el mensaje anterior
  feedback.innerHTML = '';
  
  // Desactiva todas las opciones para evitar cambios
  options.forEach(option => {
    option.disabled = true;
  });
  
  // Verifica si la respuesta es correcta o incorrecta
  if (element.value === 'correct') {
    correctAnswers++;
    // Actualiza el contador de respuestas correctas
    document.getElementById('correct-answers').textContent = correctAnswers;
    feedback.innerHTML = "<p class='correct'>¡Respuesta correcta!</p>";
  } else {
    feedback.innerHTML = "<p class='incorrect'>Respuesta incorrecta. Intenta de nuevo.</p>";
  }
  
  // Mostrar feedback temporalmente y luego limpiarlo
  setTimeout(() => {
    feedback.innerHTML = '';
  }, 2000);
}

const images = document.querySelectorAll(".step-image");
const dropzones = document.querySelectorAll(".dropzone");
const checkButton = document.getElementById("checkOrder");
const retryButton = document.getElementById("retryOrder");

// Store initial positions of images
const initialPositions = Array.from(images).map(image => image.parentNode);

images.forEach(image => {
  image.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.dataset.order);
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    const order = e.dataTransfer.getData("text/plain");
    const draggedImage = document.querySelector(`img[data-order='${order}']`);

    // Si la imagen ya está en una zona, no hacer nada
    if (draggedImage.parentNode === dropzone) return;

    // Si la dropzone ya tiene una imagen, no permitir soltar otra imagen
    if (dropzone.firstChild) return;

    // Append the dragged image to the dropzone
    dropzone.appendChild(draggedImage);

    // Deshabilitar el "draggable" para evitar mover la imagen después de ser colocada
    draggedImage.setAttribute('draggable', 'false');
  });
});

checkButton.addEventListener("click", () => {
  dropzones.forEach(dropzone => {
    const placedImage = dropzone.querySelector("img");
    if (placedImage) {
      const correctOrder = dropzone.dataset.correctOrder;
      const placedOrder = placedImage.dataset.order;

      if (correctOrder === placedOrder) {
        dropzone.classList.add("correct");
        dropzone.classList.remove("incorrect");
      } else {
        dropzone.classList.add("incorrect");
        dropzone.classList.remove("correct");
      }
    } else {
      dropzone.classList.add("incorrect");
      dropzone.classList.remove("correct");
    }
  });

  // Check if all dropzones are correct
  const allCorrect = Array.from(dropzones).every(dropzone => dropzone.classList.contains("correct"));
  const messageElement = document.getElementById("resultMessage");

  if (allCorrect) {
    messageElement.textContent = "¡Correcto!";
    messageElement.style.color = "green";
  } else {
    messageElement.textContent = "";
  }

  retryButton.style.display = 'block';
});

retryButton.addEventListener("click", () => {
  dropzones.forEach(dropzone => {
    dropzone.innerHTML = "";
    dropzone.classList.remove("correct", "incorrect");
  });

  images.forEach((image, index) => {
    image.setAttribute('draggable', 'true');
    initialPositions[index].appendChild(image);
  });

  document.getElementById("resultMessage").textContent = "";
  retryButton.style.display = 'none';
});