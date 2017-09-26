<template>
  <b-container>
    <navbar />
    <h3>Your Recipes</h3>
    <span v-if="!recipes || !numPages"></span>
    <div v-else>
      <p><paginator baseUrl="/recipes?" :toShow="perPage" :numPages="numPages" :page="page" /></p>
      <div v-if="recipes.length === 0">
        This page does not have any recipes.
      </div>
      <div v-else>
        <div v-for="item in recipes" class="card" style="margin-bottom: 1rem; cursor: pointer;" v-on:click="viewRecipe(item.id)">
          <div class="card-body">
            <div class="float-right" style="text-align: right;">
              <a class="btn btn-outline-dark align-middle" :href="'/recipes/' + item.id + '/edit'" role="button">Edit Recipe</a>
            </div>
            <h4 class="card-title" style="margin-bottom: 1rem;">{{ item.title }}</h4>
            <h6 class="card-subtitle mb-2 text-muted" v-if="!!item.description">{{ item.description }}</h6>
            <h6 class="card-subtitle mb-2 text-muted" v-else><i>No description</i></h6>
          </div>
        </div>
      </div>
      <p><paginator baseUrl="/recipes?" :toShow="perPage" :numPages="numPages" :page="page" /></p>
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
        recipes: null,
        numPages: null,
        page: !!this.$route.query.p ? this.$route.query.p : 1,
        perPage: !!this.$route.query.n ? this.$route.query.n : 10
      }
    },
    methods: {
      viewRecipe(id) {
        window.location.href = '/recipes/' + id;
      }
    }
  }
</script>
