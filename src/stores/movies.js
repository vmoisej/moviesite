import { defineStore } from 'pinia'
import axios from "axios";
import {useRoute} from "vue-router"

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: [],
        searchMovies: [],
        movie: {},
        posterPath: 'https://image.tmdb.org/t/p/w220_and_h330_face/',
        TMDB_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTRlZWMyZjgwYTM0YjdlZTcyZTRmZTRjODFhYmNmMiIsIm5iZiI6MTc5MTE5NDQwNC44NzY5OTk5LCJzdWIiOiI2YWMzNzUyNDJlZmVlYTNiYmEyYTY4MzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TgzW-z_nahMckDXm3FOFMCtM6slSx9GBj0Ip5YoAFbk'
    }),

    getters: {
        postTitle: (state) => 'GETTERS:' + state.post.title,
        watchedMovies: (state) => state.movies.filter(postItem => postItem.is_watched === true),
        ratingMovie: (state) => state.movie.vote_average ? state.movie.vote_average.toFixed(1) + ' ( ' + state.movie.vote_count + ' Проголосувало )' : ''
    },

    actions: {
        getMovies() {
            axios.get('https://api.themoviedb.org/3/movie/popular?language=uk-UA', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.TMDB_TOKEN}`
                }
            })
                .then(res => {
                    this.movies = res.data.results
                    this.movies.forEach(function (element) {
                        element.is_watched = false
                    });
                })
        },
        getMovie() {
            axios.get(`https://api.themoviedb.org/3/movie/${useRoute().params.id}?language=uk-UA`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.TMDB_TOKEN}`
                }
            })
                .then(res => {
                    this.movie = res.data
                })
        },
        async searchingMovies(searchQuery) {
            await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=uk-UA`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.TMDB_TOKEN}`
                }
            })
                .then(res => {
                    this.searchMovies = res.data.results
                })
        },
    },
})
