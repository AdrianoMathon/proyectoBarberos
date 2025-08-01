

/*
misEventos();


function misEventos() {
    document.querySelector("#btnReservas").addEventListener("click", registrarReservaUI);

}



function registrarReservaUI() {

    let registroNombre = (document.querySelector("#txtNombre").value).trim();
    let registroServicio = (document.querySelector("#txtServicio").value).trim();
    let registroBarbero = (document.querySelector("#txtBarbero").value).trim();
    let registroTelefono = (document.querySelector("#txtTelefono").value).trim();
    let registroEmail = (document.querySelector("#txtEmail").value).trim();


    //let mensaje = miSistema.registrarUsuario(registroNombre, registroApellido, registroNombreUsu, registroClave, registroTarjeta, registroCvc)

    //document.querySelector("#pRegistroExitoso").innerHTML = mensaje;

}*/


/*
// Datos iniciales
const servicios = [
    { id: 1, nombre: "Corte de cabello", precio: 1500 },
    { id: 2, nombre: "Afeitado clásico", precio: 1200 },
    { id: 3, nombre: "Corte y barba", precio: 2500 },
    { id: 4, nombre: "Tinte para cabello", precio: 1800 },
    { id: 5, nombre: "Peinado especial", precio: 1000 }
];

const barberos = [
    { id: 1, nombre: "Juan Pérez", servicios: [1, 2, 3, 4, 5] },
    { id: 2, nombre: "Carlos Gómez", servicios: [1, 2, 3, 4, 5] },
    { id: 3, nombre: "Luis Rodríguez", servicios: [1, 2, 3, 4, 5] },
    { id: 4, nombre: "Miguel Martínez", servicios: [1, 2, 3, 4, 5] }
];

// Variables para almacenar reservas
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Función principal que carga los eventos
function misEventos() {
    // Configurar fecha mínima (hoy)
    const fechaInput = document.querySelector("#fecha");
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.min = hoy;
    
    // Cargar servicios en el select
    cargarServicios();
    
    // Evento para cambiar de servicio
    document.querySelector("#txtServicio").addEventListener("change", cargarBarberos);
    
    // Evento para el botón de reserva
    document.querySelector("#btnReservas").addEventListener("click", registrarReservaUI);
    
    // Mostrar reservas existentes (opcional)
    mostrarReservas();
}

// Cargar servicios en el select
function cargarServicios() {
    const selectServicio = document.querySelector("#txtServicio");
    
    servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = servicio.nombre;
        selectServicio.appendChild(option);
    });
}

// Cargar barberos según el servicio seleccionado
function cargarBarberos() {
    const servicioId = parseInt(document.querySelector("#txtServicio").value);
    const selectBarbero = document.querySelector("#txtBarbero");
    
    // Limpiar opciones anteriores (excepto la primera)
    while (selectBarbero.options.length > 1) {
        selectBarbero.remove(1);
    }
    
    if (!servicioId) return;
    
    barberos.forEach(barbero => {
        const option = document.createElement("option");
        option.value = barbero.id;
        option.textContent = barbero.nombre;
        selectBarbero.appendChild(option);
    });
}

// Registrar una nueva reserva
function registrarReservaUI() {
    // Obtener valores del formulario
    const fecha = document.querySelector("#fecha").value;
    const servicioId = parseInt(document.querySelector("#txtServicio").value);
    const barberoId = parseInt(document.querySelector("#txtBarbero").value);
    const nombre = document.querySelector("#txtNombre").value.trim();
    const telefono = document.querySelector("#txtTelefono").value.trim();
    const email = document.querySelector("#txtEmail").value.trim();
    
    // Validaciones básicas
    if (!fecha || !servicioId || !barberoId || !nombre || !telefono || !email) {
        alert("Por favor complete todos los campos");
        return;
    }
    
    if (!validarEmail(email)) {
        alert("Por favor ingrese un email válido");
        return;
    }
    
    // Buscar información del servicio y barbero
    const servicio = servicios.find(s => s.id === servicioId);
    const barbero = barberos.find(b => b.id === barberoId);
    
    // Crear objeto reserva
    const reserva = {
        id: Date.now(), // ID único basado en timestamp
        fecha,
        servicio: servicio.nombre,
        precio: servicio.precio,
        barbero: barbero.nombre,
        nombreCliente: nombre,
        telefono,
        email,
        fechaRegistro: new Date().toLocaleString()
    };
    
    // Agregar a la lista de reservas
    reservas.push(reserva);
    
    // Guardar en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    // Mostrar mensaje de éxito
    alert(`Reserva registrada con éxito para ${nombre} el ${fecha} con ${barbero.nombre}`);
    
    // Limpiar formulario
    document.querySelector("form").reset();
    
    // Actualizar lista de reservas (opcional)
    mostrarReservas();
}

// Validar formato de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar reservas (opcional - puedes crear una sección para esto)
function mostrarReservas() {
    // Esto es opcional, puedes crear una sección en tu HTML para mostrar las reservas
    console.log("Reservas actuales:", reservas);
}

// Llamar a la función principal cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", misEventos);
*/

