const DOUBLE_CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let subtotalPriceUYU = 0;
let subtotalPriceUSD = 0;
let shippingCostUYU = 0;
let shippingCostUSD = 0;

let articleCounter = 0;

chargeCartInfo = (url) => {
    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(cartContentInfo => {
        let article = cartContentInfo.articles;
        for(let i = 0; i < article.length; i++){ 
            document.getElementById("articlesTable").innerHTML += `
            <tr id='productBlock`+ [i+1] +`'>
                <td><img class="small-img rounded" src="` + article[i].src + `"></td>
                <td>` + article[i].name + `</td>
                `//las siguientes líneas de código son para el bloque de Cantidad 
                + `
                <td><i onclick="quantAndPriceChanger(this,'productCount`+ [i+1] +`','productTotalCostUYU`+ [i+1] +`','productTotalCostUSD`+ [i+1] +`',` + article[i].unitCost + `,'` + article[i].currency + `')" class="fas fa-plus-circle mr-1 clickable"></i>
                <span class="font-weight-bold" id='productCount`+ [i+1] +`'>` + article[i].count + `</span>
                <i onclick="quantAndPriceChanger(this,'productCount`+ [i+1] +`','productTotalCostUYU`+ [i+1] +`','productTotalCostUSD`+ [i+1] +`',` + article[i].unitCost + `,'` + article[i].currency +`')" class="fas fa-minus-circle ml-1 clickable"></i></td>
                `//finaliza bloque de Cantidad
                + `
                <td><table><tr><td><small class="text-muted">UYU</small></td><td><small class="text-muted">USD</small></td></tr><tr><td id='productPriceUYU`+ [i+1] +`'>` + priceCurrencyUYU(article[i].currency, article[i].unitCost) + `</td><td id='productPriceUSD`+ [i+1] +`'>` + priceCurrencyUSD(article[i].currency, article[i].unitCost) + `</td></tr></table></td>
                <td><table><tr><td><small class="text-muted">UYU</small></td><td><small class="text-muted">USD</small></td></tr><tr><td id='productTotalCostUYU`+ [i+1] +`'>` + (priceCurrencyUYU(article[i].currency, article[i].unitCost)*article[i].count) + `</td><td id='productTotalCostUSD`+ [i+1] +`'>` + (priceCurrencyUSD(article[i].currency, article[i].unitCost)*article[i].count) + `</td></tr></table></td>
                <td><i onclick="removeItemFromCart('productBlock`+ [i+1] +`','productTotalCostUYU` + [i+1] +`')" class="fas fa-times-circle clickable"></i></td>
            </tr>
            `
            subtotalPriceUYU += (priceCurrencyUYU(article[i].currency, article[i].unitCost)*article[i].count);
            subtotalPriceUSD += (priceCurrencyUSD(article[i].currency, article[i].unitCost)*article[i].count);
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            
            articleCounter += 1;
        }
    }
    )
    .catch(error => alert("Hubo un error: " + error));
    };

// función que actualiza cantidad y precio de cada artículo
const quantAndPriceChanger = (element, idCount, idCostUYU, idCostUSD, cost, currency) => {
    if (element.className == "fas fa-plus-circle mr-1 clickable"){
        if(currency == "UYU") {
            document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) + 1;
            document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) + cost);
            document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) + (cost/40));
            subtotalPriceUYU += cost
            subtotalPriceUSD += cost/40
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            if(document.getElementById("tipoEnvio").value == "Premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "Express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "Standard"){
                shippingCostUYU = subtotalPriceUYU*0.05
                shippingCostUSD = subtotalPriceUSD*0.05
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
        }
        else if(currency == "USD") {
            document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) + 1;
            document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) + cost*40);
            document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) + cost);
            subtotalPriceUYU += cost*40
            subtotalPriceUSD += cost
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            if(document.getElementById("tipoEnvio").value == "Premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "Express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "Standard"){
                shippingCostUYU = subtotalPriceUYU*0.05
                shippingCostUSD = subtotalPriceUSD*0.05
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
        }
    }
    else if (element.className == "fas fa-minus-circle ml-1 clickable"){
        if(currency == "UYU" && document.getElementById(idCount).innerHTML > 1){
            document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) - 1;
            document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) - cost);
            document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) - (cost/40));
            subtotalPriceUYU -= cost
            subtotalPriceUSD -= cost/40
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            if(document.getElementById("tipoEnvio").value == "Premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "Express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "Standard"){
                shippingCostUYU = subtotalPriceUYU*0.05
                shippingCostUSD = subtotalPriceUSD*0.05
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
        }
        else if(currency == "USD" && document.getElementById(idCount).innerHTML > 1){
            document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) - 1;
            document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) - cost*40);
            document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) - cost);
            subtotalPriceUYU -= cost*40
            subtotalPriceUSD -= cost
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
            document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            if(document.getElementById("tipoEnvio").value == "Premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "Express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "Standard"){
                shippingCostUYU = subtotalPriceUYU*0.05
                shippingCostUSD = subtotalPriceUSD*0.05
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
        }
        else{
            swal({
                title: 'Atención',
                text: 'Si deseas quitar este artículo de tu carrito, haz click sobre la cruz roja que se encuentra en su derecha.',
                icon: 'warning',
                button: 'Entendido',
              });
        }
    }
}

