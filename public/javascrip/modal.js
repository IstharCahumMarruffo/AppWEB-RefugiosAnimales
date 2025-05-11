document.addEventListener('DOMContentLoaded', () => {
  const actualizarBtn = document.getElementById('btnActualizarUsuario');
  const eliminarBtn = document.getElementById('btnEliminarUsuario');

 
  if (actualizarBtn) {
    actualizarBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 

        const id = actualizarBtn.dataset.id; 
        const nombre = document.getElementById('inputNombre').value;
        const correo = document.getElementById('inputCorreo').value;
        const contrasena = document.getElementById('inputContrasena').value;

        try {
            const res = await fetch(`/usuarios/actualizar/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, contrasena })
            });

            const data = await res.json(); 
            if (res.ok) {
                alert(data.mensaje); 
                const modalElement = document.getElementById('modalAdminCuenta');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
                window.location.href = '/filtro';
            } else {
                alert(data.mensaje || 'Error al actualizar');
            }
        } catch (err) {
            console.error('Error al enviar PUT:', err);
            alert('Error al intentar actualizar el usuario');
        }
    });
}


  if (eliminarBtn) {
      eliminarBtn.addEventListener('click', async () => {
          const id = eliminarBtn.dataset.id; 

          if (!confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) return;

          try {
              const res = await fetch(`/usuarios/eliminar/${id}`, {
                  method: 'DELETE'
              });

              if (res.ok) {
                  alert('Usuario eliminado correctamente');
                  const modalElement = document.getElementById('modalAdminCuenta');
                  const modal = bootstrap.Modal.getInstance(modalElement);
                  modal.hide();
                  window.location.href = '/'; 
              } else {
                  alert('Error al eliminar');
              }
          } catch (err) {
              console.error('Error al enviar DELETE:', err);
          }
      });
  }
});