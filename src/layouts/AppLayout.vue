<template>
  <div>
    <section class="bg-white p4">
      <header>
      </header>
    </section>
    <section class="flex">
      <aside class="bg-gray-700 w-1/6 min-h-screen text-white">
        <router-link :to="{name: 'dashboard.searching'}" class="block p-4 border-b border-gray-500 text-gray-200">SEARCHING</router-link>
        <router-link :to="{name: 'movies.index'}" class="block p-4 border-b border-gray-500 text-gray-200">POPULAR MOVIES</router-link>
        <router-link :to="{name: 'movies.watched'}" class="block p-4 border-b border-gray-500 text-gray-200">WATCHED MOVIES</router-link>
      </aside>
      <article class="bg-gray-100 w-3/4 p-4">
        <slot />
      </article>
    </section>
  </div>
</template>

<script setup>
defineOptions({
  name: 'AppLayout'
})
</script>

<style scoped>

</style>