// script.js
// Datos iniciales con duración de servicios
const servicios = [
    { id: 1, nombre: "Corte de cabello", precio: 1500, duracion: 30 },
    { id: 2, nombre: "Afeitado clásico", precio: 1200, duracion: 30 },
    { id: 3, nombre: "Corte y barba", precio: 2500, duracion: 60 },
    { id: 4, nombre: "Tinte para cabello", precio: 1800, duracion: 90 },
    { id: 5, nombre: "Peinado especial", precio: 1000, duracion: 30 }
];

const barberos = [
    { id: 1, nombre: "Juan Pérez", servicios: [1, 2, 3, 4, 5] },
    { id: 2, nombre: "Carlos Gómez", servicios: [1, 2, 3, 4, 5] },
    { id: 3, nombre: "Luis Rodríguez", servicios: [1, 2, 3, 4, 5] },
    { id: 4, nombre: "Miguel Martínez", servicios: [1, 2, 3, 4, 5] }
];

// Variables para almacenar reservas
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Generar horarios disponibles (9:00 a 17:30 cada 30 minutos)
function generarHorarios() {
    const horarios = [];
    const horaInicio = 9 * 60; // 9:00 en minutos
    const horaFin = 17 * 60 + 30; // 17:30 en minutos
    
    for (let minutos = horaInicio; minutos <= horaFin; minutos += 30) {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        const horaFormateada = `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        horarios.push(horaFormateada);
    }
    
    return horarios;
}

// Función principal que carga los eventos
function misEventos() {
    // Configurar fechas (hoy y máximo 4 semanas)
    const fechaInput = document.querySelector("#fecha");
    const hoy = new Date();
    const maxFecha = new Date();
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
    const selectServicio = document.querySelector("#txtServicio");
    
    servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = `${servicio.nombre} (${servicio.duracion} min) - $${servicio.precio}`;
        selectServicio.appendChild(option);
    });
}

// Cargar barberos según el servicio seleccionado
function cargarBarberos() {
    const servicioId = parseInt(document.querySelector("#txtServicio").value);
    const selectBarbero = document.querySelector("#txtBarbero");
    
    // Limpiar opciones anteriores (excepto la primera)
    while (selectBarbero.options.length > 1) {
        selectBarbero.remove(1);
    }
    
    if (!servicioId) return;
    
    // Agregar opción "Aleatorio"
    const optionAleatorio = document.createElement("option");
    optionAleatorio.value = "aleatorio";
    optionAleatorio.textContent = "Aleatorio (asignaremos el primer disponible)";
    selectBarbero.appendChild(optionAleatorio);
    
    // Agregar barberos que ofrecen este servicio
    barberos.forEach(barbero => {
        if (barbero.servicios.includes(servicioId)) {
            const option = document.createElement("option");
            option.value = barbero.id;
            option.textContent = barbero.nombre;
            selectBarbero.appendChild(option);
        }
    });
}

// Cargar horarios disponibles para la fecha seleccionada
function cargarHorariosDisponibles() {
    const fecha = document.querySelector("#fecha").value;
    const horarioSelect = document.querySelector("#txtHorario");
    
    if (!fecha) return;
    
    // Limpiar horarios anteriores (excepto la primera opción)
    while (horarioSelect.options.length > 1) {
        horarioSelect.remove(1);
    }
    
    // Generar todos los horarios posibles
    const todosHorarios = generarHorarios();
    
    // Obtener reservas para esta fecha
    const reservasFecha = reservas.filter(r => r.fecha === fecha);
    
    // Filtrar horarios ocupados
    const horariosOcupados = reservasFecha.map(r => r.horario);
    
    // Agregar horarios disponibles al select
    todosHorarios.forEach(horario => {
        if (!horariosOcupados.includes(horario)) {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        }
    });
    
    // Si no hay horarios disponibles
    if (horarioSelect.options.length === 1) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay horarios disponibles para esta fecha";
        horarioSelect.appendChild(option);
    }
}

// Encontrar barbero disponible para un horario específico
function encontrarBarberoDisponible(servicioId, fecha, horario) {
    // Obtener todos los barberos que ofrecen este servicio
    const barberosParaServicio = barberos.filter(b => b.servicios.includes(servicioId));
    
    // Buscar el primer barbero que no tenga reserva en ese horario
    for (const barbero of barberosParaServicio) {
        const tieneReserva = reservas.some(r => 
            r.fecha === fecha && 
            r.horario === horario && 
            r.barberoId === barbero.id
        );
        
        if (!tieneReserva) {
            return barbero;
        }
    }
    
    return null; // No hay barberos disponibles
}

// Registrar una nueva reserva
function registrarReservaUI() {
    // Obtener valores del formulario
    const fecha = document.querySelector("#fecha").value;
    const horario = document.querySelector("#txtHorario").value;
    const servicioId = parseInt(document.querySelector("#txtServicio").value);
    const barberoIdOrAleatorio = document.querySelector("#txtBarbero").value;
    const nombre = document.querySelector("#txtNombre").value.trim();
    const telefono = document.querySelector("#txtTelefono").value.trim();
    const email = document.querySelector("#txtEmail").value.trim();
    
    // Validaciones básicas
    if (!fecha || !horario || !servicioId || !barberoIdOrAleatorio || !nombre || !telefono || !email) {
        alert("Por favor complete todos los campos");
        return;
    }
    
    if (!validarEmail(email)) {
        alert("Por favor ingrese un email válido");
        return;
    }
    
    // Verificar si el horario aún está disponible
    const horarioOcupado = reservas.some(r => r.fecha === fecha && r.horario === horario);
    if (horarioOcupado) {
        alert("Este horario ya no está disponible. Por favor seleccione otro.");
        return;
    }
    
    // Buscar información del servicio
    const servicio = servicios.find(s => s.id === servicioId);
    
    // Manejar selección de barbero (aleatorio o específico)
    let barbero;
    if (barberoIdOrAleatorio === "aleatorio") {
        barbero = encontrarBarberoDisponible(servicioId, fecha, horario);
        if (!barbero) {
            alert("Lo sentimos, no hay barberos disponibles para este horario. Por favor seleccione otro horario.");
            return;
        }
    } else {
        barbero = barberos.find(b => b.id === parseInt(barberoIdOrAleatorio));
        
        // Verificar si el barbero seleccionado está disponible
        const barberoOcupado = reservas.some(r => 
            r.fecha === fecha && 
            r.horario === horario && 
            r.barberoId === barbero.id
        );
        
        if (barberoOcupado) {
            alert(`El barbero ${barbero.nombre} no está disponible para este horario.`);
            return;
        }
    }
    
    // Crear objeto reserva
    const reserva = {
        id: Date.now(), // ID único basado en timestamp
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
    
    // Agregar a la lista de reservas
    reservas.push(reserva);
    
    // Guardar en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    // Mostrar mensaje de éxito
    alert(`✅ Reserva registrada con éxito para ${nombre}\n📅 Fecha: ${fecha}\n⏰ Hora: ${horario}\n💈 Barbero: ${barbero.nombre}\n✂️ Servicio: ${servicio.nombre}`);
    
    // Limpiar formulario
    document.querySelector(".contenedor-form-reservas").reset();
    
    // Recargar horarios disponibles
    cargarHorariosDisponibles();
}

// Validar formato de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Llamar a la función principal cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", misEventos);