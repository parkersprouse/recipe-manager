<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />
          <h3 class="title is-3" style="margin-bottom: 0.5rem;">Search Results for "{{ $route.query.q }}"</h3>
          <h5 class="title is-5" v-if="recipes && numPages">Total results: {{ totalNumRecipes }}</h5>
          <div v-if="!recipes || !numPages"></div>
          <div v-else>

            <hr />
            <div class="columns is-centered" style="margin-bottom: -0.75rem;">
              <div class="column is-half is-narrow">
                <form @submit.prevent="performSearch">
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input class="input" type="text" placeholder="Search Recipes" v-model="query">
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
                    Your search had no results.
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
    name: 'recipe-search-results-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        const data = {
          userid: response.id,
          query: this.query,
          page: this.page,
          amount: this.perPage
        };

        api.searchRecipes(data, function(success, response) {
          if (success) {
            this.recipes = response.content || [];
            this.numPages = Math.ceil(response.content.length / this.perPage);
            this.totalNumRecipes = response.content.length;
          }
          else {
            this.recipes = [];
            this.numPages = 1;
            this.totalNumRecipes = 0;
          }
        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        query: this.$route.query.q,
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
        window.location.href = '/recipes/search?q=' + this.query + '&p=' + page + '&n=' + this.perPage;
      },
      performSearch() {
        window.location.href = '/recipes/search?q=' + this.query + '&p=' + this.page + '&n=' + this.perPage;
      }
    }
  }
</script>
