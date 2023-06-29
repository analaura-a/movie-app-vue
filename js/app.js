/* Componentes */
const cardpelicula = {
    props: {
        ruta: String,
        nombre: String,
        year: Number,
    },
    template:
        `<li class="card">
        <img v-bind:src= "ruta"/> 
       
        <h2 class="movie-title">{{ nombre }}</h2>
        <p>{{ year }}</p>
    </li>`,
    // methods: {

    // },
}

/* Instancia de Vue */
const appMovie = new Vue({
    el: '#app',

    data: {
        movies: [],
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

    // methods: {

    // },

    // computed: {

    // },

    components: {
        cardpelicula
    }
});