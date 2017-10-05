<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />
          <h3 class="title is-3" style="margin-bottom: 0.5rem;">My Recipes</h3>
          <h5 class="title is-5" v-if="recipes && numPages">Total recipes: {{ totalNumRecipes }}</h5>
          <div v-if="!recipes || !numPages"></div>
          <div v-else>

            <hr />
            <div class="columns is-centered" style="margin-bottom: -0.75rem;">
              <div class="column is-half is-narrow">
                <form @submit.prevent="performSearch">
                  <div class="field has-addons">
                    <div class="control is-expanded has-icons-left">
                      <input class="input" type="text" placeholder="Search Recipes" v-model="query">
                      <span class="icon is-small is-left">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div class="control">
                      <button class="button is-info" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />

            <pagination
              :current="page"
              :total="numPages * perPage"
              :itemsPerPage="perPage"
              :onChange="onChange"
              :step="1">
            </pagination>
            <div v-if="recipes.length === 0">
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-centered">
                    This page does not have any recipes.
                  </div>
                </div>
              </div>
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
            this.totalNumRecipes = response.content.length;
          }.bind(this));

        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        query: '',
        recipes: null,
        numPages: null,
        totalNumRecipes: 0,
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
      },
      performSearch() {
        if (this.query !== '')
          window.location.href = '/recipes/search?q=' + this.query;
      }
    }
  }
</script>
