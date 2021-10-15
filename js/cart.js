const DOUBLE_CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

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
                <td><i onclick="quantAndPriceChanger(this,'productCount`+ [i+1] +`','ProductTotalCostUYU`+ [i+1] +`','ProductTotalCostUSD`+ [i+1] +`',` + article[i].unitCost + `,'` + article[i].currency + `')" class="fas fa-plus-circle mr-1 clickable"></i>
                <span class="font-weight-bold" id='productCount`+ [i+1] +`'>` + article[i].count + `</span>
                <i onclick="quantAndPriceChanger(this,'productCount`+ [i+1] +`','ProductTotalCostUYU`+ [i+1] +`','ProductTotalCostUSD`+ [i+1] +`',` + article[i].unitCost + `,'` + article[i].currency +`')" class="fas fa-minus-circle ml-1 clickable"></i></td>
                `//finaliza bloque de Cantidad
                + `
                <td><table><tr><td id='ProductPriceUYU`+ [i+1] +`'>` + priceCurrencyUYU(article[i].currency, article[i].unitCost) + `<small class="text-muted"> UYU</small></td><td id='ProductPriceUSD`+ [i+1] +`'>` + priceCurrencyUSD(article[i].currency, article[i].unitCost) + `<small class="text-muted"> USD</small></td></tr></table></td>
                <td><table><tr><td id='ProductTotalCostUYU`+ [i+1] +`'>` + (priceCurrencyUYU(article[i].currency, article[i].unitCost)*article[i].count) + `<small class="text-muted"> UYU</small></td><td id='ProductTotalCostUSD`+ [i+1] +`'>` + (priceCurrencyUSD(article[i].currency, article[i].unitCost)*article[i].count) + `<small class="text-muted"> USD</small></td></tr></table></td>
                <td><i onclick="removeItemFromCart('productBlock`+ [i+1] +`')" class="fas fa-times-circle clickable"></i></td>
            </tr>
            `;
        }
    }
    )
    .catch(error => alert("Hubo un error: " + error));
    };

// función que actualiza cantidad y precio de cada artículo
quantAndPriceChanger = (element, idCount, idCostUYU, idCostUSD, cost, currency) => {
        if (element.className == "fas fa-plus-circle mr-1 clickable"){
            if(currency == "UYU") {
                document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) + 1;
                document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) + cost) + `<small class="text-muted"> UYU</small>`;
                document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) + (cost/40)) + `<small class="text-muted"> USD</small>`;
            }
            else if(currency == "USD") {
                document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) + 1;
                document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) + cost*40) + `<small class="text-muted"> UYU</small>`;
                document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) + cost) + `<small class="text-muted"> USD</small>`;
            }
        }
        else if (element.className == "fas fa-minus-circle ml-1 clickable"){
            if(currency == "UYU") {
                document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) - 1;
                document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) - cost) + `<small class="text-muted"> UYU</small>`;
                document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) - (cost/40)) + `<small class="text-muted"> USD</small>`;
                if (document.getElementById(idCount).innerHTML < 1) {
                    alert(`El mínimo de cantidad a llevar es 1. Si deseas quitar este artículo de tu carrito, haz click sobre la X que se encuentra hacia la derecha.`)
                    document.getElementById(idCount).innerHTML = 1;
                    document.getElementById(idCostUYU).innerHTML = cost + `<small class="text-muted"> UYU</small>`;
                    document.getElementById(idCostUSD).innerHTML = cost/40 + `<small class="text-muted"> USD</small>`;
                    
                    }
            }
            else if(currency == "USD") {
                document.getElementById(idCount).innerHTML = parseInt(document.getElementById(idCount).innerHTML) - 1;
                document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) - cost*40) + `<small class="text-muted"> UYU</small>`;
                document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) - cost) + `<small class="text-muted"> USD</small>`;
                if (document.getElementById(idCount).innerHTML < 1) {
                    alert(`El mínimo de cantidad a llevar es 1. Si deseas quitar este artículo de tu carrito, haz click sobre la X que se encuentra hacia la derecha.`)
                    document.getElementById(idCount).innerHTML = 1;
                    document.getElementById(idCostUYU).innerHTML = cost*40 + `<small class="text-muted"> UYU</small>`;
                    document.getElementById(idCostUSD).innerHTML = cost + `<small class="text-muted"> USD</small>`
                    }
            }
        }
}

// func que muestra el precio en pesos uruguayos
priceCurrencyUYU = (currency, cost) => {
    if(currency == "UYU") {
        return cost
    }
    else if(currency == "USD") {
        return cost*40
    }
}

// func que muestra el precio en dolares
priceCurrencyUSD = (currency, cost) => {
    if(currency == "UYU") {
        return cost/40
    }
    else if(currency == "USD") {
        return cost
    }
}

// función que elimina el artículo del carrito
removeItemFromCart = id => {
    document.getElementById(id).remove();
}

// expresiones para shippingInfo
let tipoEnvio = document.getElementById("tipoEnvio");
let pre = document.getElementById("pre");
let exp = document.getElementById("exp");
let sta = document.getElementById("sta");
let inf = document.getElementById("inf");

shippingInfo = () => {
    if (tipoEnvio.value == "premium"){
        pre.className = "visible"
        inf.className = "invisible"
        exp.className = "invisible"
        sta.className = "invisible";
        }
    else if (tipoEnvio.value  == "express"){
        exp.className = "visible"
        inf.className = "invisible"
        pre.className = "invisible"
        sta.className = "invisible";
        }
    else if (tipoEnvio.value == "standard"){
        sta.className = "visible"
        inf.className = "invisible"
        pre.className = "invisible"
        exp.className = "invisible";
        }
}

// expresiones para paymentMethod
let formaPagoTarjeta = document.getElementById("formaPagoTarjeta");
let formaPagoTransferencia = document.getElementById("formaPagoTransferencia");

// función que muestra los campos correspondientes a cada método de pago
paymentMethod = () => {
    if(formaPago.value == "tarjeta") {
        formaPagoTarjeta.className = "visible";
        formaPagoTransferencia.className = "invisible";
    }
    else if(formaPago.value == "transferencia") {
        formaPagoTransferencia.className = "visible";
        formaPagoTarjeta.className = "invisible";
    }
}








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    chargeCartInfo(DOUBLE_CART_INFO_URL);
});

document.getElementById("tipoEnvio").addEventListener("click", function(event){
    shippingInfo();
});

document.getElementById("compraPesos").addEventListener("click", function(event){
    showPrice("compraPesos");
});

document.getElementById("compraDolares").addEventListener("click", function(event){
    showPrice("compraDolares");
});

document.getElementById("formaPago").addEventListener("click", function(event){
    paymentMethod();
});