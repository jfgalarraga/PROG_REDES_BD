 // Effect for the first example (Typed.js animation)
 var options1 = {
    strings: ["Ejercicio 1: Crear un formulario en Access para realizar busquedas por mes de la persona. El formulario debe permitir leer la fecha de cumpleaños."],
    typeSpeed: 30,
    backSpeed: 50,
    backDelay: 500,
    loop: false
};
var typed1 = new Typed("#typed1", options1);

// Effect for the second example (Typed.js animation)
var options2 = {
    strings: ["Ejercicio 2: Crear un formulario  para hacer control de estudiantes de una escuela Access y VBA. El formulario debe permitir actualizar estudiantes."],
    typeSpeed: 30,
    backSpeed: 50,
    backDelay: 500,
    loop: false
};
var typed2 = new Typed("#typed2", options2);

function mostrarVideo() {
    let videoContainer = document.getElementById("videoContainer");
    let videoPlayer = document.getElementById("videoPlayer");
    
    videoContainer.classList.add("show"); // Agrega la clase para animar
    setTimeout(() => {
        videoPlayer.play(); // Reproduce el video automáticamente después de abrir
    }, 400);
}

function cerrarVideo() {
    let videoContainer = document.getElementById("videoContainer");
    let videoPlayer = document.getElementById("videoPlayer");

    videoPlayer.pause(); // Pausa el video antes de cerrar
    videoContainer.classList.remove("show"); // Oculta con animación
    setTimeout(() => {
        videoContainer.style.display = "none";
    }, 400);
}
