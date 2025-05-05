let blocks = {};
let correctOrder = [];

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const block = document.getElementById(data);
  const dropZone = ev.target;

  if (dropZone.className === "espacio-vacio") {
    if (dropZone.hasAttribute("data-block")) {
      const existingBlockId = dropZone.getAttribute("data-block");
      document.getElementById(existingBlockId).style.display = "block";
    }
    dropZone.innerHTML = blocks[data];
    dropZone.setAttribute("data-block", data);
    block.style.display = "none";
  }
}

function checkCompletion() {
  const emptySpaces = document.querySelectorAll('.espacio-vacio');
  const completedSpaces = Array.from(emptySpaces).filter(space => space.hasAttribute("data-block"));
  const errorMessage = document.getElementById("error-message");

  if (completedSpaces.length === emptySpaces.length) {
    validateOrder(completedSpaces);
    errorMessage.style.display = "none";
  } else {
    errorMessage.textContent = "Por favor, complete todos los espacios.";
    errorMessage.style.display = "block";
  }
}

function validateOrder(completedSpaces) {
  const userOrder = completedSpaces.map(space => space.getAttribute("data-block"));
  const errorMessage = document.getElementById("error-message");
  const incompleteMessage = document.getElementById("incomplete");
  const retryButton = document.getElementById("retry-button");

  if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
    document.getElementById("completed").style.display = "block";
    errorMessage.style.display = "none";
    incompleteMessage.style.display = "none";
    retryButton.style.display = "none";
  } else {
    incompleteMessage.style.display = "block";
    retryButton.style.display = "inline-block";
    errorMessage.style.display = "none";
  }
}

function resetGame() {
  const algorithmContainer = document.getElementById("algorithm-container");
  algorithmContainer.innerHTML = ""; // Limpiar espacios vacíos
  document.getElementById("completed").style.display = "none";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("incomplete").style.display = "none";
  document.getElementById("retry-button").style.display = "none";
  const codeBlocks = document.querySelectorAll('.bloque-codigo');
  codeBlocks.forEach(block => {
    block.style.display = "block";
  });
}

function updateGame() {
  resetGame(); // Limpiar el juego antes de actualizar
  const codeBlocksContainer = document.getElementById("code-blocks-container");
  const algorithmContainer = document.getElementById("algorithm-container");
  codeBlocksContainer.innerHTML = "";

  // Generar bloques de código
  for (const blockId in blocks) {
    const block = document.createElement("div");
    block.classList.add("bloque-codigo");
    block.setAttribute("draggable", "true");
    block.setAttribute("ondragstart", "drag(event)");
    block.setAttribute("id", blockId);
    block.textContent = blocks[blockId];
    codeBlocksContainer.appendChild(block);
  }

  // Generar espacios vacíos dinámicamente
  for (let i = 1; i <= correctOrder.length; i++) {
    const espacio = document.createElement("div");
    espacio.classList.add("espacio-vacio");
    espacio.id = `empty${i}`;
    espacio.textContent = `Espacio ${i}`;
    algorithmContainer.appendChild(espacio);
  }
}
function resetToSelection() {
  resetGame(); // Limpiar el juego actual
  const gameContainer = document.getElementById('game-container');
  const verifyButton = document.getElementById('verify-button');
  const retryButton = document.getElementById('retry-button');
  const selectElement = document.querySelector('.selector-pregunta select');

  gameContainer.style.display = 'none';
  verifyButton.style.display = 'none';
  retryButton.style.display = 'none';
  
  selectElement.value = ""; // Restablecer el valor del select
}



function loadPerfectosPares() {
  blocks = {
    "block1": 'escribir("LOS NÚMEROS PERFECTOS PARES HASTA EL ", MAX, " son:");',
    "block2": "para(num = 1; num <= MAX; num++)",
    "block3": "   si(num % 2 == 0)",
    "block4": "      suma = 1;",
    "block5": "      para(cont = 2; cont < num; cont++)",
    "block6": "         si(num % cont == 0)",
    "block7": "            suma = suma + cont;",
    "block8": "      si(suma == num)",
    "block9": '         escribir("EL NÚMERO ", num, " ES PERFECTO PAR");'
  };
  correctOrder = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "block8", "block9"];
  updateGame();
}

