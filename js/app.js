/* Componentes */
const cardpelicula = {
    props: {
        ruta: String,
        nombre: String,
        year: Number,
        indice: Number,
    },
    template:
        `<li class="card" id="indice" v-on:click="$emit('detalle')">
            <img v-bind:src= "ruta"/> 
            <h2 class="movie-title">{{ nombre }}</h2>
            <p>{{ year }}</p>
        </li>`,
}

const modalpelicula = {
    props: {
        ruta: String,
        nombre: String,
        generos: Array,
        sinopsis: String,
        trailer: String,
        year: Number,
        duracion: Number,
        director: String,
        indice: Number,
        idback: String,
        idfav: String,
    },
    template:
        `<div class="bg-modal" id="indice">
            <div class="modal">

                <section class="detalles-pelicula">

                    <div class="navbar-modal">
                        <div v-bind:id="idback"></div>
                        <div v-bind:id="idfav" v-on:click="$emit('favorite')"></div>
                    </div>

                    <div class="movie-poster">
                        <img v-bind:src= "ruta"/> 
                    </div>


                    <div class="movie-info">
                        <div class="movie-info_title">
                            <h3 class="h3">{{nombre}}</h3>
                            <ul class="movie-info_genres">
                                <li class="pill pill-text" v-for="(item, index) in generos">{{item}}</li>
                            </ul>
                        </div>

                        <p class="movie-info_sinopsis">{{sinopsis}}</p>

                        <a v-bind:href="trailer" target="_blank" class="movie-info_trailer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" class="play-svg">
                                <path fill="#e6e6e6"
                                    d="M35.5 24c0 .366-.09.725-.264 1.044a2.092 2.092 0 0 1-.73.775L15.679 37.683a2.047 2.047 0 0 1-2.117.04 2.104 2.104 0 0 1-.775-.782 2.184 2.184 0 0 1-.286-1.078V12.137c0-.38.1-.752.286-1.079.186-.326.454-.596.775-.781a2.043 2.043 0 0 1 2.117.04l18.829 11.864c.304.19.555.456.729.775.174.319.265.678.264 1.044Z" />
                            </svg>
                            <p>Ver tráiler</p>
                        </a>

                        <dl class="movie-info_facts">
                            <div>
                                <dt>Año</dt>
                                <dd>{{year}}</dd>
                            </div>

                            <div>
                                <dt>Duración</dt>
                                <dd>{{duracion}}min</dd>
                            </div>

                            <div>
                                <dt>Director</dt>
                                <dd>{{director}}</dd>
                            </div>
                        </dl>
                    </div>

                </section>

            </div>
        </div>`,
    // methods: {

    // },
}

