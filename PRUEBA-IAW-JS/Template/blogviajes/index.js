//  Carrega de dades json
function getPostsList() {
  fetch('../static/index.json')
  .then(result => result.json())
  .then(data => {
    console.log(data);
    printPostsList(data);
		showFavoritePosts();
  })
}

// Pinta les dades de les entrades a partir d'un array amb objectes json
printPostsList = (data) => {
  const content = document.querySelector('#main');
  content.innerHTML = "";
  for (let post of data) {  // (let i=0; i < data.length; i++)
    content.innerHTML += `
    <article id="art-${post.id}" class="entrada">
    <h2><img id="post-${post.id}" class="favorite" src="./img/favorite-off-icon-2.png" onclick="addFavoritePost('${post.id}', '${post.titol}', '${post.descripcio}')" alt="Seleccionar como post favorito" />
				${post.titol}
		</h2>
    <img src="${post.imagen}" />
    <p>${post.descripcio}</p>
    <p>${post.descripcio}</p>
    <a href="#" class="boton">Leer Más</a>
    </article>
    `;
  }
}


 // Pinta les dades de les entrades a partir d'un array amb objectes json del localStorage
 function addFavoritePost(id, titulo, descripcio) {
  let postsList = [];

  const favoritePost = {
    "id": id,
    "titulo": titulo,
    "descripcio": descripcio.substring(0, 50)
  };

  // Actualització de la lista i del localStorage
  toggleFavorite (favoritePost);

	// Actualització del icone. Ho canvia a favorite
	document.querySelector("#post-" + id).src="img/favorite-on-icon.png";

  console.log("Favorite posts:" + postsList);
  showFavoritePosts();
}

function toggleFavorite (entrada) {
  const parseID = entrada.id.toString();
  let favsEntradas = JSON.parse(localStorage.getItem('favoritePostsList')) || [];
  const foundInLocalStorage = favsEntradas.find((fe) => fe.id.toString() === parseID);
  if (favsEntradas && foundInLocalStorage && foundInLocalStorage.id) {
    favsEntradas = favsEntradas.filter((element) => element.id.toString() !== parseID);
  } else {
    favsEntradas.push(entrada);
  }
  localStorage.setItem('favoritePostsList', JSON.stringify(favsEntradas));
}

 


// Pinta les dades de les entrades a partir d'un array amb objectes json del localStorage
function showFavoritePosts(){
  const content = document.querySelector('#favContent');
  if (localStorage.getItem('favoritePostsList')){
    const postsList = JSON.parse(localStorage.getItem('favoritePostsList'));
    content.innerHTML = "";
    for (let data of postsList) {
			// Dades entrada favorita
			content.innerHTML += `
      <h3>${data.titulo}</h3>
      <p>${data.descripcio}...</p>
      `;
			// Actualitza la imatge: favorite on
			document.querySelector("#post-" + data.id).src="img/favorite-on-icon.png";
    }
    content.innerHTML += `<button type="button" name="button" onclick="deleteLocalStorage()">Borrar entradas favoritas</button>`;
  } else {
    content.innerHTML = "No hay entradas favoritas";
  }
}


// Esborra l'array amb les dades json
function deleteLocalStorage() {
  localStorage.removeItem('favoritePostsList');
	let imgFavorites = document.querySelectorAll("article h2 img");
	for (let data of imgFavorites) {
		data.src="./img/favorite-off-icon-2.png";
	}
	document.querySelector('#favContent').innerHTML="No hay entradas favoritas";
}