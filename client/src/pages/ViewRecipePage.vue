<template>
  <b-container>
    <navbar />
    <div v-if="!recipe"></div>
    <div v-else-if="recipe === -1">That recipe doesn't exist</div>
    <div v-else-if="recipe.private && recipe.user_id !== user.id">This recipe has been set to private</div>
    <div v-else>
      <h2>{{ recipe.title }}</h2>
      <span v-if="recipe.description">{{ recipe.description }}</span>
      <br /><br /><br />
      <h5>Ingredients</h5>
      <ul>
        <li v-for="item in recipe.ingredients">{{ item.amount }} {{ item.measurement }} {{ item.name }}</li>
      </ul>
      <br /><br />
      <h5>Steps</h5>
      <ol>
        <li v-for="item in recipe.steps">{{ item }}</li>
      </ol>
    </div>
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'view-recipe-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
        api.getRecipe(this.$route.params.id, function(success, response) {
          this.recipe = success ? response.content : -1;
        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        recipe: null
      }
    }
  }
</script>
