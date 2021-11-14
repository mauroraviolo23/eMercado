const goldStar = `<span class="fa fa-star checked"></span>`;
const blackStar = `<span class="fa fa-star"></span>`;

let starCounter;
function rate(item) {
    starCounter = item.id[0]; //primer caracter del Id
    let starName = item.id.substring(1); //caracteres luego del primero
    for (let i=0; i<5; i++) {
        let fullStarName = (i+1) + starName;
        if (i<starCounter) {
            document.getElementById(fullStarName).className="ml-1 fa fa-star checked";
        }
        else {
            document.getElementById(fullStarName).className="ml-1 fa fa-star";
        }
    }
}

function numRate(item) {
    let element = document.getElementById("numberRate");
    if (item.id === '1Star') {
        element.value = 1;
    }
    else if (item.id === '2Star') {
        element.value = 2;
    }
    else if (item.id === '3Star') {
        element.value = 3;
    }
    else if (item.id === '4Star') {
        element.value = 4;
    }
    else if (item.id === '5Star') {
        element.value = 5;
    }
}

function starRateForAddedComment(value) {
    return goldStar.repeat(value) + blackStar.repeat(5-value);
}


const chargeProductInfo = (urlProduct, urlRelatedProductsList) => {
    let addedContent = [];
    let contentHolder = " ";
    fetch(urlRelatedProductsList)
    .then(respuesta=>respuesta.json())
    .then(infoRelatedProduct => {
        for(let i = 0; i < infoRelatedProduct.length; i++){
            addedContent.push({name: infoRelatedProduct[i].name,
                            description: infoRelatedProduct[i].description,
                            currency: infoRelatedProduct[i].currency,
                            cost: infoRelatedProduct[i].cost,
                            imgSrc: infoRelatedProduct[i].imgSrc,
                        });
        }
    })
    fetch(urlProduct)
    .then(respuesta=>respuesta.json())
	.then(infoProducto=> {
        let img = 0;
        document.getElementById("productInfo").innerHTML = `
        <div id="productInfoBox">
            <h3>` + infoProducto.name + `</h3>
            <dl>
                <dt>Descripción</dt>
                <dd>
                    <p id="productDescription">` + infoProducto.description + `</p>
                </dd>
                <dt>Precio</dt>
                <dd>
                    <p id="productCost"> ` + infoProducto.currency + ` ` + infoProducto.cost + `</p>
                </dd>
                <dt>Cantidad de autos vendidos</dt>
                <dd>
                    <p id="productCount">` + infoProducto.soldCount + `</p>
                </dd>
                <dt>Categoría</dt>
                <dd>
                    <p id="productCategory">` + infoProducto.category + `</p>
                </dd>
                <dt>Imágenes</dt>
                <dd>
                    <div class="row text-center pt-2" id="productImagesGallery">
                        <div id="carouselControls" class="carousel slide ml-3" data-ride="carousel">
                            <div id="carousel-inner" class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="` + infoProducto.images[img] + `" class="d-block w-80" alt="` + infoProducto.name + `">
                                </div>
                            </div>
                    <a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                        </div>
                    </div>
                </dd>
            </dl>
            <div>
                <h4 class="text-center">Productos Relacionados</h4>
                <div id="relatedProducts" class="d-flex flex-row">
                </div>
            </div>
        </div>
        `
        for (let img = 1; img < infoProducto.images.length; img++) {
            document.getElementById("carousel-inner").innerHTML +=`
            <div class="carousel-item">
                <img src="` + infoProducto.images[img] + `" class="d-block w-80" alt="` + infoProducto.name + `">
            </div>
            `
        }

        for (let element of infoProducto.relatedProducts) {
            contentHolder +=
                `<div class="card text-center bg-light mt-2 my-auto">
                        <h4 class="card-title">` + addedContent[element].name + `</h4>
                        <p class="card-text">` + addedContent[element].description + `</p>
                        <p class="price">` + addedContent[element].currency + ` ` + addedContent[element].cost +`</p>
                        <img class="img-fluid img-thumbnail" src="` + addedContent[element].imgSrc + `" alt="` + addedContent[element].name + `">
                        <a href="products.html" class="btn btn-dark" style="width: 100%;">Ver</a>
                        </div>`;
        }
        document.getElementById("relatedProducts").innerHTML += contentHolder;
        })
    .catch( error => alert("Hubo un error: " + error));
}

const chargeProductCommentsInfo = (url) => {
    fetch(url)
    .then(
        document.getElementById("commentsContainer").innerHTML +=`
        <h3>Comentarios</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Comentario</th>
                    <th scope="col">Puntuación</th>
                </tr>
            </thead>
            <tbody id="commentsTable">
            </tbody>
        </table>
        `
    )
    .then(respuesta=>respuesta.json())
    .then(commentsList=> {
        for (let c = 0; c < commentsList.length; c++) {
            var numOfStars = parseInt(commentsList[c].score);
            document.getElementById("commentsTable").innerHTML += `
            <tr>
                <td>` + commentsList[c].user + `</td>
                <td>` + commentsList[c].description + `<br><small class="text-muted">` + commentsList[c].dateTime + `</small></td>
                <td>` + goldStar.repeat(numOfStars) + blackStar.repeat(5-numOfStars) + `<br><small class="text-muted">` + commentsList[c].score + `</small></td>
            </tr>
            `
        }
    })
    .catch( error => alert("Hubo un error: " + error));
}

const formatDate = () => {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var hrs = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (mm < 10) {
        mm = '0' + mm;
        }
    
    if (dd < 10) {
        dd = '0' + dd;
        }

    if (hrs < 10) {
        hrs = '0' + hrs;
        }
    
    if (min < 10) {
        min = '0' + min;
        }    

    if (sec < 10) {
        sec = '0' + sec;
        }    
    
    today = yyyy + `-` + mm + `-` + dd + ` ` + hrs + `:` + min + `:` + sec;
    return today;
}

const submitComment = () => {
    if (document.getElementById("addComment").value != "") {
        document.getElementById("commentsTable").innerHTML += `
                <tr>
                    <td>` + (JSON.parse(localStorage.getItem("soloNombreUsuario"))) + `</td>
                    <td>` + document.getElementById("addComment").value + `<br><small class="text-muted">` + formatDate() + `</small></td>
                    <td>`+ starRateForAddedComment(document.getElementById("numberRate").value) +`<br><small class="text-muted">` + document.getElementById("numberRate").value + `</small></td>
                </tr>
                `}
    else {
        alert("Por favor, escribe algo")
    }
    document.getElementById("addComment").value = '';
    document.getElementById("numberRate").value = 5;
    let starIdList = ["1Star", "2Star", "3Star", "4Star", "5Star"];
    for (let s = 0; s < starIdList.length; s++) {
        document.getElementById(starIdList[s]).className = "ml-1 fa fa-star";
    }
    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    chargeProductInfo(PRODUCT_INFO_URL, PRODUCTS_URL);
    chargeProductCommentsInfo(PRODUCT_INFO_COMMENTS_URL);
});

document.getElementById("submitComment").addEventListener("click", function(event) {
    event.preventDefault();
    submitComment();
})

document.getElementById("1Star").addEventListener("click", function(event) {
    numRate(this);
}) 

document.getElementById("2Star").addEventListener("click", function(event) {
    numRate(this);
})

document.getElementById("3Star").addEventListener("click", function(event) {
    numRate(this);
})

document.getElementById("4Star").addEventListener("click", function(event) {
    numRate(this);
})

document.getElementById("5Star").addEventListener("click", function(event) {
    numRate(this);
})


    