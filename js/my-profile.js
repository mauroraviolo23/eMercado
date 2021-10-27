
let misDatos = [];

const mostrarMisDatos = () => {
    document.getElementById("misDatos-NombreUsuario").innerHTML = JSON.parse(localStorage.getItem("soloNombreUsuario"));
    document.getElementById("misDatos-NombresApellidos").innerHTML = (JSON.parse(localStorage.getItem("misDatos")))[0]['nombre'];
    document.getElementById("misDatos-Edad").innerHTML = (JSON.parse(localStorage.getItem("misDatos")))[0]['edad'];
    document.getElementById("misDatos-Email").innerHTML = (JSON.parse(localStorage.getItem("misDatos")))[0]['email'];
    document.getElementById("misDatos-TelefonoContacto").innerHTML = (JSON.parse(localStorage.getItem("misDatos")))[0]['telefono'];
}

const editProfile = id => {
    if (document.getElementById(id).className != "invisible")
        document.getElementById(id).className = "invisible";
    else {
        document.getElementById(id).className = "profile-container-form profile-container-border";
    }
}


const guardarMisDatos = () => {
    const nombresApellidos = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const email = document.getElementById("email");
    const telefonoContacto = document.getElementById("telefono");

    const nombresApellidosValue = nombresApellidos.value
    const edadValue = edad.value
    const emailValue = email.value
    const telefonoContactoValue = telefonoContacto.value

    if (nombresApellidosValue && edadValue && emailValue.includes("@") && emailValue.includes(".") && telefonoContactoValue.length >= 8) {
        misDatos.push({
            nombre: nombresApellidosValue,
            edad: edadValue,
            email: emailValue,
            telefono: telefonoContactoValue,
        })
        localStorage.setItem("misDatos", JSON.stringify(misDatos));
        document.getElementById("bloqueEditarPerfil").className = "invisible";

        document.getElementById("misDatos-NombresApellidos").innerHTML = nombresApellidosValue;
        document.getElementById("misDatos-Edad").innerHTML = edadValue;
        document.getElementById("misDatos-Email").innerHTML = emailValue;
        document.getElementById("misDatos-TelefonoContacto").innerHTML = telefonoContactoValue;

        nombresApellidos.value = "";
        edad.value = "";
        email.value = "";
        telefonoContacto.value = "";

        alert("Tu perfil ha sido actualizado con éxito.")
    }
    else if (!nombresApellidosValue) {
        alert("Por favor, completa el campo de Nombres y Apellidos.")
    }
    else if (!edadValue) {
        alert("Por favor, completa el campo de Edad.")
    }
    else if (!emailValue || !emailValue.includes("@") || !emailValue.includes(".")) {
        alert("Por favor, completa el campo de E-mail con su formato correspondiente.")
    }
    else if (parseInt(telefonoContactoValue.length) < 8) {
        alert("Por favor, completa el campo de Teléfono de Contacto con un número válido de al menos 8 dígitos.")
    }
}

const cancelarGuardarMisDatos = () => {
    document.getElementById("bloqueEditarPerfil").className = "invisible";
    document.getElementById("nombre").innerHTML = "";
    document.getElementById("edad").innerHTML = "";
    document.getElementById("email").innerHTML = "";
    document.getElementById("telefono").innerHTML = "";
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarMisDatos();
    obtenerMisDatos();
});

document.getElementById("editarPerfil").addEventListener("click", function (e) {
    editProfile("bloqueEditarPerfil");
});

document.getElementById("aceptar").addEventListener("click", function (event) {
    event.preventDefault();
    guardarMisDatos();
})

document.getElementById("cancelar").addEventListener("click", function(e) {
    cancelarGuardarMisDatos();
})