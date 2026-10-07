<template>
  <div class="w-1/2 mx-auto p-4">
    <h1>🔎 Пошук фільмів на The Movie Database (TMDB)</h1>
  </div>
  <div class="w-1/2 mx-auto p-4">
    <div class="bg-white border border-gray-200 p-4 mb-4 flex">
      <div class="w-10/12">
        <input v-model="searchQuery" type="text" placeholder="Введіть назву фільму (наприклад, Batman)..." class="p-2 border border-gray-200 w-full">
      </div>
      <div class="w-2/12 inline ml-2">
        <a @click.prevent="searchMovies" gref="#" class="block px-2 py-2 bg-sky-600 border border-sky-700 text-white text-center">{{ isLoading ? 'Пошук...' : 'Знайти' }}</a>
      </div>
    </div>
    <div v-if="errorMessage.length > 0" class="mb-4 text-red-600">
      {{ errorMessage }}
    </div>
  </div>

  <div v-if="movieStore.searchMovies.length > 0">
    <table class="w-full border border-gray-200">
      <thead>
      <tr>
        <th class="bg-white border-b border-gray-200 text-left p-2">POSTER</th>
        <th class="bg-white border-b border-gray-200 text-left p-2">TITLE</th>
        <th class="bg-white border-b border-gray-200 text-left p-2">YEAR</th>
        <th class="bg-white border-b border-gray-200 text-left p-2">RATING (VOTE COUNT)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="movie in movieStore.searchMovies" :key="movie.id">
        <td class="bg-white border-b border-gray-200 text-left p-2">
          <img
              :src="'https://image.tmdb.org/t/p/w440_and_h660_face/' + movie.poster_path"
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

</template>

<script setup>
import { ref } from 'vue'
import { useMoviesStore } from "@/stores/movies.js";

defineOptions({
  name: 'Searching'
})

const movieStore = useMoviesStore()

const searchQuery = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const searchMovies = function() {
  if (!searchQuery.value.trim()) return

  isLoading.value = true
  try {
    movieStore.searchingMovies(encodeURIComponent(searchQuery.value))
      .then(() => {
        errorMessage.value = movieStore.searchMovies.length > 0 ? '' : 'Фільмів не знайдено'
      })
  } catch (error) {
    errorMessage.value = 'Сталася помилка при завантаженні даних.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
</style>
