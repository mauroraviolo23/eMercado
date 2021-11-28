// Función que trae los datos del local storage y los muestra en el documento HTML

const showMyData = () => {
    document.getElementById("misDatos-NombreUsuario").innerHTML = JSON.parse(localStorage.getItem("soloNombreUsuario"));
    document.getElementById("misDatos-NombresApellidos").innerHTML = JSON.parse(localStorage.getItem("miNombre"));
    document.getElementById("misDatos-Edad").innerHTML = JSON.parse(localStorage.getItem("miEdad"));
    document.getElementById("misDatos-Email").innerHTML = JSON.parse(localStorage.getItem("miEmail"));
    document.getElementById("misDatos-TelefonoContacto").innerHTML = JSON.parse(localStorage.getItem("miTelefono"));
}


// Función que sirve para actualizar los datos personales del usuario

const editMyData = (element) => {
    if (element.id == "misDatos-editarNombre") {
        document.getElementById('editarMisDatos-editarNombre').className = "d-flex flex-column bg-dark text-white rounded m-1 edicionMisDatos";

        document.getElementById('editarMisDatos-editarEdad').className = "invisible";
        document.getElementById('editarMisDatos-editarEmail').className = "invisible";
        document.getElementById('editarMisDatos-editarTelefonoContacto').className = "invisible";

        document.getElementById('edad').value = "";
        document.getElementById('email').value = "";
        document.getElementById('telefonoContacto').value = "";
    }
    else if (element.id == "misDatos-editarEdad") {
        document.getElementById('editarMisDatos-editarEdad').className = "d-flex flex-column bg-dark text-white rounded m-1 edicionMisDatos";

        document.getElementById('editarMisDatos-editarNombre').className = "invisible";
        document.getElementById('editarMisDatos-editarEmail').className = "invisible";
        document.getElementById('editarMisDatos-editarTelefonoContacto').className = "invisible";

        document.getElementById('nombre').value = "";
        document.getElementById('email').value = "";
        document.getElementById('telefonoContacto').value = "";
    }
    else if (element.id == "misDatos-editarEmail") {
        document.getElementById('editarMisDatos-editarEmail').className = "d-flex flex-column bg-dark text-white rounded m-1 edicionMisDatos";

        document.getElementById('editarMisDatos-editarNombre').className = "invisible";
        document.getElementById('editarMisDatos-editarEdad').className = "invisible";
        document.getElementById('editarMisDatos-editarTelefonoContacto').className = "invisible";

        document.getElementById('nombre').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('telefonoContacto').value = "";
    }
    else if (element.id == "misDatos-editarTelefonoContacto") {
        document.getElementById('editarMisDatos-editarTelefonoContacto').className = "d-flex flex-column bg-dark text-white rounded m-1 edicionMisDatos";

        document.getElementById('editarMisDatos-editarNombre').className = "invisible";
        document.getElementById('editarMisDatos-editarEdad').className = "invisible";
        document.getElementById('editarMisDatos-editarEmail').className = "invisible";

        document.getElementById('nombre').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('email').value = "";
    }
}

let miNombre = [];
let miEdad = [];
let miEmail = [];
let miTelefono = [];

// Función que actualiza los datos del usuario 

