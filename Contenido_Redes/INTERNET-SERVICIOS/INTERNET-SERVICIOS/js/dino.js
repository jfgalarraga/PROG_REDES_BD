const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dino = { x: 50, y: 110, width: 20, height: 20, gravity: 0.5, velocityY: 0, jump: -10, isJumping: false };
const obstacles = [];
let score = 0;
let isGameOver = false;

const dinoImage = new Image();
dinoImage.src = 'img/dino.png'; // Ruta a la imagen del dinosaurio

const cactusImage = new Image();
cactusImage.src = 'img/cactus.png'; // Ruta a la imagen del cactus

function blockKeyboard(e) {
    e.preventDefault(); // Bloquea las acciones del teclado
}

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('dino-game').style.display = 'block';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    dino.isJumping = false;
    dino.velocityY = 0;
    score = 0;
    obstacles.length = 0;
    isGameOver = false;

    // Permitir el uso de la barra espaciadora para saltar
    document.addEventListener('keydown', jump);
    
    requestAnimationFrame(updateGame);
}

function jump(e) {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = dino.jump;
    }
}

function updateGame() {
    if (isGameOver) {
        document.removeEventListener('keydown', jump); // Permite el teclado de nuevo
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;
    if (dino.y > 110) {
        dino.y = 110;
        dino.isJumping = false;
    }

    // Dibuja el dinosaurio
    ctx.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);

    // Manejo de obstáculos
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: 110, width: 20, height: 20 }); // Puedes ajustar el tamaño si lo deseas
    }

    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.x -= 5;
        
        // Dibuja el cactus en lugar de un cuadrado rojo
        ctx.drawImage(cactusImage, obs.x, obs.y, 20, 20); // Ajusta el tamaño según sea necesario

        // Verificar colisión
        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.y + dino.height > obs.y
        ) {
            isGameOver = true;
            document.getElementById('restartButton').style.display = 'block';
            document.removeEventListener('keydown', jump); // Permite el teclado de nuevo
        }
    }

    // Eliminar obstáculos fuera de pantalla
    obstacles.filter(obs => obs.x + obs.width > 0);
    score++;

    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
    requestAnimationFrame(updateGame);
}

document.getElementById('restartButton').addEventListener('click', startGame);

// No permitir el juego hasta que se haga clic en el botón de inicio
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Bloquear el uso de la barra espaciadora hasta que se inicie el juego
    }
});
