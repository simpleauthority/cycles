<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>Cycles</b-navbar-brand>
    </b-navbar>
    <b-container>
      <main>
        <nuxt />
      </main>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
body {
  background-color: $background;
}

#app {
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
