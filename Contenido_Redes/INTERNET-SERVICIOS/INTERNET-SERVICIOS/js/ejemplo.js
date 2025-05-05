// Mostrar el contenido de la simulación
document.getElementById('showSimulation').addEventListener('click', function () {
    const simulationContent = document.getElementById('simulationContent');
    const hideButton = document.getElementById('hideSimulation');
    simulationContent.classList.remove('d-none'); // Quita la clase que oculta el contenido
    this.classList.add('d-none'); // Oculta el botón "Mostrar"
    hideButton.classList.remove('d-none'); // Muestra el botón "Ocultar"
  });
  
  // Ocultar el contenido de la simulación
  document.getElementById('hideSimulation').addEventListener('click', function () {
    const simulationContent = document.getElementById('simulationContent');
    const showButton = document.getElementById('showSimulation');
    simulationContent.classList.add('d-none'); // Agrega la clase que oculta el contenido
    this.classList.add('d-none'); // Oculta el botón "Ocultar"
    showButton.classList.remove('d-none'); // Muestra el botón "Mostrar"
  });
  
  // Funcionalidad de la solicitud del cliente al servidor
  document.getElementById('requestButton').addEventListener('click', function () {
    const server = document.getElementById('server');
    server.innerHTML = `
      <h2 class="card-title text-primary">Servidor</h2>
      <p class="card-text">Procesando solicitud...</p>
    `;
  
    setTimeout(() => {
      server.innerHTML = `
        <h2 class="card-title text-primary">Servidor</h2>
        <p class="card-text">¡Aquí está la página solicitada!</p>
      `;
      alert('El servidor ha respondido con la información.');
    }, 2000);
  });
  