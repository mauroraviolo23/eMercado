//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const usuarioContraseña = [];
const soloNombreUsuario = [];

const guardarUsuario = () => {
  const tbody = document.getElementById("info");
  const nombreUsuario = document.getElementById("nombreUsuario");
  const passwordUsuario = document.getElementById("passwordUsuario");
  const nombre = nombreUsuario.value;
  const password = passwordUsuario.value;
  if (nombre && password) {
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
  else {
    alert("Ingrese los datos correctamente");
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