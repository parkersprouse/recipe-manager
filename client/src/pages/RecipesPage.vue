<template>
  <b-container>
    <navbar />
    <div>
      Recipes Page
    </div>
    <span v-if="!recipes"></span>
    <span v-else-if="recipes.length === 0">You don't have any recipes!</span>
    <div v-else>
      <ul>
        <li v-for="item in recipes"><a :href="'/recipes/' + item.id">{{ item.title }}</a></li>
      </ul>
    </div>
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'recipes-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        api.getUsersRecipes(response.id, function(success, response) {
          this.recipes = response.content || [];
        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        recipes: null
      }
    }
  }
</script>
