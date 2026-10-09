<template>
  <div>
    <div class="w-1/2 mx-auto p-4">
      <h3>Movie from The Movie Database (TMDB)</h3>
    </div>
  </div>
  <div>
    <div>
      <div class="bg-white border-b border-gray-200 text-left p-2 flex">
        <img
            :src="'https://image.tmdb.org/t/p/w440_and_h660_face/' + movie.poster_path"
            :alt="movie.title"
            class="poster"
        />
        <table class="w-full border border-gray-200">
          <tbody>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2 w-3/12">Найменування:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2">{{ movie.title }}</td>
            </tr>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2">Оригінальна назва:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2">{{ movie.original_title }}</td>
            </tr>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2">Дата релізу:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2">{{ movie.release_date }}</td>
            </tr>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2">Короткий зміст:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2">{{ movie.overview }}</td>
            </tr>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2">Бюджет:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2">${{ formatPrice(movie.budget) }}</td>
            </tr>
            <tr>
              <td class="bg-white border-b border-gray-200 text-left p-2">Середній рейтинг:</td>
              <td class="bg-white border-b border-gray-200 text-left p-2 rating">⭐ {{ movieStore.ratingMovie }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useMoviesStore } from "@/stores/movies.js";

defineOptions({
  name: 'Show'
})

const movieStore = useMoviesStore()
const movie = computed(
    () => movieStore.movie ? movieStore.movie : {}
)
// const movieRating = computed(
//     () => movieStore.movie.vote_average ? movieStore.movie.vote_average.toFixed(1) + ' ( ' + movieStore.movie.vote_count + ' Проголосувало )' : ''
// )

onMounted(() => {
  movieStore.getMovie()
})

const formatPrice = function(value) {
  let val = (value/1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
</script>

<style scoped>
</style>
