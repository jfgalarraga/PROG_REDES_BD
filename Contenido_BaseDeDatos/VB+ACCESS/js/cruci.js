const preguntas = [
    { id: 1, enunciado: "1.- Esta acción llamada ______________ realiza un formulario en Access cuando se utiliza la opción 'Agregar nuevo registro'", opciones: ["A.- CREAR", "B.- EDITAR", "C.- BORRAR", "D.- BUSCAR"], respuesta: "A.- CREAR" },
    { id: 2, enunciado: "2.- En un formulario de Access, un registro específico se visualiza en la ______________", opciones: ["A.- TABLA", "B.- COLUMNA", "C.- FORMULARIO", "D.- LISTA"], respuesta: "D.- LISTA" },
    { id: 3, enunciado: "3.- Si deseas eliminar un registro en un formulario de Access, este ______________", opciones: ["A.- OCULTA", "B.- BORRA", "C.- EDITAR", "D.- ELIMINAR"], respuesta: "D.- ELIMINAR" },
    { id: 4, enunciado: "4.- El proceso para modificar datos existentes en Access se llama ______________", opciones: ["A.- CREAR", "B.- ACTUALIZAR", "C.- ELIMINAR", "D.- CONSULTAR"], respuesta: "B.- ACTUALIZAR" },
    { id: 5, enunciado: "5.- El lenguaje de programación usado en Access para automatización es ______________", opciones: ["A.- C++", "B.- JAVA", "C.- VBA", "D.- PYTHON"], respuesta: "C.- VBA" }
];

let respuestasUsuario = {};
let puntaje = 0;
let haComprobado = false; // Nueva variable para rastrear si ya se ha comprobado


function cargarPreguntas() {
    const contenedor = document.getElementById("preguntas");
    contenedor.innerHTML = "";
    preguntas.forEach(p => {
        let opcionesHtml = p.opciones.map(op => `<div class='option' draggable='true' data-respuesta='${op}'>${op}</div>`).join(" ");
        contenedor.innerHTML += `
            <p>${p.enunciado}</p>
            <div class="dropzone" data-id="${p.id}"></div>
            <div id="respuesta-${p.id}"></div>
            <div>${opcionesHtml}</div>
        `;
    });
    agregarEventosDrag();
}

function agregarEventosDrag() {
    document.querySelectorAll(".option").forEach(opt => {
        opt.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text", event.target.dataset.respuesta);
        });
    });

    document.querySelectorAll(".dropzone").forEach(zone => {
        zone.addEventListener("dragover", event => {
            event.preventDefault();
        });
        zone.addEventListener("drop", event => {
            event.preventDefault();
            let respuesta = event.dataTransfer.getData("text");
            event.target.textContent = respuesta;
            respuestasUsuario[event.target.dataset.id] = respuesta;
        });
    });
}

document.getElementById("comprobar").addEventListener("click", () => {
    puntaje = 0;
    let resultadoHtml = "";
    preguntas.forEach(p => {
        let usuarioResp = respuestasUsuario[p.id] || "";
        if (usuarioResp === p.respuesta) {
            puntaje += 20;
            resultadoHtml += `<p>✅ ${p.enunciado} - Respuesta correcta: ${usuarioResp}</p>`;
        }
    });
    document.getElementById("resultado").innerHTML = `<p>Puntaje: ${puntaje}/100</p>` + resultadoHtml;
    haComprobado = true; // Marcamos que ya se ha hecho la comprobación
    document.getElementById("mostrarSolucionario").disabled = !haComprobado;
    if (puntaje >= 80) {
        document.getElementById("felicidades").innerHTML = "🎉 FELICIDADES POR COMPLETAR EL JUEGO 🎉";
    }
});

document.getElementById("reiniciar").addEventListener("click", () => {
    respuestasUsuario = {};
    puntaje = 0;
    haComprobado = false; // Reseteamos el estado de la comprobación
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("felicidades").innerHTML = "";
    document.getElementById("mostrarSolucionario").disabled = true;
    document.getElementById("solucionario").style.display = "none";
    cargarPreguntas();
});

document.getElementById("mostrarSolucionario").addEventListener("click", () => {
    let solucionHtml = "<h3>Solucionario</h3>";
    preguntas.forEach(p => {
        solucionHtml += `<p>${p.enunciado} - Respuesta: <strong>${p.respuesta}</strong></p>`;
    });
    document.getElementById("solucionario").innerHTML = solucionHtml;
    document.getElementById("solucionario").style.display = "block";
});

cargarPreguntas();