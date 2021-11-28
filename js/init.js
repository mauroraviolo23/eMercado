const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Función que muestra el nombre de usuario en el documento HTML

const mostrarUsuario = () => {
  document.getElementById("mostrarUsuario").innerHTML = `<i class="fas fa-user mr-2"></i>`+ (JSON.parse(localStorage.getItem("soloNombreUsuario")))  + ` `;
};


// Función que sirve para borrar los datos del usuario y redirigir al login

const borrarUsuario = () => {
  localStorage.clear();
  window.location = "login.html";
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if (JSON.parse(localStorage.getItem("datosUsuario")) == null) { 
    window.location = "login.html" }
  else {
    mostrarUsuario();
  }
});

document.getElementById("cerrarSesion").addEventListener("click", function(e) {
  swal({
    title: 'Se ha cerrado la sesión',
    text: 'Gracias por visitar eMercado. Serás redirigido a la pantalla de registro.',
    button: {
      text: "Entendido",
      value: true,
      visible: true,
      className: "confirmButtonSwal",
      closeModal: true
    }
  }).then(function() {
    borrarUsuario();
});
})