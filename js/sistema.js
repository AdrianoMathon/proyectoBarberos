var servicios = [
    { id: 1, nombre: "Corte de cabello", precio: 1500, duracion: 30 },
    { id: 2, nombre: "Afeitado clásico", precio: 1200, duracion: 30 },
    { id: 3, nombre: "Corte y barba", precio: 2500, duracion: 60 },
    { id: 4, nombre: "Tinte para cabello", precio: 1800, duracion: 90 },
    { id: 5, nombre: "Peinado especial", precio: 1000, duracion: 30 }
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

// Registrar una nueva reserva
function registrarReserva(reserva) {
    // Verificar si el horario aún está disponible
    var horarioOcupado = reservas.some(function(r) {
        return r.fecha === reserva.fecha && 
               r.horario === reserva.horario && 
               r.barberoId === reserva.barberoId;
    });
    
    if (horarioOcupado) {
        throw new Error("Este horario ya no está disponible");
    }
    
    // Agregar a la lista de reservas
    reservas.push(reserva);
    
    // Guardar en localStorage
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
        // expone reservas para inspección o reinicio en los tests
        __reservaData__: { reservas }
    };
}