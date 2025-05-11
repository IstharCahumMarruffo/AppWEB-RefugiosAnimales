document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAdopcion");

  if (form) {
    form.addEventListener("submit", function (event) {
      if (yaTieneFormulario) {
        alert("¡Ya existe un registro!");
        event.preventDefault();
      } else {
        alert("Su solicitud ha sido enviada");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.querySelector("#btnEliminarFormulario");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", () => {
      const id = btnEliminar.getAttribute("data-id");
      if (confirm('¿Estás seguro de eliminar tus datos?')) {
        fetch(`/formularioadopcion/eliminarform/${id}`, { method: 'DELETE' })
          .then(response => {
            if (response.ok) {
              window.location.href = '/filtroPerro';
            } else {
              return response.text().then(text => {
                console.error('Error del servidor:', text);
                alert('Error al eliminar: ' + text);
              });
            }
          })
          .catch(err => {
            console.error('Error al eliminar:', err);
            alert('Error al eliminar el formulario');
          });
      }
    });
  }
});
