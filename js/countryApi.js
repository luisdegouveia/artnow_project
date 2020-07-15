'use strict';

const section = document.querySelector('.met')

const artworkByCountry = (event) => {
    //metodo para prevenir que la pagina cargue. 
    event.preventDefault();

    const textSearch = document.querySelector('.artwork-by-country').value

    // Busca dentro de GeoLocation, este nos regresa un objeto con muchos objectIDs
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${textSearch}&q=a`)

    //convertir respuesta a un objeto legible. 
    .then( (response) => response.json() )

    //de lo que recibimos, aplicamos el metodo random para seleccionar un ID random de todos los que recibimos. 
    .then(data => {
        let randomId = Math.round(Math.floor((Math.random() * data.total)));
        let randomObjID = data.objectIDs[randomId];

    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjID}`)
    })
    //convertir respuesta a un objeto legible. 
    .then( (response) => response.json() )
    .then( (data) => {
        if (data.primaryImage && data.artistDisplayName) {
            const textSearch = document.querySelector('.artwork-by-country').value
            const article = document.createElement('article');
            article.innerHTML = `
            <h3> You are seeing a piece of art from ${textSearch} </h3>
            <div>
              <article class="box-artwork">
                
                <div class="piece-of-art">
                  <img src="${data.primaryImage}" alt="MET MUSEUM">
                </div>
                
                <h4> "${data.title}" </h4>
                <p> 
                    Name of the artist: ${data.artistDisplayName} <br />
                </p>
                
              </article>
            </div>`;
            section.innerHTML = "";
            section.appendChild(article);
            } else {
                artworkByCountry();
            }
    } )
    
}

//seleccionamos el elemento HTML que tiene por clase artwork-by-country
document.querySelector("#login-button").addEventListener("click", artworkByCountry);