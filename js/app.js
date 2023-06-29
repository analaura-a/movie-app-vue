/* Componentes */
const CardPelicula = {
    props: {
        texto: String
    },
    template: `<h1> {{ texto }} </h1>`,
    methods: {

    },
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

    methods: {

    },

    computed: {

    },

    components: {
        CardPelicula
    }
});