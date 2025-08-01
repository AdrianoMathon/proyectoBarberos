

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