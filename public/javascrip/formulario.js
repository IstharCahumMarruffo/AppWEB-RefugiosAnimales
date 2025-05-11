document.addEventListener('DOMContentLoaded', function () {
  const btnActualizar = document.getElementById('btn-actualizar-datos');
  const formulario = document.getElementById('formulario-adopcion');
  const seccionImportancia = document.getElementById('importancia-adopcion');
  const seccionEstasListo = document.getElementById('estas-listo');

  btnActualizar.addEventListener('click', function (e) {
    e.preventDefault();
    formulario.style.display = 'block';
    seccionImportancia.style.display = 'none';
    seccionEstasListo.style.display = 'none';
    formulario.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btnActualizar = document.getElementById('btnActualizar');
  if (btnActualizar) {
    btnActualizar.addEventListener('click', () => {
      const modal = new bootstrap.Modal(document.getElementById('modalEditarFormulario'));
      modal.show();
    });
  }
});

document.getElementById("formAdopcion").addEventListener("submit", function(event) {
  alert("Su solicitud ha sido enviada");
});