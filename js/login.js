//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let usuarioContraseña = [];
let soloNombreUsuario = [];
let passwordRegex = /^(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;

// Función que sirve para guardar el usuario y entrar al sitio

const guardarUsuario = () => {
  const nombreUsuario = document.getElementById("nombreUsuario");
  const passwordUsuario = document.getElementById("passwordUsuario");
  const nombre = nombreUsuario.value;
  const password = passwordUsuario.value;
  if (!nombre) {
    swal({
      icon: 'info',
      title: 'Ingresa un nombre de usuario',
      text: 'No has ingresado un nombre de usuario',
      button: {
        text: "Entendido",
        value: true,
        visible: true,
        className: "confirmButtonSwal",
        closeModal: true
      }
    })
  }
  else if(!password) {
    swal({
      icon: 'info',
      title: 'Ingresa una contraseña',
      text: 'No has ingresado una contraseña',
      button: {
        text: "Entendido",
        value: true,
        visible: true,
        className: "confirmButtonSwal",
        closeModal: true
      }
    })
  }
  else if (!(passwordRegex.test(password))){
    swal({
      icon: 'warning',
      title: 'La contraseña elegida no cumple con los requisitos',
      text: 'Tu contraseña debe contar con al menos 8 caracteres, entre ellos por lo menos una mayúscula, una minúscula y un número.',
      button: {
        text: "Entendido",
        value: true,
        visible: true,
        className: "confirmButtonSwal",
        closeModal: true
      }
    });
  }
  else  if (nombre && password) {
    nombreUsuario.value = "";
    passwordUsuario.value = "";
    usuarioContraseña.push({
      nombre,
      password,
    })
    soloNombreUsuario.push(nombre)
    localStorage.setItem("datosUsuario", JSON.stringify(usuarioContraseña));
    localStorage.setItem("soloNombreUsuario", JSON.stringify(soloNombreUsuario))
    window.location = "index.html";
    }
};


document.addEventListener("DOMContentLoaded", function(e){
	document.getElementById("btnLogin").addEventListener("click", guardarUsuario);
  document.getElementById("nombreUsuario").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      guardarUsuario();
    }
});
  document.getElementById("passwordUsuario").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      guardarUsuario();
    }
});
});