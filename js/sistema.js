class Sistema {
    constructor() {
        this.usuariosCompradores = [];
        this.usuariosAdministradores = [];
        this.listaProductos = [];
        this.listaCompras = [];
        this.usuarioLogueado = null;
    }



registrarUsuario(registroNombre, registroApellido, registroNombreUsu, registroClave, registroTarjeta, registroCvc) {

        let existeNombre = this.validarNombre(this.usuariosCompradores, registroNombreUsu);
        let claveOk = this.validarClave(registroClave);
        let tarjetaOk = this.validarTarjeta(registroTarjeta);
        let cvcOk = this.validarCVC(registroCvc);

        let mensaje = "";

        if (registroNombre.length > 0 && registroApellido.length > 0 && registroNombreUsu.length > 0 && registroClave.length > 0 && registroTarjeta.length > 0 && registroCvc.length > 0) {

            if (!existeNombre && claveOk && tarjetaOk && cvcOk) {
                let usuarioNuevo = new Usuario(registroNombre, registroApellido, registroNombreUsu, registroClave, registroTarjeta, registroCvc)
                this.usuariosCompradores.push(usuarioNuevo)
                mensaje += "El usuario se registró correctamente";
            }

            if (existeNombre) {
                mensaje += "Nombre de usuario ya existe.<br>"
            }
            if (claveOk === false) {
                mensaje += "Contraseña no válida. Debe contener al menos 5 caracteres, una mayúscula, una minúscula y un número."
            }
            if (tarjetaOk === false || cvcOk === false) {
                mensaje += "<br>Debe ingresar una tarjeta válida."
            }

        } else {
            mensaje += "Debe completar todos los campos."
        }

        return mensaje;
    }

     }