// func que muestra el precio en pesos uruguayos
const priceCurrencyUYU = (currency, cost) => {
    if(currency == "UYU") {
        return cost
    }
    else if(currency == "USD") {
        return cost*40
    }
}

// func que muestra el precio en dolares
const priceCurrencyUSD = (currency, cost) => {
    if(currency == "UYU") {
        return cost/40
    }
    else if(currency == "USD") {
        return cost
    }
}

// función que elimina el artículo del carrito y quita su precio del subtotal y total
const removeItemFromCart = (idBlock, idTotalPrice) => {
    subtotalPriceUYU -= document.getElementById(idTotalPrice).innerHTML;
    subtotalPriceUSD -= document.getElementById(idTotalPrice).innerHTML/40;
    document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
    document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
    document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
    document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
    if(document.getElementById("tipoEnvio").value == "premium"){
        shippingCostUYU -= document.getElementById(idTotalPrice).innerHTML*0.15;
        shippingCostUSD -= (document.getElementById(idTotalPrice).innerHTML/40)*0.15;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU;
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
    }
    else if(document.getElementById("tipoEnvio").value == "express"){
        shippingCostUYU -= document.getElementById(idTotalPrice).innerHTML*0.08;
        shippingCostUSD -= (document.getElementById(idTotalPrice).innerHTML/40)*0.08;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU;
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
    }
    else if(document.getElementById("tipoEnvio").value == "standard"){
        shippingCostUYU -= document.getElementById(idTotalPrice).innerHTML*0.05;
        shippingCostUSD -= (document.getElementById(idTotalPrice).innerHTML/40)*0.05;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU;
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
    }
    document.getElementById(idBlock).remove();
    articleCounter -= 1;
}

// expresiones para shippingInfo
let tipoEnvio = document.getElementById("tipoEnvio");
let pre = document.getElementById("pre");
let exp = document.getElementById("exp");
let sta = document.getElementById("sta");
let inf = document.getElementById("inf");

let envioElegido = false;
let diasEnvio = "";

// función que muestra la información de cada tipo de envío y actualiza el costo de Envío
const shippingInfo = () => {
    if (tipoEnvio.value == "Premium"){
        pre.className = "visible text-white";
        inf.className = "invisible";
        exp.className = "invisible";
        sta.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.15;
        shippingCostUSD = subtotalPriceUSD*0.15;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
        envioElegido = true;
        diasEnvio = "2 a 5";
        }
    else if (tipoEnvio.value  == "Express"){
        exp.className = "visible text-white";
        inf.className = "invisible";
        pre.className = "invisible";
        sta.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.08;
        shippingCostUSD = subtotalPriceUSD*0.08;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
        envioElegido = true;
        diasEnvio = "5 a 8";
        }
    else if (tipoEnvio.value == "Standard"){
        sta.className = "visible text-white";
        inf.className = "invisible";
        pre.className = "invisible";
        exp.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.05;
        shippingCostUSD = subtotalPriceUSD*0.05;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
        envioElegido = true;
        diasEnvio = "12 a 15";
        }
}

// expresiones para paymentMethod y saveChanges
let formaPago = document.getElementById("formaPago")
let formaPagoTarjeta = document.getElementById("formaPagoTarjeta");
let formaPagoTransferencia = document.getElementById("formaPagoTransferencia");

let formaPagoSinGuardar = document.getElementById("formaPagoSinGuardar");
let formaPagoGuardada = document.getElementById("formaPagoGuardada");

let iconoFormaPagoSinGuardar = document.getElementById("iconoFormaPagoSinGuardar");
let iconoFormaPagoGuardada = document.getElementById("iconoFormaPagoGuardada");

let formaPagoGuardadaTarjeta = document.getElementById("formaPagoGuardadaTarjeta");
let formaPagoGuardadaTransferencia = document.getElementById("formaPagoGuardadaTransferencia");

