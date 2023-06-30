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
    },
    template:
        `<div class="bg-modal" id="indice">
            <div class="modal">

                <section class="detalles-pelicula">

                    <div class="navbar-modal">
                        <div v-bind:id="idback"></div>
                        <div></div>
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
        categorias: ["Todas", "Acción", "Aventura", "Comedia", "Drama", "Ficción", "Terror", "Suspenso", "Fantasía", "Romance", "Juvenil"],
        searchInput: "",
    },

    created() {

        console.log('Inicio de la instancia de Vue');

        fetch('../json/peliculas.json')
            .then(response => response.json())
            .then(json => {

                json.forEach(movie => {

                    this.movies.push(movie);

                });

                console.log(this.movies);
            })

    },

    methods: {
        mostrarModal(indice) {

            //Obtenemos el ID de la card clickeada
            let id = indice;

            //Seleccionamos la ventana modal con el mismo ID (y su botón de "atrás")
            let modal = document.getElementById(`modal-${id}`);
            let back = document.getElementById(`back-${id}`);

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
        },

        filterMovies(index) {
            console.log('filtrando:', index);

            // let categoria = index;

            // this.movies.forEach(movie => {

            //     movie.genero.forEach(genero => function () {

            //         if(genero.toLowerCase() == categoria.toLowerCase()){
            //             this.movies.filter(pelicula => pelicula.genero.includes(categoria));
            //         }
            //         // if (genero == categoria) {

            //         // } else {

            //     })
            // })

            // console.log(this.movies);

        }

    },

    computed: {
        searchMovies() {
            return this.movies.filter(movie => movie.titulo.toLowerCase().includes(this.searchInput.toLowerCase()));
        }

    },

    components: {
        cardpelicula, modalpelicula
    }
});