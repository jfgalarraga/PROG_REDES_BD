// Función que maneja la interactividad de las pestañas
document.querySelectorAll('.tab-link').forEach(tab => {
  tab.addEventListener('click', function () {
    const tabId = this.getAttribute('data-tab');

    // Eliminar la clase "active" de todas las pestañas
    document.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Agregar la clase "active" a la pestaña seleccionada
    this.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

/*forms*/
function toggleTooltip(element) {
  const tooltip = element.querySelector('.tooltip');
  // Alterna la visibilidad del tooltip completo
  if (tooltip.style.display === 'block') {
    tooltip.style.display = 'none';
  } else {
    tooltip.style.display = 'block';
  }
}

/*Ventajas y desventajas de crud*/
function toggleAccordion(element) {
  const content = element.nextElementSibling;

  // Toggle the display of the accordion content
  if (content.classList.contains('active')) {
    content.classList.remove('active');
  } else {
    // Close any other open accordion content
    const allContents = document.querySelectorAll('.accordion-content');
    allContents.forEach(item => item.classList.remove('active'));

    content.classList.add('active');
  }
}

/*Simulacion formulario */
// Función para mostrar/ocultar contenido y guardar estado
function toggleContent(id) {
  const content = document.getElementById(id);
  const isVisible = content.style.display === "block";

  // Cambiar visibilidad
  content.style.display = isVisible ? "none" : "block";

  // Guardar estado en localStorage
  localStorage.setItem(id, !isVisible);
}

// Restaurar estado al cargar la página
window.onload = () => {
  const sections = ["simple", "avanzado"];
  sections.forEach(id => {
    const content = document.getElementById(id);
    const isVisible = localStorage.getItem(id) === "true";
    content.style.display = isVisible ? "block" : "none";
  });
};


/*Botones atras y adelante de la simulacion*/

 // Selección de todos los contenedores de contenido
 const contents = document.querySelectorAll(".info div");
 const prevBtn = document.getElementById("prevBtn");
 const nextBtn = document.getElementById("nextBtn");

 // Índice actual del contenido visible
 let currentIndex = 0;

 // Función para actualizar la visibilidad de los contenidos
 function updateContent() {
   // Ocultar todos los contenidos
   contents.forEach((content, index) => {
     content.classList.toggle("active", index === currentIndex);
   });

   // Actualizar estado de los botones
   prevBtn.disabled = currentIndex === 0;
   nextBtn.disabled = currentIndex === contents.length - 1;
 }

 // Eventos de los botones
 prevBtn.addEventListener("click", () => {
   if (currentIndex > 0) {
     currentIndex--;
     updateContent();
   }
 });

 nextBtn.addEventListener("click", () => {
   if (currentIndex < contents.length - 1) {
     currentIndex++;
     updateContent();
   }
 });

 // Inicializar la página
 updateContent();


 /*COPIAR CODIGO DE CUADRO DE CODIGO*/
 function copyCode() {
  const codeElement = document.getElementById('code');
  const codeText = codeElement.innerText;

  // Crea un elemento temporal para copiar el texto
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = codeText;
  document.body.appendChild(tempTextArea);

  // Selecciona y copia el texto
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  // Mostrar mensaje de éxito
  const copySuccess = document.getElementById('copySuccess');
  copySuccess.style.display = 'block';
  setTimeout(() => {
    copySuccess.style.display = 'none';
  }, 2000);
}
function mostrarVideo() {
  const popup = document.getElementById("videoPopup");
  popup.style.display = "flex";
  setTimeout(() => {
      popup.classList.add("active");
  }, 50);
}

function cerrarVideo() {
  const popup = document.getElementById("videoPopup");
  popup.classList.remove("active");
  setTimeout(() => {
      popup.style.display = "none";
  }, 500);
}