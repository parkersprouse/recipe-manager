<template>
  <b-container>
    <navbar />
    <div>
      Home Page
    </div>
    <div>
      <a href="/recipes">My Recipes</a>
      <br />
      <a href="/recipes/add">Add Recipe</a>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'home-page',
    data: function() {
      return {

      }
    }
  }
</script>
