<template>
  <div>
    <div>
      <AppLayout>
        <router-view></router-view>
      </AppLayout>
    </div>
  </div>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";

defineOptions({
  name: 'App'
})

</script>

<style>

</style>

