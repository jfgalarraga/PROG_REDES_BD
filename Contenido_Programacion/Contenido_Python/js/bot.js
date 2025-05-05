
document.addEventListener('DOMContentLoaded', function () {
    // Array de preguntas, respuestas, imágenes y videos
    const qaArray = [
        {
            question: "¿Qué es un algoritmo?",
            response: "Un conjunto de instrucciones que resuelven un problema o realizan una tarea.",
            image: "",
            video: ""
        },
        {
            question: "¿Dime una operación aritmética básica en algoritmos?",
            response: "Sumar dos números.",
            image: "",
            video: ""
        },
        {
            question: "¿Qué se necesita para usar una condicional en un algoritmo?",
            response: "Una condición que puede ser verdadera o falsa.",
            image: "",
            video: ""
        },
        {
            question: "¿Cuál es el propósito de un ciclo 'while'?",
            response: "Repetir un bloque de código mientras una condición sea verdadera.",
            image: "",
            video: ""
        }
    ];

    // Referencias a elementos del DOM
    const questionList = document.getElementById('questionList');
    const questionButton = document.getElementById('questionButton');
    const questionMenu = document.getElementById('questionMenu');
    const responseText = document.getElementById('responseText');

    // Generar las preguntas en el menú
    qaArray.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item question mb-1 list-group-item-action';
        listItem.style.cssText = 'border: solid 0px #7c2e2e; border-radius: 15px; background-color: #181d38; color: white;';
        listItem.setAttribute('data-bs-toggle', 'list');
        listItem.setAttribute('role', 'tab');
        listItem.setAttribute('data-index', index);
        listItem.textContent = item.question;
        questionList.appendChild(listItem);
    });

    // Mostrar/Ocultar el menú
    questionButton.addEventListener('click', function () {
        questionMenu.style.display = questionMenu.style.display === 'none' || questionMenu.style.display === '' ? 'block' : 'none';
    });

    // Delegación de eventos para manejar clics en las preguntas
    questionList.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('question')) {
            const index = event.target.getAttribute('data-index');
            const selectedQA = qaArray[index];

            let content = `
                <div class="container section-title" data-aos="fade-up">
                    <h2>${selectedQA.question}</h2>
                    <p>${selectedQA.response}</p>
                </div>
            `;

            // Agregar imagen si existe
            if (selectedQA.image) {
                content += `
                    <div class="container">
                        <div class="row mt-3">
                            <div class="col-lg-4 col-md-4"></div>
                            <div class="col-lg-4 col-md-4">
                                <img src="${selectedQA.image}" alt="Imagen relacionada" class="img-fluid mb-3">
                            </div>
                        </div>
                    </div>
                `;
            }

            // Agregar video si existe
            if (selectedQA.video) {
                content += `
                    <div class="container">
                        <div class="row mt-1">
                            <video controls class="w-100">
                                <source src="${selectedQA.video}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                `;
            }

            responseText.innerHTML = content;

            // Mostrar el modal y ocultar el menú
            const responseModal = new bootstrap.Modal(document.getElementById('responseModal'));
            responseModal.show();
            questionMenu.style.display = 'none';
        }
    });
});