/* Instancia de Vue */
const appMovie = new Vue({
    el: '#app',

    data: {
        movies: [],
        favorites: [],
        categorias: ["Todas", "Acción", "Aventura", "Comedia", "Drama", "Ficción", "Terror", "Suspenso", "Fantasía", "Romance", "Juvenil"],
        searchInput: "",
        generoSeleccionado: ""
    },

    created() {

        console.log('Inicio de la instancia de Vue');

        //Agregamos al array movies las películas del JSON
        fetch('json/peliculas.json')
            .then(response => response.json())
            .then(json => {

                json.forEach(movie => {

                    this.movies.push(movie);

                });

                console.log(this.movies);
            })

        //Agregamos al array favorites las películas agregadas a favoritos
        let array = JSON.parse(localStorage.getItem('favorites'));
        if (array) {
            array.forEach(movie => {
                this.favorites.push(movie);
            })
        }

    },

    methods: {
        mostrarModal(indice) {

            //Obtenemos el ID de la card clickeada
            let id = indice;

            //Seleccionamos la ventana modal con el mismo ID (y su botón de "atrás" y "favoritos")
            let modal = document.getElementById(`modal-${id}`);
            let back = document.getElementById(`back-${id}`);
            let fav = document.getElementById(`fav-${id}`);
            let favID = `fav-${id}`;

            //Mostramos la ventana modal
            modal.style.display = "grid";

            //Agregamos eventos para cerrarla
            //(Haciendo click fuera de ella - Desktop)
            window.addEventListener("click", function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            });

            //(Haciendo click en el botón - Mobile)
            window.addEventListener("click", function (event) {
                if (event.target == back) {
                    modal.style.display = "none";
                }
            });

            //Dependiendo del estado de la peli, modificamos la interfaz
            if (window.location.pathname == "/movie-app-vue/html/favorites.html") {
                console.log("estoy en favoritos")
                if (this.favorites.some(movie => `fav-${movie.id}` === favID)) {
                    fav.style.backgroundImage = "url('movie-app-vue/assets/svg/heart-fill.svg')";
                } else {
                    fav.style.backgroundImage = "url('movie-app-vue/assets/svg/heart-outlined.svg')";
                }
            } else {
                if (this.favorites.some(movie => `fav-${movie.id}` === favID)) {
                    fav.style.backgroundImage = "url('assets/svg/heart-fill.svg')";
                } else {
                    fav.style.backgroundImage = "url('assets/svg/heart-outlined.svg')";
                }
            }

        },

        filterMovies(index) {

            //Guardamos la categoría seleccionada
            console.log('Filtrando:', index);
            this.generoSeleccionado = index;

            //Actualizamos la interfaz
            let categorias = document.querySelectorAll('.filter');
            let categoriaSeleccionada = document.getElementById(`${index}`);

            categorias.forEach(categoria => {
                categoria.classList.remove("selected");
            })
            categoriaSeleccionada.classList.add("selected");

        },

        changeFavoriteState(index) {

            //Averiguamos la película seleccionada y su estado
            let id = index;
            let clickedElement = document.getElementById(`fav-${index}`);
            let selectedMovie = this.movies.find(movie => movie.id === id);

            //Si ya está en favoritos...
            if (this.favorites.some(movie => movie.id === id)) {
                console.log("Esta peli ya está en favoritos, voy a eliminarla");

                //Actualizamos la interfaz

                if (window.location.pathname == "/movie-app-vue/html/favorites.html") {
                    clickedElement.style.backgroundImage = "url('movie-app-vue/assets/svg/heart-outlined.svg')";

                    this.favorites.forEach(movie => {
                        let modal = document.getElementById(`modal-${movie.id}`);
                        modal.style.display = "none";
                    })
                } else {
                    clickedElement.style.backgroundImage = "url('assets/svg/heart-outlined.svg')";
                }

                //Eliminamos de favoritos
                let indice = this.favorites.findIndex(movie => movie.id === id);
                this.favorites.splice(indice, 1);

                //Actualizamos localStorage
                localStorage.setItem("favorites", JSON.stringify(this.favorites));

            //Si aún no está en favoritos...
            } else {
                console.log("Esta peli no está en favoritos, voy a agregarla");

                //Actualizamos la interfaz
                if (window.location.pathname == "/movie-app-vue/html/favorites.html") {
                    clickedElement.style.backgroundImage = "url('movie-app-vue/assets/svg/heart-fill.svg')";
                } else {
                    clickedElement.style.backgroundImage = "url('assets/svg/heart-fill.svg')";
                }


                //Agregamos a favoritos
                this.favorites.push(selectedMovie);

                //Actualizamos localStorage
                localStorage.setItem("favorites", JSON.stringify(this.favorites));
            }

        },

        showResultsHints() {
            let helper = document.getElementById("search-helper");
            let titulo = document.getElementById("titulo-cambiante");

            //Si el usuario ingresó contenido al input...
            if (this.searchInput != '') {

                helper.classList.remove("hidden");
                titulo.textContent = `${this.searchInput}`;

            //Si el input está vacío...
            } else {

                helper.classList.add("hidden");
                titulo.textContent = "Explorar";

            }
        }

    },

    computed: {
        searchMovies() {

            //Si el usuario seleccionó una categoría...
            if (this.generoSeleccionado != '') {

                let categoria = this.generoSeleccionado;

                if (this.generoSeleccionado == 'Todas') {
                    return this.movies.filter(movie => movie.titulo.toLowerCase().includes(this.searchInput.toLowerCase()));
                } else {
                    return this.movies.filter(movie => movie.titulo.toLowerCase().includes(this.searchInput.toLowerCase()) && movie.genero.indexOf(categoria) >= 0);
                }

            }

            //Si el usuario no seleccionó una categoría...
            return this.movies.filter(movie => movie.titulo.toLowerCase().includes(this.searchInput.toLowerCase()));

        },

        searchMoviesCount() {
            return this.searchMovies.length;
        }

    },

    components: {
        cardpelicula, modalpelicula
    }
});