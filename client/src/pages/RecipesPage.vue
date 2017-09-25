<template>
  <b-container>
    <navbar />
    <h3>Your Recipes</h3>
    <span v-if="!recipes"></span>
    <span v-else-if="recipes.length === 0">You don't have any recipes!</span>
    <div v-else>
      <ul>
        <li v-for="item in recipes"><a :href="'/recipes/' + item.id">{{ item.title }}</a></li>
      </ul>
    </div>
    <br /><br />
    <paginator baseUrl="/recipes?" :toShow="perPage" :numPages="numPages" :page="page" />
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'recipes-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        const userid = response.id;
        api.getUsersRecipes(userid, function(success, response) {
          this.numPages = Math.ceil(response.content.length / this.perPage);
        }.bind(this));
        api.getPaginatedUserRecipes(userid, this.page, this.perPage, function(success, response) {
          this.recipes = response.content || [];
        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        recipes: null,
        numPages: 1,
        page: !!this.$route.query.p ? this.$route.query.p : 1,
        perPage: !!this.$route.query.n ? this.$route.query.n : 10
      }
    }
  }
</script>
