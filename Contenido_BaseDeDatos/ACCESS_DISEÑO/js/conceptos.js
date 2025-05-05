// Función para mostrar u ocultar videos dentro de un modal
function mostrarVideo(videoId) {
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoElement = document.getElementById('videoModalSource');
    
    // Establecer el src del video según el botón que se presiona
    if (videoId === 'videoTablas') {
        videoElement.src = 'videos/TABLA.mp4';
    } else if (videoId === 'videoCampos') {
        videoElement.src = 'videos/Tipos.mp4';
    } else if (videoId === 'videoRelaciones') {
        videoElement.src = 'videos/Relacion.mp4';
    } else if (videoId === 'unoauno') {
        videoElement.src = 'videos/UNO.mp4';
    } else if (videoId === 'varios') {
        videoElement.src = 'videos/VARIOS.mp4';
    } else if (videoId === 'videoFormularios') {
        videoElement.src = 'videos/Formulario_Access.mp4';
    } else if (videoId === 'videoConsultas') {
        videoElement.src = 'videos/Consulta_Access.mp4';
    } else if (videoId === 'videoIndices') {
        videoElement.src = 'videos/llave_primaria.mp4';
    }
    else if (videoId === 'seleccion') {
        videoElement.src = 'videos/SELECCION.mp4';
    }
    else if (videoId === 'accion') {
        videoElement.src = 'videos/acción.mp4';
    }
    else if (videoId === 'parametro') {
        videoElement.src = 'videos/PARAMETROS.mp4';
    }
    // Mostrar el modal con el video
    videoModal.show();
}

// Cerrar el modal y detener el video cuando se cierra el modal
document.getElementById('closeModal').addEventListener('click', function() {
    const videoElement = document.getElementById('videoModalSource');
    videoElement.pause();
    videoElement.currentTime = 0;
});
//ACORDION
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
      let collapse = this.closest('.accordion-item').querySelector('.accordion-collapse');
      if (collapse.classList.contains('show')) {
        setTimeout(() => collapse.classList.remove('show'), 500);
      } else {
        setTimeout(() => collapse.classList.add('show'), 500);
      }
    });
  });

