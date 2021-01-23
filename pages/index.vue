<template>
  <div class="container">
    <div>
      <h1 class="title">
        fr-tools
      </h1>
      <div class="links">
        <NuxtLink to="/g1-pinglist">
          G1 Pinglist
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  /* Sample `apply` at-rules with Tailwind CSS
  .container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
  }
  */
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .links {
    padding-top: 15px;
  }
</style>