const saveMyData = (element) => {
    if (element.id == "editarMisDatos-GuardarNombre") {
        if (document.getElementById('nombre').value) {
            miNombre.push(document.getElementById('nombre').value)
            localStorage.setItem("miNombre", JSON.stringify(miNombre));
            swal({
                title: '¡Nombre y Apellido guardados correctamente!',
                icon: 'success',
                button: 'Entendido'
            })
            document.getElementById('editarMisDatos-editarNombre').className = "invisible";
            document.getElementById('misDatos-NombresApellidos').innerHTML = document.getElementById('nombre').value;
            document.getElementById('nombre').value = "";
        }
        else {
            swal({
                title: 'Por favor, ingresa un Nombre y Apellido',
                icon: 'warning',
                button: 'Entendido'
            })
        }
    }
    else if (element.id == "editarMisDatos-GuardarEdad") {
        if (document.getElementById('edad').value) {
            miEdad.push(document.getElementById('edad').value)
            localStorage.setItem("miEdad", JSON.stringify(miEdad));
            swal({
                title: '¡Edad guardada correctamente!',
                icon: 'success',
                button: 'Entendido'
            })
            document.getElementById('editarMisDatos-editarEdad').className = "invisible";
            document.getElementById('misDatos-Edad').innerHTML = document.getElementById('edad').value;
            document.getElementById('edad').value = "";
        }
        else {
            swal({
                title: 'Por favor, ingresa tu edad',
                icon: 'warning',
                button: 'Entendido'
            })
        }
    }
    else if (element.id == "editarMisDatos-GuardarEmail") {

        let emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRegEx.test(document.getElementById('email').value)) {
            miEmail.push(document.getElementById('email').value)
            localStorage.setItem("miEmail", JSON.stringify(miEmail));
            swal({
                title: '¡Email guardado correctamente!',
                icon: 'success',
                button: 'Entendido'
            })
            document.getElementById('editarMisDatos-editarEmail').className = "invisible";
            document.getElementById('misDatos-Email').innerHTML = document.getElementById('email').value;
            document.getElementById('email').value = "";
        }
        else {
            swal({
                title: 'Por favor, ingresa un Email válido',
                icon: 'warning',
                button: 'Entendido'
            })
        }
    }
    else if (element.id == "editarMisDatos-GuardarTelefonoContacto") {
        if (document.getElementById('telefonoContacto').value) {
            miTelefono.push(document.getElementById('telefonoContacto').value)
            localStorage.setItem("miTelefono", JSON.stringify(miTelefono));
            swal({
                title: '¡Teléfono guardado correctamente!',
                icon: 'success',
                button: 'Entendido'
            })
            document.getElementById('editarMisDatos-editarTelefonoContacto').className = "invisible";
            document.getElementById('misDatos-TelefonoContacto').innerHTML = document.getElementById('telefonoContacto').value;
            document.getElementById('telefonoContacto').value = "";
        }
        else {
            swal({
                title: 'Por favor, ingresa un Teléfono válido',
                icon: 'warning',
                button: 'Entendido'
            })
        }
    }
}

// Función que cancela el envío de los datos personales

const cancelSaveData = (block, input) => {
    document.getElementById(block).className = "invisible";
    document.getElementById(input).value = "";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showMyData();
});

document.getElementById("misDatos-editarNombre").addEventListener("click", function (event) {
    editMyData(this);
})

document.getElementById("misDatos-editarEdad").addEventListener("click", function (event) {
    editMyData(this);
})

document.getElementById("misDatos-editarEmail").addEventListener("click", function (event) {
    editMyData(this);
})

document.getElementById("misDatos-editarTelefonoContacto").addEventListener("click", function (event) {
    editMyData(this);
})

document.getElementById("editarMisDatos-CancelarNombre").addEventListener("click", function (event) {
    cancelSaveData("editarMisDatos-editarNombre", "nombre");
});

document.getElementById("editarMisDatos-CancelarEdad").addEventListener("click", function (event) {
    cancelSaveData("editarMisDatos-editarEdad", "edad");
});

document.getElementById("editarMisDatos-CancelarEmail").addEventListener("click", function (event) {
    cancelSaveData("editarMisDatos-editarEmail", "email");
});

document.getElementById("editarMisDatos-CancelarTelefonoContacto").addEventListener("click", function (event) {
    cancelSaveData("editarMisDatos-editarTelefonoContacto", "telefonoContacto");
});

document.getElementById("editarMisDatos-GuardarNombre").addEventListener("click", function (event) {
    saveMyData(this);
});

document.getElementById("editarMisDatos-GuardarEdad").addEventListener("click", function (event) {
    saveMyData(this);
});

document.getElementById("editarMisDatos-GuardarEmail").addEventListener("click", function (event) {
    saveMyData(this);
});

document.getElementById("editarMisDatos-GuardarTelefonoContacto").addEventListener("click", function (event) {
    saveMyData(this);
});