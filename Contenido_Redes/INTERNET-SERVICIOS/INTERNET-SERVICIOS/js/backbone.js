$(document).ready(function () {
  function simulatePacket(protocol, color, message, extraAnimation = null) {
    const packet = $("#packet");

    // Configurar el paquete
    packet
      .removeClass("hidden")
      .addClass("visible")
      .css({
        backgroundColor: color,
        left: "5%",
        top: "50%",
      });

    // Mostrar la sección de simulación
    $("#simulation-section").removeClass("d-none");

    // Desplazarse a la sección de simulación
    $("html, body").animate(
      { scrollTop: $("#simulation-section").offset().top },
      500
    );

    // Mover el paquete hacia el destino
    packet.animate(
      { left: "100%" },
      2000,
      function () {
        if (extraAnimation) {
          extraAnimation(packet);
        } else {
          alert(message);
          packet.removeClass("visible");
        }
      }
    );
  }

  $(".simulate-btn").on("click", function () {
    const protocol = $(this).data("protocol");

    switch (protocol) {
      case "ip":
        simulatePacket("ip", "blue", "El paquete IP llegó al dispositivo correcto.");
        break;

      case "tcp":
        simulatePacket(
          "tcp",
          "green",
          "Conexión TCP exitosa.",
          (packet) => alert("Handshake TCP completado.")
        );
        break;

      case "udp":
        simulatePacket("udp", "orange", "Los datos fueron enviados rápidamente con UDP.", (packet) => {
          for (let i = 0; i < 3; i++) {
            const clone = packet.clone().appendTo("#network");
            clone.animate({ left: "85%" }, 1500, function () {
              clone.remove();
            });
          }
          packet.removeClass("visible");
        });
        break;

      case "http":
        simulatePacket("http", "purple", "Petición HTTP enviada al servidor.");
        break;

      case "https":
        simulatePacket("https", "black", "Petición HTTPS cifrada enviada al servidor.");
        break;

      case "tls":
        simulatePacket("tls", "gold", "Los datos han sido cifrados con TLS/SSL.");
        break;

      default:
        alert("Protocolo no reconocido.");
    }
  });

  // Mostrar/ocultar definiciones
  $("#show-definitions").on("click", function () {
    $("#definitions-section").removeClass("d-none");
    $(this).addClass("d-none");
    $("#hide-definitions").removeClass("d-none");
  });

  $("#hide-definitions").on("click", function () {
    $("#definitions-section").addClass("d-none");
    $(this).addClass("d-none");
    $("#show-definitions").removeClass("d-none");
  });
});
