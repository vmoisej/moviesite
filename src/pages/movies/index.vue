<template>
  <div class="p-4 w-full text-center">
    Popular Movies on The Movie Database (TMDB)
  </div>
  <div>
    <div>
      <table class="w-full border border-gray-200">
        <thead>
        <tr>
          <th class="bg-white border-b border-gray-200 text-left p-2 w-2">WATCHED</th>
          <th class="bg-white border-b border-gray-200 text-left p-2">POSTER</th>
          <th class="bg-white border-b border-gray-200 text-left p-2">TITLE</th>
          <th class="bg-white border-b border-gray-200 text-left p-2">YEAR</th>
          <th class="bg-white border-b border-gray-200 text-left p-2">RATING (VOTE COUNT)</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movieStore.movies" :key="movie.id">
            <td class="bg-white border-b border-gray-200 p-2 ml-4">
              <svg @click="movie.is_watched = !movie.is_watched" xmlns="http://www.w3.org/2000/svg" :fill="movie.is_watched ? 'text-sky-600' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-sky-600 cursor-pointer m-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </td>
            <td class="bg-white border-b border-gray-200 text-left p-2">
              <img
                :src="posterMovie(movie)"
                :alt="movie.title"
                class="poster w-16"
            /></td>
            <td class="bg-white border-b border-gray-200 text-left p-2 underline text-sky-700">
              <router-link :to="{name: 'movies.show', params: {id: movie.id}}">{{ movie.title }}</router-link>
            </td>
            <td class="bg-white border-b border-gray-200 text-left p-2">{{ movie.release_date?.slice(0, 4) }}</td>
            <td class="bg-white border-b border-gray-200 text-left p-2 rating">⭐ {{ movie.vote_average.toFixed(1) }} ({{ movie.vote_count }})</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useMoviesStore } from "@/stores/movies.js";

defineOptions({
  name: 'Index'
})

const movieStore = useMoviesStore()

onMounted(() => {
  movieStore.getMovies()
})

const posterMovie = function(movie) {
  return 'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path
}
</script>

<style scoped>
</style>
