var servicios = [
    { id: 1, nombre: "Corte tradicional"},
    { id: 2, nombre: "Corte moderno"},
    { id: 3, nombre: "Corte de barba"},
    { id: 4, nombre: "Afeitado"},
    { id: 5, nombre: "Corte de niño"},
    { id: 6, nombre: "Color" }
];

var barberos = [
    { id: 1, nombre: "Juan Pérez", servicios: [1, 2, 3, 4, 5] },
    { id: 2, nombre: "Carlos Gómez", servicios: [1, 2, 3, 4, 5] },
    { id: 3, nombre: "Luis Rodríguez", servicios: [1, 2, 3, 4, 5] },
    { id: 4, nombre: "Miguel Martínez", servicios: [1, 2, 3, 4, 5] }
];

// Variables para almacenar reservas
var reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Generar horarios disponibles (9:00 a 17:30 cada 30 minutos)
function generarHorarios() {
    var horarios = [];
    var horaInicio = 9 * 60; // 9:00 en minutos
    var horaFin = 17 * 60 + 30; // 17:30 en minutos
    
    for (var minutos = horaInicio; minutos <= horaFin; minutos += 30) {
        var horas = Math.floor(minutos / 60);
        var mins = minutos % 60;
        var horaFormateada = (horas < 10 ? '0' + horas : horas) + ':' + (mins < 10 ? '0' + mins : mins);
        horarios.push(horaFormateada);
    }
    
    return horarios;
}

// Encontrar barbero disponible para un horario específico
function encontrarBarberoDisponible(servicioId, fecha, horario) {
    // Obtener todos los barberos que ofrecen este servicio
    var barberosParaServicio = barberos.filter(function(b) {
        return b.servicios.includes(servicioId);
    });
    
    // Buscar el primer barbero que no tenga reserva en ese horario
    for (var i = 0; i < barberosParaServicio.length; i++) {
        var barbero = barberosParaServicio[i];
        var tieneReserva = reservas.some(function(r) { 
            return r.fecha === fecha && 
                   r.horario === horario && 
                   r.barberoId === barbero.id;
        });
        
        if (!tieneReserva) {
            return barbero;
        }
    }
    
    return null; // No hay barberos disponibles
}

// Validar formato de email
function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefono(telefono) {
    // Eliminar espacios en blanco si los hubiera
    telefono = telefono.replace(/\s/g, '');
    
    // Verificar que solo contenga números y tenga al menos 8 dígitos
    return /^\d{8,}$/.test(telefono);
}

// Registrar una nueva reserva
function registrarReserva(reserva) {
    // Verificar si el barbero ya tiene reserva en ese horario
    const barberoOcupado = reservas.some(r => 
        r.fecha === reserva.fecha && 
        r.horario === reserva.horario && 
        r.barberoId === reserva.barberoId
    );
    
    if (barberoOcupado) {
        throw new Error(`El barbero ${reserva.barbero} ya tiene una reserva a las ${reserva.horario}. 
                       Por favor elija otro barbero u otro horario.`);
    }
    
    // Agregar a la lista de reservas
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    return reserva;
}

// Obtener servicio por ID
function obtenerServicioPorId(id) {
    return servicios.find(function(s) {
        return s.id === id;
    });
}

// Obtener barbero por ID
function obtenerBarberoPorId(id) {
    return barberos.find(function(b) {
        return b.id === id;
    });
}

// Obtener barberos por servicio
function obtenerBarberosPorServicio(servicioId) {
    return barberos.filter(function(b) {
        return b.servicios.includes(servicioId);
    });
}

// Obtener reservas por fecha
function obtenerReservasPorFecha(fecha) {
    return reservas.filter(function(r) {
        return r.fecha === fecha;
    });
}


if (typeof module !== 'undefined') {
    module.exports = {
        registrarReserva,
        encontrarBarberoDisponible,
        obtenerServicioPorId,
        obtenerBarberoPorId,
        obtenerBarberosPorServicio,
        obtenerReservasPorFecha,
        validarEmail,
        generarHorarios,
        servicios,
        barberos,
        buscarReservas,
        // expone reservas para inspección o reinicio en los tests
        __reservaData__: { reservas }
    };
}

// Obtener reservas por fecha ordenadas por hora
function obtenerReservasPorFecha(fecha) {
    return reservas
        .filter(r => r.fecha === fecha)
        .sort((a, b) => a.horario.localeCompare(b.horario));
}

// Función para buscar reservas por cualquier campo
function buscarReservas(criterio) {
    return reservas.filter(reserva => {
        return Object.keys(reserva).some(key => {
            if (typeof reserva[key] === 'string') {
                return reserva[key].toLowerCase().includes(criterio.toLowerCase());
            }
            return false;
        });
    });
}

window.Barberia = {
  servicios: servicios,
  barberos: barberos,
  reservas: JSON.parse(localStorage.getItem('reservas')) || [],
  obtenerReservasPorFecha: obtenerReservasPorFecha,
  registrarReserva: registrarReserva,
  obtenerServicioPorId: obtenerServicioPorId,
  obtenerBarberoPorId: obtenerBarberoPorId,
  obtenerBarberosPorServicio: obtenerBarberosPorServicio,
  validarEmail: validarEmail,
  generarHorarios: generarHorarios,
  encontrarBarberoDisponible: encontrarBarberoDisponible
};