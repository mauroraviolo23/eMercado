const DOUBLE_CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let subtotalPriceUYU = 0;
let subtotalPriceUSD = 0;
let shippingCostUYU = 0;
let shippingCostUSD = 0;

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
            document.getElementById(idCostUYU).innerHTML = (parseInt(document.getElementById(idCostUYU).innerHTML) + cost);
            document.getElementById(idCostUSD).innerHTML = (parseFloat(document.getElementById(idCostUSD).innerHTML) + (cost/40));
            subtotalPriceUYU += cost
            subtotalPriceUSD += cost/40
            document.getElementById("subtotalUYU").innerHTML = subtotalPriceUYU;
            document.getElementById("subtotalUSD").innerHTML = subtotalPriceUSD;
            if(document.getElementById("tipoEnvio").value == "premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "standard"){
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
            if(document.getElementById("tipoEnvio").value == "premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "standard"){
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
            if(document.getElementById("tipoEnvio").value == "premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD; 
            }
            else if(document.getElementById("tipoEnvio").value == "standard"){
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
            if(document.getElementById("tipoEnvio").value == "premium"){
                shippingCostUYU = subtotalPriceUYU*0.15
                shippingCostUSD = subtotalPriceUSD*0.15
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "express"){
                shippingCostUYU = subtotalPriceUYU*0.08
                shippingCostUSD = subtotalPriceUSD*0.08
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
            else if(document.getElementById("tipoEnvio").value == "standard"){
                shippingCostUYU = subtotalPriceUYU*0.05
                shippingCostUSD = subtotalPriceUSD*0.05
                document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
                document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD; 
                document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
                document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
            }
        }
        else{
            alert("Si deseas quitar este artículo de tu carrito haz click sobre la X que se encuentra hacia la derecha.")
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

// función que elimina el artículo del carrito y quita su precio del subtotal y total
removeItemFromCart = (idBlock, idTotalPrice) => {
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
}

// expresiones para shippingInfo
let tipoEnvio = document.getElementById("tipoEnvio");
let pre = document.getElementById("pre");
let exp = document.getElementById("exp");
let sta = document.getElementById("sta");
let inf = document.getElementById("inf");

// función que muestra la información de cada tipo de envío y actualiza el costo de Envío
shippingInfo = () => {
    if (tipoEnvio.value == "premium"){
        pre.className = "visible";
        inf.className = "invisible";
        exp.className = "invisible";
        sta.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.15;
        shippingCostUSD = subtotalPriceUSD*0.15;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
        }
    else if (tipoEnvio.value  == "express"){
        exp.className = "visible";
        inf.className = "invisible";
        pre.className = "invisible";
        sta.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.08;
        shippingCostUSD = subtotalPriceUSD*0.08;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
        }
    else if (tipoEnvio.value == "standard"){
        sta.className = "visible";
        inf.className = "invisible";
        pre.className = "invisible";
        exp.className = "invisible";
        shippingCostUYU = subtotalPriceUYU*0.05;
        shippingCostUSD = subtotalPriceUSD*0.05;
        document.getElementById("costoEnvioUYU").innerHTML = shippingCostUYU; 
        document.getElementById("costoEnvioUSD").innerHTML = shippingCostUSD;
        document.getElementById("totalUYU").innerHTML = subtotalPriceUYU + shippingCostUYU;
        document.getElementById("totalUSD").innerHTML = subtotalPriceUSD + shippingCostUSD;
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