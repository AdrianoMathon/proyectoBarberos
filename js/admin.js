document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const loginForm = document.getElementById('loginForm');
  const reservasPanel = document.getElementById('reservasPanel');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const reservasList = document.getElementById('reservasList');
  const fechaActual = document.getElementById('fechaActual');
  const loginMessage = document.getElementById('loginMessage');
  const adminUserInput = document.getElementById('adminUser');
  const adminPassInput = document.getElementById('adminPass');

  // Mostrar fecha actual
  const hoy = new Date();
  fechaActual.textContent = formatearFecha(hoy);

  // Evento de login
  btnLogin.addEventListener('click', handleLogin);
  
  // Login con Enter
  adminPassInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleLogin();
  });

  // Evento de logout
  btnLogout.addEventListener('click', handleLogout);

  // Función para manejar el login
  function handleLogin() {
    const user = adminUserInput.value.trim();
    const pass = adminPassInput.value.trim();
    
    if (user === 'admin' && pass === 'admin') {
      loginExitoso();
    } else {
      mostrarError('Usuario o contraseña incorrectos');
    }
  }

  // Función para login exitoso
  function loginExitoso() {
    loginForm.style.display = 'none';
    reservasPanel.style.display = 'block';
    cargarReservasDelDia();
    adminUserInput.value = '';
    adminPassInput.value = '';
    loginMessage.textContent = '';
  }

  // Función para mostrar errores
  function mostrarError(mensaje) {
    loginMessage.textContent = mensaje;
    loginMessage.style.display = 'block';
    adminPassInput.value = '';
    setTimeout(() => {
      loginMessage.style.display = 'none';
    }, 3000);
  }

  // Función para logout
  function handleLogout() {
    loginForm.style.display = 'block';
    reservasPanel.style.display = 'none';
    adminUserInput.focus();
  }

  // Formatear fecha
  function formatearFecha(fecha) {
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
  }

  // Cargar reservas del día
  function cargarReservasDelDia() {
    const hoyFormatted = hoy.toISOString().split('T')[0];
    
    try {
      if (!window.Barberia || !window.Barberia.obtenerReservasPorFecha) {
        throw new Error('No se pudo acceder a los datos de reservas');
      }
      
      const reservasHoy = window.Barberia.obtenerReservasPorFecha(hoyFormatted);
      
      if (!reservasHoy || reservasHoy.length === 0) {
        reservasList.innerHTML = '<p class="no-reservas">No hay reservas para hoy.</p>';
        return;
      }
      
      let html = `
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Barbero</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      reservasHoy.forEach(reserva => {
        html += `
          <tr>
            <td>${reserva.horario}</td>
            <td>${reserva.nombreCliente}</td>
            <td>${reserva.servicio}</td>
            <td>${reserva.barbero}</td>
            <td>${reserva.telefono}</td>
          </tr>
        `;
      });
      
      html += '</tbody></table>';
      reservasList.innerHTML = html;
      
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      reservasList.innerHTML = `
        <p class="error-message">
          Error al cargar las reservas. Por favor recarga la página.
          <br>${error.message}
        </p>
      `;
    }
  }
});