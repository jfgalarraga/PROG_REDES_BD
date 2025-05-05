document.getElementById('certificate-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
  
    if (name && date) {
      document.getElementById('cert-name').innerText = name;
      document.getElementById('cert-date').innerText = new Date(date).toLocaleDateString('es-ES');
  
      document.getElementById('certificate-container').style.display = 'block';
  
      // Smooth scroll to certificate
      document.getElementById('certificate-container').scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  document.getElementById('download-btn').addEventListener('click', function () {
    const certificate = document.querySelector('.certificate');
    html2canvas(certificate).then(canvas => {
      const link = document.createElement('a');
      link.download = 'Certificado_Microsoft_Access.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
  