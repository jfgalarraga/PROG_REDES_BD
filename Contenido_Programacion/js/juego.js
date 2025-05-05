let startElement = null;
const colors = ["#ff5733", "#33c4ff", "#75ff33", "#f333ff", "#ff9933"];
let colorIndex = 0;

// Manejar clics en los elementos
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
        // Si la respuesta ya está emparejada, no hacer nada
        if (item.classList.contains("matched")) {
            return;
        }

        if (!startElement) {
            startElement = item; // Almacena el primer elemento seleccionado
            item.style.backgroundColor = "#e0e0e0"; // Destacar selección inicial
        } else {
            // Verificar si el elemento seleccionado está en la misma columna
            if (startElement.parentElement === item.parentElement) {
                return; // No hacer nada si el elemento está en la misma columna
            }

            checkMatch(startElement, item);
            startElement.style.backgroundColor = ""; // Restablecer color del primer elemento
            startElement = null; // Reiniciar selección
        }
    });
});

// Verificar si la conexión es correcta
function checkMatch(start, end) {
    const messageContainer = document.getElementById("message");

    if (start.dataset.pair === end.dataset.pair) {
        const currentColor = colors[colorIndex % colors.length];
        start.style.backgroundColor = currentColor;
        end.style.backgroundColor = currentColor;
        start.classList.add("matched");
        end.classList.add("matched");
        colorIndex++; // Cambiar al siguiente color

        // Mostrar mensaje correcto
        messageContainer.textContent = "¡Correcto!";
        messageContainer.className = "message correct";
    } else {
        start.classList.add("incorrect");
        end.classList.add("incorrect");

        // Mostrar mensaje incorrecto
        messageContainer.textContent = "Incorrecto. Intenta de nuevo.";
        messageContainer.className = "message wrong";

        setTimeout(() => {
            start.classList.remove("incorrect");
            end.classList.remove("incorrect");
        }, 1000); // Quitar el color después de 1 segundo
    }
}
