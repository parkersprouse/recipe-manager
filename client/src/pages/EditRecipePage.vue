<template>
  <b-container>
    <navbar />
    <div v-if="!recipe"></div>
    <div v-else-if="recipe === -1">That recipe doesn't exist</div>
    <div v-else>
      <h3>Edit Recipe</h3>
      <recipe-form :recipe="recipe" />
    </div>
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'edit-recipe-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
        api.getRecipe(this.$route.params.id, function(success, response) {
          if (success) {
            if (response.content.user_id !== this.user.id)
              window.location.href = "/recipes";
            else
              this.recipe = response.content;
          }
          else
            this.recipe = -1;
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
