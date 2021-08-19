//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const usuarioContraseña = [];

const guardarUsuario = () => {
  const tbody = document.getElementById("info");
  const mailUsuario = document.getElementById("mailUsuario");
  const passwordUsuario = document.getElementById("passwordUsuario");
  const mail = mailUsuario.value;
  const password = passwordUsuario.value;
  if (mail && password) {
    mailUsuario.value = "";
    passwordUsuario.value = "";
    usuarioContraseña.push({
      mail,
      password,
    })
    localStorage.setItem("datosUsuario", JSON.stringify(usuarioContraseña));;
    window.location = "index.html";
  } else {
    alert("Ingrese los datos correctamente");
  }
};


document.addEventListener("DOMContentLoaded", function(e){
	document.getElementById("btnLogin").addEventListener("click", guardarUsuario);
  	// document.getElementById("btnLogin").addEventListener("click", "OTRA FUNCIÓN");
});