<template>
  <b-container>
    <navbar></navbar>
    <router-view></router-view>
  </b-container>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  $fontcolor: #006600;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $fontcolor;
    margin-top: 60px;
  }
</style>
