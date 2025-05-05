document.addEventListener('DOMContentLoaded', function () {
    const correctPositions = {
        item1: { top: 77, left: 4, explanation: "Correcto: Este botón es incorrecto ya que no deseamos imprimir registros." },
        item2: { top: 52, left: 43, explanation: "Correcto: Este botón es erróneo ya que duplicar registros en la base de datos causaría problemas de relación." },
        item3: { top: 62, left: 80, explanation: "Correcto: Este botón es erróneo ya que no necesitamos imprimir nuestro formulario debido a que solo estamos creando un CRUD." }
    };

    const initialPositions = {
        item1: { top: 20, left: 10 },
        item2: { top: 20, left: 40 },
        item3: { top: 20, left: 70 }
    };

    let draggedElement = null;

    function dragStart(e) {
        draggedElement = e.target;
        draggedElement.style.opacity = '0.5';
    }

    function dragMove(e) {
        if (draggedElement) {
            const container = document.querySelector('.image-container');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            draggedElement.style.left = `${percentX}%`;
            draggedElement.style.top = `${percentY}%`;
        }
    }

    function dragEnd() {
        if (draggedElement) {
            draggedElement.style.opacity = '1';
            draggedElement = null;
        }
    }

    function checkPositions() {
        let correctCount = 0;
        let incorrectMessages = [];

        Object.keys(correctPositions).forEach(itemId => {
            let item = document.getElementById(itemId);
            let correctPos = correctPositions[itemId];

            const rect = item.getBoundingClientRect();
            const container = document.querySelector('.image-container');
            const containerRect = container.getBoundingClientRect();

            const currentLeft = ((rect.left - containerRect.left) / containerRect.width) * 100;
            const currentTop = ((rect.top - containerRect.top) / containerRect.height) * 100;

            const tolerance = 5;

            if (Math.abs(currentLeft - correctPos.left) <= tolerance && Math.abs(currentTop - correctPos.top) <= tolerance) {
                item.classList.add("correct");
                correctCount++;

                // Mostrar la explicación cuando el punto está en la posición correcta
                let explanationText = correctPos.explanation;

                // Crear un contenedor de explicación y mostrarlo en la posición correcta
                let explanationDiv = document.createElement('div');
                explanationDiv.classList.add('explanation');
                explanationDiv.style.left = `${correctPos.left}%`;
                explanationDiv.style.top = `${correctPos.top}%`;
                explanationDiv.innerHTML = explanationText;

                document.querySelector('.image-container').appendChild(explanationDiv);

            } else if (Math.abs(currentLeft - correctPos.left) <= 10 && Math.abs(currentTop - correctPos.top) <= 10) {
                item.classList.add("close");
            } else {
                item.classList.remove("correct", "close");
            }
        });

        const infoMessage = document.getElementById('infoMessage');
        if (correctCount === 3) {
            infoMessage.textContent = "¡Felicidades! Todos los puntos están correctamente ubicados.";
            infoMessage.style.color = "green";
        } else if (correctCount > 0) {
            infoMessage.textContent = "Algunos puntos están correctos, sigue intentando.";
            infoMessage.style.color = "orange";
        } else {
            infoMessage.textContent = "Ningún punto está en la posición correcta. Intenta de nuevo.";
            infoMessage.style.color = "red";
        }

        infoMessage.style.display = 'block';
    }

    function showSolution() {
        Object.keys(correctPositions).forEach(itemId => {
            let item = document.getElementById(itemId);
            let correctPos = correctPositions[itemId];

            // Mostrar las posiciones correctas
            item.style.left = `${correctPos.left}%`;
            item.style.top = `${correctPos.top}%`;
            item.classList.add("solution");

            // Mostrar la explicación en la posición correcta
            let explanationText = correctPos.explanation;

            let explanationDiv = document.createElement('div');
            explanationDiv.classList.add('explanation');
            explanationDiv.style.left = `${correctPos.left}%`;
            explanationDiv.style.top = `${correctPos.top}%`;
            explanationDiv.innerHTML = explanationText;

            document.querySelector('.image-container').appendChild(explanationDiv);
        });

        document.getElementById('infoMessage').textContent = "Aquí están las posiciones correctas.";
        document.getElementById('infoMessage').style.display = 'block';
    }

    function resetChallenge() {
        Object.keys(initialPositions).forEach(itemId => {
            let item = document.getElementById(itemId);
            let startPos = initialPositions[itemId];

            item.style.left = `${startPos.left}%`;
            item.style.top = `${startPos.top}%`;
            item.classList.remove("correct", "close", "solution");
        });

        // Eliminar explicaciones previas
        document.querySelectorAll('.explanation').forEach(explanation => {
            explanation.remove();
        });

        document.getElementById('infoMessage').style.display = 'none';
    }

    const dragItems = document.querySelectorAll('.drag-item');
    dragItems.forEach(item => {
        item.addEventListener('mousedown', dragStart);
    });

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    window.checkPositions = checkPositions;
    window.showSolution = showSolution;
    window.resetChallenge = resetChallenge;
});
