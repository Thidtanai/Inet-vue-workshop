<template>
  <div>
    <h2>Home Page</h2>
    <p>bla...</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToAbout() {
      this.$router.push("/about");
    },
  },
};
</script>

<style>
</style>