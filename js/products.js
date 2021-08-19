//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
fetch(PRODUCTS_URL)
	.then(respuesta=>respuesta.json())
	.then(productos=> {
		document.getElementById('chevroletOnix').innerHTML = `<p class="tituloAuto">Auto: ${productos[0].name}<p>
		<p>Descripción: ${productos[0].description}<p>
		<p>U$S ${productos[0].cost}<p>
        <img src="${productos[0].imgSrc}">`;
        document.getElementById('fiatWay').innerHTML = `<p class="tituloAuto">Auto: ${productos[1].name}<p>
		<p>Descripción: ${productos[1].description}<p>
		<p>U$S ${productos[1].cost}<p>
        <img src="${productos[1].imgSrc}">`;
        document.getElementById('suzukiCelerio').innerHTML = `<p class="tituloAuto">Auto: ${productos[2].name}<p>
		<p>Descripción: ${productos[2].description}<p>
		<p>U$S ${productos[2].cost}<p>
        <img src="${productos[2].imgSrc}">`;
        document.getElementById('peugeot208').innerHTML = `<p class="tituloAuto">Auto: ${productos[3].name}<p>
		<p>Descripción: ${productos[3].description}<p>
		<p>U$S ${productos[3].cost}<p>
        <img src="${productos[3].imgSrc}">`;
            })
            .catch( error => alert("Hubo un error: " + error));
});