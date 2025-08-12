// Función principal que carga los eventos
function misEventos() {
        // Configurar fechas (mañana como mínimo y máximo 4 semanas)
    var fechaInput = document.querySelector("#fecha");
    var hoy = new Date();
    var manana = new Date();
    manana.setDate(hoy.getDate() + 1); // Día mínimo será mañana
    var maxFecha = new Date();
    maxFecha.setDate(hoy.getDate() + 28); // 4 semanas = 28 días
    
    fechaInput.min = manana.toISOString().split('T')[0]; // Establecer mínimo como mañana
    fechaInput.max = maxFecha.toISOString().split('T')[0];
    
    // Deshabilitar sábados, domingos y el día actual
    fechaInput.addEventListener("change", function() {
        var selectedDate = new Date(this.value);
        var dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 6 = Sábado
        var selectedDay = selectedDate.getDate();
        var selectedMonth = selectedDate.getMonth();
        var selectedYear = selectedDate.getFullYear();
        
        // Comprobar si es fin de semana
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            this.value = ""; // Limpiar la selección si es fin de semana
            mostrarMensaje("No se pueden realizar reservas los sábados y domingos", "error");
        }
        // Comprobar si es el día actual (aunque el input no debería permitirlo)
        else if (selectedDay === hoy.getDate() && 
                 selectedMonth === hoy.getMonth() && 
                 selectedYear === hoy.getFullYear()) {
            this.value = ""; // Limpiar la selección si es hoy
            mostrarMensaje("No se pueden realizar reservas para el día actual", "error");
        }
    });
    
    // Cargar servicios en el select
    cargarServicios();
    
    // Evento para cambiar de servicio
    document.querySelector("#txtServicio").addEventListener("change", cargarBarberos);
    
    // Evento para el botón de reserva
    document.querySelector("#btnReservas").addEventListener("click", registrarReservaUI);
    
    // Cargar horarios cuando se selecciona fecha
    document.querySelector("#fecha").addEventListener("change", cargarHorariosDisponibles);

    document.querySelector("#txtBarbero").addEventListener("change", cargarHorariosDisponibles);
}

// Cargar servicios en el select
function cargarServicios() {
    var selectServicio = document.querySelector("#txtServicio");
    
    servicios.forEach(function(servicio) {
        var option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = servicio.nombre /*+ " (" + servicio.duracion + " min) - $" + servicio.precio;*/
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
    var barberoId = document.querySelector("#txtBarbero").value;
    
    if (!fecha) return;
    
    // Limpiar horarios anteriores (excepto la primera opción)
    while (horarioSelect.options.length > 1) {
        horarioSelect.remove(1);
    }
    
    // Generar todos los horarios posibles
    var todosHorarios = generarHorarios();
    
    // Obtener reservas para esta fecha
    var reservasFecha = obtenerReservasPorFecha(fecha);
    
    // Agregar todos los horarios al select, marcando los ocupados
    todosHorarios.forEach(function(horario) {
        var option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;
        
        // Verificar si el horario está ocupado para el barbero seleccionado
        if (barberoId && barberoId !== "aleatorio") {
            var estaOcupado = reservasFecha.some(function(r) { 
                return r.horario === horario && r.barberoId === parseInt(barberoId);
            });
            
            if (estaOcupado) {
                option.disabled = true;
                option.textContent += " (No disponible con este barbero)";
            }
        }
        
        horarioSelect.appendChild(option);
    });
    
    // Si no hay horarios disponibles (todos están deshabilitados)
    var hayDisponibles = Array.from(horarioSelect.options).some(opt => !opt.disabled);
    if (!hayDisponibles && horarioSelect.options.length > 1) {
        var option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay horarios disponibles para esta fecha";
        horarioSelect.appendChild(option);
    }
}


// Registrar una nueva reserva desde la UI
function registrarReservaUI() {
    // Obtener valores del formulario
    const fecha = document.querySelector("#fecha").value;
    const horario = document.querySelector("#txtHorario").value;
    const servicioId = parseInt(document.querySelector("#txtServicio").value);
    const barberoId = document.querySelector("#txtBarbero").value;
    const nombre = document.querySelector("#txtNombre").value.trim();
    const telefono = document.querySelector("#txtTelefono").value.trim();
    const email = document.querySelector("#txtEmail").value.trim();

    // Validaciones básicas
    if (!fecha || !horario || !servicioId || !barberoId || !nombre || !telefono || !email) {
        mostrarMensaje("Por favor complete todos los campos", "error");
        return;
    }

    // Validar teléfono
    if (!validarTelefono(telefono)) {
        mostrarMensaje("El teléfono debe contener solo números y tener al menos 8 dígitos", "error");
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensaje("Por favor ingrese un email válido", "error");
        return;
    }

    // Obtener datos del servicio y barbero
    const servicio = obtenerServicioPorId(servicioId);
    const barbero = barberoId === "aleatorio" 
        ? encontrarBarberoDisponible(servicioId, fecha, horario)
        : obtenerBarberoPorId(parseInt(barberoId));

    if (!barbero) {
        mostrarMensaje("No hay barberos disponibles para este horario", "error");
        return;
    }

    // Crear objeto reserva
    const reserva = {
        id: Date.now(),
        fecha,
        horario,
        servicio: servicio.nombre,
        servicioId: servicio.id,
        precio: servicio.precio,
        barbero: barbero.nombre,
        barberoId: barbero.id,
        nombreCliente: nombre,
        telefono,
        email,
        fechaRegistro: new Date().toLocaleString()
    };

    try {
        registrarReserva(reserva);
        mostrarMensaje(
            `<b>Reserva exitosa:</b><br><br>
            📅 ${fecha} a las ${horario}<br>
            💈 ${barbero.nombre}<br>
            ✂️ ${servicio.nombre}`,
            "success"
        );
    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}


function mostrarMensaje(mensaje, tipo) {
    let mensajeDiv = document.getElementById('mensaje-flotante');
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje-flotante';
        document.body.appendChild(mensajeDiv);
    }

    mensajeDiv.innerHTML = mensaje;

    mensajeDiv.classList.remove('success', 'error');  
    mensajeDiv.classList.add(tipo);                   

    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 8000);
}



// Llamar a la función principal cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", misEventos);