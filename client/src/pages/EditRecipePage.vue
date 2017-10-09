<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />
          <div v-if="!recipe"></div>
          <div v-else-if="recipe === -1">That recipe doesn't exist</div>
          <div v-else>
            <div style="margin-top: -1rem; margin-bottom: 1rem;">
              <a :href="'/recipes/' + $route.params.id"><i class="fa fa-angle-double-left" aria-hidden="true"></i> Back to recipe</a>
            </div>
            <h3 class="title is-3">Edit Recipe</h3>
            <recipe-form :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </section>
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
