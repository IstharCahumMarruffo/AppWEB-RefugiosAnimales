async function redirigirSegunSesion(event) {
    event.preventDefault(); 
  
    try {
      const respuesta = await fetch('/api/sesion');
      const data = await respuesta.json();
  
      if (data.activa) {
        window.location.href = '/filtro';
      } else {
        window.location.href = '/autenticacion';
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      window.location.href = '/autenticacion'; 
    }
  }