function loadPerfectosImpares() {
  blocks = {
    "block1": 'escribir("\\n\\nLOS NÚMEROS PERFECTOS IMPARES HASTA EL ", MAX, " son:");',
    "block2": "para(num = 1; num <= MAX; num++)",
    "block3": "   si(num % 2 != 0)",
    "block4": "      suma = 1;",
    "block5": "      para(cont = 2; cont < num; cont++)",
    "block6": "         si(num % cont == 0)",
    "block7": "            suma = suma + cont;",
    "block8": "      si(suma == num)",
    "block9": '         escribir("EL NÚMERO ", num, " ES PERFECTO IMPAR");'
  };
  correctOrder = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "block8", "block9"];
  updateGame();
}

function loadSerieMatematica() {
  blocks = {
    "block1": "hacer",
    "block2": '   limpiar_pantalla()',
    "block3": '   escribir("Exponente?: ");',
    "block4": '   limpiar_buffer()',
    "block5": "   leer(num);",
    "block6": "   si (!(num >= MIN AND num <= MAX))",
    "block7": '      escribir("Fuera de rango...presione una tecla para continuar");',
    "block8": "      esperar() ",
    "block9": "mientras (!(num >= MIN AND num <= MAX));",
    "block10": "suma = 1;",
    "block11": "veces = 1;",
    "block12": "mientras (abs(suma - exp(num)) > ERROR)",
    "block13": "   para (fact = cont = 1; cont <= veces; cont++)",
    "block14": "      fact *= cont;",
    "block15": "   aux = potencia(num, veces); ",
    "block16": "   termino = aux / fact;",
    "block17": "   suma += termino;",
    "block18": "   veces++;",
    "block19": 'escribir("Resultado= ", formatear(suma, 3)); ',
  };
  correctOrder = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "block8", "block9", "block10", "block11", "block12", "block13", "block14", "block15", "block16", "block17", "block18", "block19"];
  updateGame();
}

function loadMCM() {
  blocks = {
    "block1": "mcm = 1;",
    "block2": "q = 2;",
    "block3": "y = b;",
    "block4": 'escribir("\\n\\n\\n  mcm\\t=1");',
    "block5": "para(x = a; q < (MAX * MAX); q++)",
    "block6": "   z = 0;",
    "block7": "   si((x % q == 0) OR (y % q == 0))",
    "block8": "      hacer",
    "block9": "         si(x % q == 0)",
    "block10": "            x = x / q;",
    "block11": "         si(y % q == 0)",
    "block12": "            y = y / q;",
    "block13": "         z++;",
    "block14": "         mcm = mcm * q;",
    "block15": "      mientras((x % q == 0) OR (y % q == 0));",
    "block16": '      escribir("* ", q, "^", z);',
    "block17": 'escribir("\\n\\n\\n\\n mcm= ", abs(mcm));'
  };
  correctOrder = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "block8", "block9", "block10", "block11", "block12", "block13", "block14", "block15", "block16", "block17"];
  updateGame();
}

function loadConstanteE() {
  blocks = {
    "block1": "para(sum = 1, veces = 2; veces <= MAX; veces++)",
    "block2": "   para(fact = cont = 1; cont <= (veces - 1); cont++)",
    "block3": "      fact *= cont;",
    "block4": "   termino = 1 / fact;",
    "block5": "   sum += termino;",
    "block6": 'escribir("La constante E= ", formatear(sum, 5));',
  };
  correctOrder = ["block1", "block2", "block3", "block4", "block5", "block6"];
  updateGame();
}

function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value;
  const gameContainer = document.getElementById('game-container');
  const verifyButton = document.getElementById('verify-button');
  const retryButton = document.getElementById('retry-button');
  if (selectedValue === "") {
    gameContainer.style.display = 'none';
    verifyButton.style.display = 'none';
    retryButton.style.display = 'none';
  } else {
    gameContainer.style.display = 'flex';
    verifyButton.style.display = 'block';
    retryButton.style.display = 'none';
    if (selectedValue === "perfectosPares") {
      loadPerfectosPares();
    } else if (selectedValue === "perfectosImpares") {
      loadPerfectosImpares();
    } else if (selectedValue === "serieMatematica") {
      loadSerieMatematica();
    } else if (selectedValue === "mcm") {
      loadMCM();
    } else if (selectedValue === "constanteE") {
      loadConstanteE();
    }
  }
}