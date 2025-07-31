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

}