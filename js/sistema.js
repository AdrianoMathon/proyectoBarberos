var servicios = [
    { id: 1, nombre: "Corte tradicional"},
    { id: 2, nombre: "Corte moderno"},
    { id: 3, nombre: "Corte de barba"},
    { id: 4, nombre: "Afeitado"},
    { id: 5, nombre: "Corte de niño"},
    { id: 6, nombre: "Color" }
];

var barberos = [
    { id: 1, nombre: "Miguel Martínez", servicios: [1, 2, 3, 4, 5, 6] },
    { id: 2, nombre: "Carlos Gómez", servicios: [1, 2, 3, 4, 5, 6] },
    { id: 3, nombre: "Luis Rodríguez", servicios: [1, 2, 3, 4, 5, 6] },
];

// Reservas iniciales precargadas
var reservas = [
    {
        fecha: "2025-08-14",
        horario: "09:00",
        servicioId: 2,
        servicio: "Corte moderno",
        barberoId: 1,
        barbero: "Miguel Martínez",
        nombreCliente: "Leonardo Fernández",
        email: "leonardo@gmail.com",
        telefono: "091434567"
    },
    {
        fecha: "2025-08-14",
        horario: "09:30",
        servicioId: 1,
        servicio: "Corte tradicional",
        barberoId: 2,
        barbero: "Carlos Gómez",
        nombreCliente: "Lucas Hernández",
        email: "lucas@gmail.com",
        telefono: "098765432"
    },
    {
        fecha: "2025-08-14",
        horario: "11:30",
        servicioId: 6,
        servicio: "Color",
        barberoId: 1,
        barbero: "Miguel Martínez",
        nombreCliente: "Javier Cabrera",
        email: "javier@gmail.com",
        telefono: "098823789"
    },
    {
        fecha: "2025-08-14",
        horario: "15:30",
        servicioId: 2,
        servicio: "Corte moderno",
        barberoId: 3,
        barbero: "Luis Rodríguez",
        nombreCliente: "Maximiliano Silvera",
        email: "maximiliano@gmail.com",
        telefono: "098923456"
    }
];

// Generar horarios disponibles (9:00 a 17:30 cada 30 minutos)
function generarHorarios() {
    var horarios = [];
    var horaInicio = 9 * 60;
    var horaFin = 17 * 60 + 30;
    
    for (var minutos = horaInicio; minutos <= horaFin; minutos += 30) {
        var horas = Math.floor(minutos / 60);
        var mins = minutos % 60;
        var horaFormateada = (horas < 10 ? '0' + horas : horas) + ':' + (mins < 10 ? '0' + mins : mins);
        horarios.push(horaFormateada);
    }
    return horarios;
}

function encontrarBarberoDisponible(servicioId, fecha, horario) {
    var barberosParaServicio = barberos.filter(function(b) {
        return b.servicios.includes(servicioId);
    });
    
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
    return null;
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefono(telefono) {
    telefono = telefono.replace(/\s/g, '');
    return /^\d{8,9}$/.test(telefono);
}

function registrarReserva(reserva) {
    const barberoOcupado = reservas.some(r => 
        r.fecha === reserva.fecha && 
        r.horario === reserva.horario && 
        r.barberoId === reserva.barberoId
    );
    
    if (barberoOcupado) {
        throw new Error(`El barbero ${reserva.barbero} ya tiene una reserva a las ${reserva.horario}.<br> 
                       Por favor elija otro barbero u otro horario.`);
    }
    
    reservas.push(reserva);
    return reserva;
}

function obtenerServicioPorId(id) {
    return servicios.find(function(s) {
        return s.id === id;
    });
}

function obtenerBarberoPorId(id) {
    return barberos.find(function(b) {
        return b.id === id;
    });
}

function obtenerBarberosPorServicio(servicioId) {
    return barberos.filter(function(b) {
        return b.servicios.includes(servicioId);
    });
}

function obtenerReservasPorFecha(fecha) {
    return reservas
        .filter(r => r.fecha === fecha)
        .sort((a, b) => a.horario.localeCompare(b.horario));
}

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
  reservas: reservas,
  obtenerReservasPorFecha: obtenerReservasPorFecha,
  registrarReserva: registrarReserva,
  obtenerServicioPorId: obtenerServicioPorId,
  obtenerBarberoPorId: obtenerBarberoPorId,
  obtenerBarberosPorServicio: obtenerBarberosPorServicio,
  validarEmail: validarEmail,
  generarHorarios: generarHorarios,
  encontrarBarberoDisponible: encontrarBarberoDisponible
};