// Función para verificar las respuestas y mostrar los resultados
function checkAnswers() {
    let score = 0;
    let totalQuestions = 6;
    let answers = {
      q1: 'b',
      q2: 'b',
      q3: 'a',
      q4: 'a',
      q5: 'a',
      q6: 'b'
    };

    // Check answers
    for (let i = 1; i <= totalQuestions; i++) {
      let question = document.querySelector(`input[name="q${i}"]:checked`);
      if (question && question.value === answers[`q${i}`]) {
        score++;
      }
    }

    // Display result
    document.getElementById('result').innerHTML = `Tu puntuación es: ${score} de ${totalQuestions}`;
    document.getElementById('result').style.display = 'block';

    // Enable the "Ver Soluciones" button
    document.getElementById('showSolutionBtn').style.display = 'block';
  }

  function showSolution() {
    let solutionText = `
      <h3>Soluciones Correctas:</h3>
      <ul>
        <li><strong>1. ¿Qué es una tabla en Microsoft Access?</strong> Respuesta Correcta: B) Una colección de datos organizados en filas y columnas</li>
        <li><strong>2. ¿Qué tipo de campo es utilizado para almacenar texto?</strong> Respuesta Correcta: B) Campo de Texto</li>
        <li><strong>3. ¿Qué es una clave primaria?</strong> Respuesta Correcta: A) Un campo único que identifica un registro</li>
        <li><strong>4. ¿Cómo se llama el enlace entre dos tablas?</strong> Respuesta Correcta: A) Relación</li>
        <li><strong>5. ¿Qué es una consulta?</strong> Respuesta Correcta: A) Una operación para obtener datos de una o más tablas</li>
        <li><strong>6. ¿Qué es un formulario en Access?</strong> Respuesta Correcta: B) Una interfaz para ingresar y modificar datos</li>
      </ul>
    `;
    document.getElementById('solution').innerHTML = solutionText;
    document.getElementById('solution').style.display = 'block';
  }
    // Cambio entre los ejercicios
        // Variables globales
        let tabla = {};
        let tablasGuardadas = [];

        // Función para agregar un campo
        function agregarCampo() {
            const tablaNombre = document.getElementById('tablaNombre').value;
            const campoNombre = document.getElementById('campoNombre').value;
            const tipoCampo = document.getElementById('tipoCampo').value;

            if (tablaNombre && campoNombre && tipoCampo) {
                // Si es la primera vez que se crea una tabla
                if (!tabla.nombre) {
                    tabla.nombre = tablaNombre;
                    tablasGuardadas.push(tabla);
                }

                // Crear el campo y añadirlo a la tabla
                const campo = {
                    nombre: campoNombre,
                    tipo: tipoCampo
                };

                tabla.campos = tabla.campos || [];
                tabla.campos.push(campo);

                // Mostrar la tabla generada
                mostrarTabla();

                // Limpiar campos para siguiente entrada
                document.getElementById('campoNombre').value = '';
                document.getElementById('tipoCampo').value = 'Texto';
            } else {
                alert('Por favor, complete todos los campos');
            }
        }

        // Función para mostrar la tabla creada
        function mostrarTabla() {
            let resumenHTML = `<h4>Tabla: ${tabla.nombre}</h4><p>Campos:</p><ul>`;
            tabla.campos.forEach(campo => {
                resumenHTML += `<li>${campo.nombre} (${campo.tipo})</li>`;
            });
            resumenHTML += `</ul>`;
            document.getElementById('tablaResumen').innerHTML = resumenHTML;

            // Crear el formulario dinámico para ingresar datos
            crearFormularioIngreso();
        }

        // Función para crear el formulario de ingreso de datos
        function crearFormularioIngreso() {
            const formIngreso = document.getElementById('formIngreso');
            formIngreso.innerHTML = ''; // Limpiar formulario anterior

            tabla.campos.forEach(campo => {
                let campoHTML = `<div class="form-item">
                                    <label for="${campo.nombre}">${campo.nombre} (${campo.tipo}):</label>`;

                if (campo.tipo === 'Texto') {
                    campoHTML += `<input type="text" id="${campo.nombre}" placeholder="Ingrese ${campo.nombre}">`;
                } else if (campo.tipo === 'Número') {
                    campoHTML += `<input type="number" id="${campo.nombre}" placeholder="Ingrese ${campo.nombre}">`;
                } else if (campo.tipo === 'Fecha') {
                    campoHTML += `<input type="date" id="${campo.nombre}" placeholder="Ingrese ${campo.nombre}">`;
                } else if (campo.tipo === 'Sí/No') {
                    campoHTML += `<select id="${campo.nombre}">
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                  </select>`;
                } else if (campo.tipo === 'AutoNumérico') {
                    campoHTML += `<input type="text" id="${campo.nombre}" value="Auto" readonly>`;
                }

                campoHTML += `</div>`;
                formIngreso.innerHTML += campoHTML;
            });
        }

     // Función para guardar los datos ingresados
        function guardarDatos() {
            let datosValidos = true;
            const tablaDatos = document.getElementById('tablaDatos'); // Tabla donde se mostrarán los datos

            if (tabla.campos && tabla.campos.length > 0) {
                // Crear una nueva fila para el registro
                const nuevaFila = tablaDatos.insertRow();

                // Agregar el nombre de la tabla en la primera columna
                const celdaTabla = nuevaFila.insertCell();
                celdaTabla.textContent = tabla.nombre;

                // Recorrer cada campo y obtener el valor ingresado
                tabla.campos.forEach(campo => {
                    const valor = document.getElementById(campo.nombre).value;

                    // Validar según el tipo de campo
                    if (campo.tipo === 'Texto' && !valor) {
                        datosValidos = false;
                    } else if (campo.tipo === 'Número' && isNaN(valor)) {
                        datosValidos = false;
                    } else if (campo.tipo === 'Fecha' && !valor) {
                        datosValidos = false;
                    }

                    // Agregar la celda correspondiente con el valor ingresado
                    const nuevaCelda = nuevaFila.insertCell();
                    nuevaCelda.textContent = `${campo.nombre}: ${valor}`; // Mostrar el nombre del campo y su valor
                });

                // Si los datos son válidos, se agrega la fila y se limpian los campos
                if (datosValidos) {
                    alert('Datos guardados correctamente');
                    tabla.campos.forEach(campo => {
                        document.getElementById(campo.nombre).value = ''; // Limpiar campo
                    });
                } else {
                    alert('Por favor, corrija los errores en los campos');
                }
            }
        }


        // Función para crear una nueva tabla
        function crearNuevaTabla() {
            tabla = {}; // Resetear la tabla actual
            document.getElementById('tablaNombre').value = '';
            document.getElementById('campoNombre').value = '';
            document.getElementById('tablaResumen').innerHTML = '';
            document.getElementById('formIngreso').innerHTML = '';
            document.getElementById('tablaDatos').querySelector('tbody').innerHTML = ''; // Limpiar datos
        }