let numTarjeta = document.getElementById('tarjeta');
let fechaVencimiento = document.getElementById('vencimiento');
let codigoSeguridad = document.getElementById('codigoSeguridad');

let elegirBanco = document.getElementById('elegirBanco');
let nombreTitular = document.getElementById('nombreTitular');
let numDeCuenta = document.getElementById('numDeCuenta');

let completaCampos =  document.getElementById('completaCampos');
let numTarjetaIncorrecto = document.getElementById('numTarjetaIncorrecto');
let codigoSeguridadIncorrecto = document.getElementById('codigoSeguridadIncorrecto');

let spanAbrirModalFormaPago = document.getElementById('spanAbrirModalFormaPago');
let elegirFormaPago = document.getElementById('elegirFormaPago');

let datosIngresadosCorrectamente = false;

// función que muestra los campos correspondientes a cada método de pago
const paymentMethod = () => {

    document.getElementById('seleccionaUnaFormaDePago').className = "invisible";
    if(formaPago.value == "tarjeta") {
        formaPagoTarjeta.className = "visible";
        formaPagoTransferencia.className = "invisible";
        completaCampos.className = "invisible";
    }
    else if(formaPago.value == "transferencia") {
        formaPagoTransferencia.className = "visible";
        formaPagoTarjeta.className = "invisible";
        completaCampos.className = "invisible";
    }
}

// expresiones regulares de Tarjetas
const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterRegEx = /^(?:5[1-5][0-9]{14})$/;

const saveChanges = () => {
    if (document.getElementById('formaPago').value == 'seleccionarPago') {
        document.getElementById('seleccionaUnaFormaDePago').className = "";
    }
    else if (document.getElementById("formaPago").value == 'tarjeta') {
        if ((!numTarjeta.value) || (!fechaVencimiento.value) || (!codigoSeguridad.value)) {
            completaCampos.className = "";
            numTarjetaIncorrecto.className = "invisible";
            codigoSeguridadIncorrecto.className = "invisible";
        }
        else if (!(visaRegEx.test(numTarjeta.value) || masterRegEx.test(numTarjeta.value))) {
            completaCampos.className = "invisible";
            codigoSeguridadIncorrecto.className = "invisible";
            numTarjetaIncorrecto.className = "";
        }
        else if (codigoSeguridad.value.length < 3) {
            completaCampos.className = "invisible";
            numTarjetaIncorrecto.className = "invisible";
            codigoSeguridadIncorrecto.className = "";
        }
        else { 
            swal({
                text: 'La forma de pago fue ingresada correctamente: Tarjeta de Crédito',
                icon: 'success',
                button: 'Entendido',
              });
            $('#modalFormaDePago').modal('hide');
            completaCampos.className = "invisible";
            codigoSeguridadIncorrecto.className = "invisible";
            formaPagoSinGuardar.className = "invisible";
            formaPagoGuardada.className = "text-white visible";
            formaPagoGuardadaTarjeta.className = "text-white visible";
            iconoFormaPagoSinGuardar.className = "invisible";
            iconoFormaPagoGuardada.className = "fas fa-check-circle fa-lg m-1 iconosCarrito";

            spanAbrirModalFormaPago.innerHTML = `<button type="button"
            class="text-muted btn btn-light"
            onclick="swal({
                text: 'Si quieres cambiar tu forma de pago, primero haz click en Reestablecer.',
                icon: 'info',
                button: 'Entendido',
              })";>Seleccionar</button>`
            datosIngresadosCorrectamente = true;
        }
    }
    else if (document.getElementById("formaPago").value == "transferencia") {
        if ((elegirBanco.value == "seleccionarBanco") || (!nombreTitular.value) || (!numDeCuenta.value)) {
            completaCampos.className = "";
        }
        else {
            swal({
                text: 'La forma de pago fue ingresada correctamente: Transferencia Bancaria',
                icon: 'success',
                button: 'Entendido',
              });
            $('#modalFormaDePago').modal('hide');
            completaCampos.className = "invisible";
            formaPagoSinGuardar.className = "invisible";
            formaPagoGuardada.className = "text-white visible";
            formaPagoGuardadaTransferencia.className = "text-white visible";
            iconoFormaPagoSinGuardar.className = "invisible";
            iconoFormaPagoGuardada.className = "fas fa-check-circle fa-lg m-1 iconosCarrito";

            spanAbrirModalFormaPago.innerHTML = `<button type="button"
            class="text-muted btn btn-light"
            onclick="swal({
                text: 'Si quieres cambiar tu forma de pago, primero haz click en Reestablecer.',
                icon: 'info',
                button: 'Entendido',
              })";>Seleccionar</button>`
            datosIngresadosCorrectamente = true;
        }
    }
}

