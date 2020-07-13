'use strict';

function getArt() {
    //
    
    const section = document.querySelector(".met");

    //cada obra de arte lleva su propio indice.
    //tenemos que añadir el indice al fin del URL del a API.

    let randomId = Math.round(Math.floor((Math.random() * 60000)));

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`)
    .then((response) => {
    //convertir respuesta a un objeto legible. 

    return response.json();
    })

    .then((data) => {
    if (data.primaryImage) {
    const article = document.createElement('article');
    article.innerHTML = `
    <h3> ARTWORK OF THE DAY </h3>
    <div>
      <article class="box-artwork">
        
        <img src="${data.primaryImage}" alt="MET MUSEUM">
        
        <h4> "${data.title}" </h4>
        <p> 
            Name of the artist: ${data.artistDisplayName} <br />
        </p>
        
      </article>
    </div>
  </section>`;
    section.appendChild(article);
    } else {
        getArt();
    }
    
    })

    .catch((err) => {}) 
}

getArt();