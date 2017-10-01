<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />
          <h3 class="title is-3">My Recipes</h3>
          <div v-if="!recipes || !numPages"></div>
          <div v-else>
            <pagination
              :current="page"
              :total="numPages * perPage"
              :itemsPerPage="perPage"
              :onChange="onChange"
              :step="1">
            </pagination>
            <div v-if="recipes.length === 0">
              This page does not have any recipes.
            </div>
            <div v-else>
              <div class="card recipe-card" v-for="item in recipes" v-on:click="viewRecipe(item.id)">
                <header class="card-header">
                  <p class="card-header-title">
                    {{ item.title }}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <span v-if="!!item.description">{{ item.description }}</span>
                    <span v-else><i>No description</i></span>
                  </div>
                </div>
                <footer class="card-footer">
                  <a :href="'/recipes/' + item.id + '/edit'" class="card-footer-item">Edit Recipe</a>
                </footer>
              </div>
            </div>
            <pagination
              :current="page"
              :total="numPages * perPage"
              :itemsPerPage="perPage"
              :onChange="onChange"
              :step="1">
            </pagination>
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
    name: 'recipes-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        const userid = response.id;
        api.getPaginatedUserRecipes(userid, this.page, this.perPage, function(success, response) {
          this.recipes = response.content || [];

          api.getUsersRecipes(userid, function(success, response) {
            this.numPages = Math.ceil(response.content.length / this.perPage);
          }.bind(this));

        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        recipes: null,
        numPages: null,
        page: !!this.$route.query.p ? parseInt(this.$route.query.p, 10) : 1,
        perPage: !!this.$route.query.n ? parseInt(this.$route.query.n, 10) : 10
      }
    },
    methods: {
      viewRecipe(id) {
        window.location.href = '/recipes/' + id;
      },
      onChange(page) {
        window.location.href = '/recipes?p=' + page + '&n=' + this.perPage;
      }
    }
  }
</script>