const reestablishPaymentMethod = () => {
    if (datosIngresadosCorrectamente == true) {
    formaPago.value = "seleccionarPago";

    numTarjeta.value = "";
    fechaVencimiento.value = "";
    codigoSeguridad.value = "";

    elegirBanco.value = "seleccionarBanco";
    nombreTitular.value = "";
    numDeCuenta.value = "";

    formaPagoTarjeta.className = "invisible";
    formaPagoTransferencia.className = "invisible";

    iconoFormaPagoSinGuardar.className = "fas fa-exclamation-circle fa-lg m-1 iconosCarrito";
    iconoFormaPagoGuardada.className = "invisible";

    formaPagoSinGuardar.className = "text-white m-1 visible";
    formaPagoGuardada.className = "invisible";

    formaPagoGuardadaTarjeta.className = "invisible";
    formaPagoGuardadaTransferencia.className = "invisible";

    spanAbrirModalFormaPago.innerHTML = `<button id="abrirModalFormaPago"
    type="button"
    class="btn btn-secondary m-1"
    data-toggle="modal"
    data-target="#modalFormaDePago">Seleccionar</button>`
    datosIngresadosCorrectamente = false;
    }    
};

const buyInPesosUruguayos = () => {
    if(articleCounter == 0) {
        swal({
            text: 'No has añanido artículos a tu carrito aún.',
            icon: 'warning',
            button: 'Entendido',
          })
    }
    else if (!document.getElementById("direccionCalle").value || !document.getElementById("numeroPuerta").value || !document.getElementById("direccionEsquina").value || !document.getElementById("departamento").value) {
        swal({
            text: 'Por favor, completa al menos la Calle, Número de Puerta, Esquina y Departamento para el envío de tu compra.',
            icon: 'info',
            button: 'Entendido'
        })
    }
    else if (envioElegido == false) {
        swal({
            text: 'Por favor, selecciona un tipo de envío',
            icon: 'info',
            button: 'Entendido',
          })
    }
    else if (datosIngresadosCorrectamente == false) {
        swal({
            text: 'Por favor, selecciona una forma de pago e ingresa los datos correspondientes',
            icon: 'info',
            button: 'Entendido',
          })
    }
    else {
        swal({
            title: 'Atención',
            text: 'Elegiste realizar tu compra en Pesos Uruguayos. ¿Estás seguro?',
            icon: 'info',
            buttons: true,
            buttons: ['Cancelar', "Confirmar mi compra"],
        })
        .then((confirmarCompra) => {
            if (confirmarCompra) {
              swal({
                title: `¡Felicidades!
                Tu compra ha sido realizada con éxito.`,
                text: `
                Elegiste el Tipo de Envío: ${tipoEnvio.value}, por lo que tu compra estará llegando en ${diasEnvio} días.
                Te la enviaremos a: ` + document.getElementById("direccionCalle").value + ` `+ document.getElementById("numeroPuerta").value + `.
                El Costo Total es de ` + document.getElementById("totalUYU").innerHTML + ` Pesos Uruguayos.
                Ingresa un teléfono de contacto. 
                Nos comunicaremos contigo a la brevedad para coordinar la entrega de tu compra.
                Si lo prefieres, puedes omitir este paso y nos comunicaremos contigo via mail.`,
                content: "input",
                icon: "success",
                button: `Entendido`
              });
            }
            else {
              swal('Tu compra ha sido cancelada');
            }
          });
    }
  
}

const buyInDollars = () => {
    swal({
        title: 'Próximamente',
        text: 'Añadiremos la posibilidad de comprar en Dólares a la brevedad. Te pedimos disculpas por los inconvenientes',
        icon: 'info',
        button: 'Entendido'
    })
}


// pagina productos, falta agregar link para que abra la pagina product info







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    chargeCartInfo(DOUBLE_CART_INFO_URL);
});

document.getElementById("tipoEnvio").addEventListener("click", function(event){
    shippingInfo();
});

document.getElementById("formaPago").addEventListener("click", function(event){
    paymentMethod();
});

document.getElementById("guardarCambios").addEventListener("click", function(event){
    saveChanges();
})

document.getElementById("reestablecerFormaDePago").addEventListener("click", function(event){
    reestablishPaymentMethod();
});

document.getElementById("compraPesos").addEventListener("click", function(event){
    buyInPesosUruguayos();
});

document.getElementById("compraDolares").addEventListener("click", function(event){
    buyInDollars();
});

