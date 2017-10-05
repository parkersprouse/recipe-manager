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

            <div>
              <span class="select">
                <select v-model.number="perPage">
                  <option v-if="[5, 10, 20, 50, 100].indexOf(perPage) === -1">{{ perPage }}</option>
                  <option disabled value="" v-if="[5, 10, 20, 50, 100].indexOf(perPage) === -1">---</option>
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </span>
            </div>
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
          amount: this.perPage,
          pagniate: true
        };
        api.searchRecipes(data, function(success, response) {
          if (success) this.recipes = response.content;
          else this.recipes = [];
          data.pagniate = false;
          api.searchRecipes(data, function(success, response) {
            this.numPages = success ? Math.ceil(response.content.length / this.perPage) : 1;
            this.totalNumRecipes = success ? response.content.length : 0;
          }.bind(this));
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
        if (this.query !== '')
          window.location.href = '/recipes/search?q=' + this.query + '&p=' + this.page + '&n=' + this.perPage;
      }
    },
    watch: {
      perPage: function(val, oldVal) {
        window.location.href = '/recipes/search?q=' + this.query + '&p=1&n=' + val;
      }
    }
  }
</script>
