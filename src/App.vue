<template>
  <!-- <ul>
    <li><RouterLink :to="{ name: 'home' }">home</RouterLink></li>
    <li><RouterLink :to="{ name: 'about' }">about</RouterLink></li>
    <li>
      <RouterLink :to="{ name: 'product list' }">product list</RouterLink>
    </li>
  </ul> -->
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
