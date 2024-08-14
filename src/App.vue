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
import { onMounted } from "vue";
import { RouterView } from "vue-router";

// useProductStore
import { useProductStore } from "./stores/product";
const product_store = useProductStore();

// useCartStore
import { useCartStore } from "./stores/cart";
const cart_store = useCartStore();

onMounted(() => product_store.fetch_products());
onMounted(() => cart_store.loadFromLocalStorage());
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
