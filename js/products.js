const ORDER_ASC_BY_PRICE = "Ascendente";
const ORDER_DESC_BY_PRICE = "Descendente";
const ORDER_BY_SOLD_COUNT = "Relevancia";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

let productsArrayForRealtimeSearch = [];


// Función que muestra la lista de productos en el documento HTML

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){


                htmlContentToAppend += `
                <div class="col-sm-4 border border-secondary m-2 rounded eachProduct" id='product` + [i+1] + `'>
                    <a href="product-info.html" style="text-decoration: none; color: black; hover: border: 10px solid black;"><img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                    <div class="d-flex w-100 justify-content-between">
                        <h4>`+ product.name +`</h4>
                        <hr class="linea">
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                    <p class="text-muted">`+ product.currency + ` ` + product.cost + `</p></a>
                </div>
                `
                productsArrayForRealtimeSearch.push(
                    {name : product.name,
                    description: product.description,
                    idProduct : `product` + [i+1] + ``}
                )
        }

        document.getElementById("contProductos").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

// Función que realiza la búsqueda en tiempo real de nombre o descripción del artículo

const searchFormField = document.getElementById('buscadorProductos');
const searchFormButton = document.getElementById('botonBuscador');

const realtimeSearch = () => {
    const textFromField = searchFormField.value.toLowerCase();
    for (element of productsArrayForRealtimeSearch){
        let productName = element.name.toLowerCase();
        let productDescription = element.description.toLowerCase();
        if(productName.indexOf(textFromField) !== -1){
            document.getElementById(element.idProduct).className = 'col-sm-4 border border-secondary m-2 rounded eachProduct';
        }
        else if(productDescription.indexOf(textFromField) !== -1){
            document.getElementById(element.idProduct).className = 'col-sm-4 border border-secondary m-2 rounded eachProduct';
        }
        else if(productName.indexOf(textFromField) == -1){
            document.getElementById(element.idProduct).className = 'invisible';
        }
        else if(productDescription.indexOf(textFromField) == -1){
            document.getElementById(element.idProduct).className = 'invisible';
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
	if (resultObj.status === "ok"){
		sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
	}

    document.getElementById("sortPriceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    })

	document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});
});

document.getElementById('botonBuscador').addEventListener("click", function(){
    realtimeSearch(); 
});

document.getElementById('buscadorProductos').addEventListener("keyup", function(){
    realtimeSearch()
});