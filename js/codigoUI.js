// Función principal que carga los eventos
function misEventos() {
    // Configurar fechas (hoy y máximo 4 semanas)
    var fechaInput = document.querySelector("#fecha");
    var hoy = new Date();
    var maxFecha = new Date();
    maxFecha.setDate(hoy.getDate() + 28); // 4 semanas = 28 días
    
    fechaInput.min = hoy.toISOString().split('T')[0];
    fechaInput.max = maxFecha.toISOString().split('T')[0];
    
    // Cargar servicios en el select
    cargarServicios();
    
    // Evento para cambiar de servicio
    document.querySelector("#txtServicio").addEventListener("change", cargarBarberos);
    
    // Evento para el botón de reserva
    document.querySelector("#btnReservas").addEventListener("click", registrarReservaUI);
    
    // Cargar horarios cuando se selecciona fecha
    document.querySelector("#fecha").addEventListener("change", cargarHorariosDisponibles);
}

// Cargar servicios en el select
function cargarServicios() {
    var selectServicio = document.querySelector("#txtServicio");
    
    servicios.forEach(function(servicio) {
        var option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = servicio.nombre + " (" + servicio.duracion + " min) - $" + servicio.precio;
        selectServicio.appendChild(option);
    });
}

// Cargar barberos según el servicio seleccionado
function cargarBarberos() {
    var servicioId = parseInt(document.querySelector("#txtServicio").value);
    var selectBarbero = document.querySelector("#txtBarbero");
    
    // Limpiar opciones anteriores (excepto la primera)
    while (selectBarbero.options.length > 1) {
        selectBarbero.remove(1);
    }
    
    if (!servicioId) return;
    
    // Agregar opción "Aleatorio"
    var optionAleatorio = document.createElement("option");
    optionAleatorio.value = "aleatorio";
    optionAleatorio.textContent = "Aleatorio (asignaremos el primer disponible)";
    selectBarbero.appendChild(optionAleatorio);
    
    // Agregar barberos que ofrecen este servicio
    var barberosDisponibles = obtenerBarberosPorServicio(servicioId);
    
    barberosDisponibles.forEach(function(barbero) {
        var option = document.createElement("option");
        option.value = barbero.id;
        option.textContent = barbero.nombre;
        selectBarbero.appendChild(option);
    });
}

// Cargar horarios disponibles para la fecha seleccionada
function cargarHorariosDisponibles() {
    var fecha = document.querySelector("#fecha").value;
    var horarioSelect = document.querySelector("#txtHorario");
    
    if (!fecha) return;
    
    // Limpiar horarios anteriores (excepto la primera opción)
    while (horarioSelect.options.length > 1) {
        horarioSelect.remove(1);
    }
    
    // Generar todos los horarios posibles
    var todosHorarios = generarHorarios();
    
    // Obtener reservas para esta fecha
    var reservasFecha = obtenerReservasPorFecha(fecha);
    
    // Filtrar horarios ocupados
    var horariosOcupados = reservasFecha.map(function(r) {
        return r.horario;
    });
    
    // Agregar horarios disponibles al select
    todosHorarios.forEach(function(horario) {
        if (!horariosOcupados.includes(horario)) {
            var option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        }
    });
    
    // Si no hay horarios disponibles
    if (horarioSelect.options.length === 1) {
        var option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay horarios disponibles para esta fecha";
        horarioSelect.appendChild(option);
    }
}

// Registrar una nueva reserva desde la UI
function registrarReservaUI() {
    // Obtener valores del formulario
    var fecha = document.querySelector("#fecha").value;
    var horario = document.querySelector("#txtHorario").value;
    var servicioId = parseInt(document.querySelector("#txtServicio").value);
    var barberoIdOrAleatorio = document.querySelector("#txtBarbero").value;
    var nombre = document.querySelector("#txtNombre").value.trim();
    var telefono = document.querySelector("#txtTelefono").value.trim();
    var email = document.querySelector("#txtEmail").value.trim();
    
    // Validaciones básicas
    if (!fecha || !horario || !servicioId || !barberoIdOrAleatorio || !nombre || !telefono || !email) {
        alert("Por favor complete todos los campos");
        return;
    }
    
    if (!validarEmail(email)) {
        alert("Por favor ingrese un email válido");
        return;
    }
    
    // Buscar información del servicio
    var servicio = obtenerServicioPorId(servicioId);
    
    // Manejar selección de barbero (aleatorio o específico)
    var barbero;
    if (barberoIdOrAleatorio === "aleatorio") {
        barbero = encontrarBarberoDisponible(servicioId, fecha, horario);
        if (!barbero) {
            alert("Lo sentimos, no hay barberos disponibles para este horario. Por favor seleccione otro horario.");
            return;
        }
    } else {
        barbero = obtenerBarberoPorId(parseInt(barberoIdOrAleatorio));
        
        // Verificar si el barbero seleccionado está disponible
        var barberoOcupado = reservas.some(function(r) {
            return r.fecha === fecha && 
                   r.horario === horario && 
                   r.barberoId === barbero.id;
        });
        
        if (barberoOcupado) {
            alert("El barbero " + barbero.nombre + " no está disponible para este horario.");
            return;
        }
    }
    
    // Crear objeto reserva
    var reserva = {
        id: Date.now(), // ID único basado en timestamp
        fecha: fecha,
        horario: horario,
        servicio: servicio.nombre,
        servicioId: servicio.id,
        precio: servicio.precio,
        barbero: barbero.nombre,
        barberoId: barbero.id,
        nombreCliente: nombre,
        telefono: telefono,
        email: email,
        fechaRegistro: new Date().toLocaleString()
    };
    
    try {
        // Registrar la reserva
        registrarReserva(reserva);
        
        // Mostrar mensaje de éxito
        alert(
            "✅ Reserva registrada con éxito para " + nombre + "\n" +
            "📅 Fecha: " + fecha + "\n" +
            "⏰ Hora: " + horario + "\n" +
            "💈 Barbero: " + barbero.nombre + "\n" +
            "✂️ Servicio: " + servicio.nombre
        );
        
        // Limpiar formulario
        //document.querySelector(".contenedor-form-reservas").reset();
        
        // Recargar horarios disponibles
        cargarHorariosDisponibles();
    } catch (error) {
        alert(error.message);
    }
}

// Llamar a la función principal cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", misEventos);