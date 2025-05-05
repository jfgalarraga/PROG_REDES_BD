(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", function() {
    // Agregar filas a la tabla
    const addRowButton = document.getElementById("addRow");
    const field1Input = document.getElementById("dataField1");
    const field2Input = document.getElementById("dataField2");
    const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];

    addRowButton.addEventListener("click", function() {
        const field1 = field1Input.value.trim();
        const field2 = field2Input.value.trim();
        
        if (!field1 || !field2) {
            alert("Por favor, ingrese valores en ambos campos.");
            return;
        }
        
        const row = userTable.insertRow();
        row.insertCell(0).textContent = field1;
        row.insertCell(1).textContent = field2;
        
        field1Input.value = "";
        field2Input.value = "";
    });

    // Control de acordeón: alternar colapsado/expandido
    document.querySelectorAll('.accordion-header button').forEach(button => {
        button.addEventListener('click', function() {
            const collapseTarget = document.querySelector(this.getAttribute('data-bs-target'));
            collapseTarget.classList.toggle('show');
        });
    });

    // Control del formulario de creación de tabla
    const tableForm = document.getElementById("tableCreationForm");
    const tableResult = document.getElementById("tableResult");

    tableForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const field1 = document.getElementById("field1").value.trim();
        const field2 = document.getElementById("field2").value.trim();

        if (!field1 || !field2) {
            alert("Debe completar ambos campos para crear la tabla.");
            return;
        }

        tableResult.innerHTML = `
            <table class='table'>
                <thead>
                    <tr><th>${field1}</th><th>${field2}</th></tr>
                </thead>
                <tbody>
                    <tr><td>Dato 1</td><td>Dato 2</td></tr>
                </tbody>
            </table>
        `;
    });

    // Juego de selección en formularios
    document.querySelectorAll('.query-game').forEach(button => {
        button.addEventListener('click', function() {
            const correctAnswer = "Campos de entrada";
            if (this.textContent.trim() === correctAnswer) {
                alert("¡Correcto! Los formularios en Access permiten la introducción de datos mediante campos de entrada.");
                this.style.backgroundColor = "#28a745";
                this.style.color = "white";
            } else {
                alert("Incorrecto, intenta de nuevo.");
                this.style.backgroundColor = "#dc3545";
                this.style.color = "white";
            }
        });
    });

    // Juego de respuestas
    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function() {
            alert(this.textContent.trim() === "Tablas" 
                ? "¡Correcto!"
                : "Incorrecto, intenta de nuevo.");
        });
    });

    // Mostrar contenedor de preguntas
    document.getElementById('startQuiz').addEventListener('click', function() {
        document.getElementById('quizContainer').style.display = 'block';
    });

    // Mostrar contenedor de juego de tablas
    document.getElementById('startTableGame').addEventListener('click', function() {
        document.getElementById('tableGameContainer').style.display = 'block';
    });

    // Juego de relaciones entre tablas
    document.querySelectorAll('.game-answer').forEach(button => {
        button.addEventListener('click', function() {
            alert(this.textContent.trim() === "Filas y columnas" 
                ? "¡Correcto!"
                : "Incorrecto, intenta de nuevo.");
        });
    });

    // Interacción con el acordeón
    document.querySelectorAll('.accordion-body button').forEach(button => {
        button.addEventListener('click', function() {
            alert(this.textContent.trim() === "Uno a muchos" 
                ? "¡Correcto!"
                : "Incorrecto, intenta de nuevo.");
        });
    });

    // Animaciones con jQuery
    $(document).ready(function(){
        $(".toggle-info").click(function(){
            $(this).next(".info-content").slideToggle();
            $(this).find("i").toggleClass("bi-chevron-right bi-chevron-down");
        });

        $(".answer").click(function(){
            let answer = $(this).data("answer");
            $("#feedback").text(answer === "correcto" 
                ? "¡Correcto! 'Uno a Muchos' es la relación más común en Access."
                : "Incorrecto, intenta de nuevo.").css("color", answer === "correcto" ? "#28a745" : "#dc3545");
        });
    });
});

document.querySelectorAll(".draggable").forEach(item => {
    item.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text", event.target.id);
    });
});

document.querySelector(".dropzone").addEventListener("dragover", event => {
    event.preventDefault();
});

document.querySelector(".dropzone").addEventListener("drop", event => {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let droppedElement = document.getElementById(data);
    if (!event.target.contains(droppedElement)) {
        event.target.appendChild(droppedElement);
    }
});

document.getElementById("checkOrder").addEventListener("click", function() {
    let dropzone = document.getElementById("dropzone");
    let steps = Array.from(dropzone.children).map(el => el.id);
    let correctOrder = ["step2", "step1", "step3", "step4"];

    if (JSON.stringify(steps) === JSON.stringify(correctOrder)) {
        document.getElementById("feedback-order").textContent = "¡Correcto! Has ordenado bien los pasos.";
        dropzone.classList.add("correct");
    } else {
        document.getElementById("feedback-order").textContent = "Inténtalo de nuevo. El orden no es correcto.";
        dropzone.classList.add("incorrect");
        setTimeout(() => dropzone.classList.remove("incorrect"), 1000);
    }
});

document.getElementById("resetGame").addEventListener("click", function() {
    let dropzone = document.getElementById("dropzone");
    let stepsContainer = document.getElementById("steps");
    while (dropzone.firstChild) {
        stepsContainer.appendChild(dropzone.firstChild);
    }
    document.getElementById("feedback-order").textContent = "";
    dropzone.classList.remove("correct", "incorrect");
});
