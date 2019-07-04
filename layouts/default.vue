<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Cycles</b-navbar-brand>
    </b-navbar>
    <b-container>
      <main>
        <nuxt />
      </main>
    </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#app {
  background-color: $background;
  min-height: 100vh;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: $secondary;
  }
}
</style>
