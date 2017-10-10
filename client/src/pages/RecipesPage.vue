<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />

          <form @submit.prevent="performSearch" class="is-pulled-right" v-if="!isMobile">
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

          <h3 class="title is-3" style="margin-bottom: 0.5rem;">My Recipes</h3>
          <h5 class="title is-5" v-if="recipes && numPages">Total recipes: {{ totalNumRecipes }}</h5>
          <div v-if="!recipes || !numPages"></div>
          <div v-else>

            <div class="columns is-centered" v-if="isMobile">
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
                  <div class="content has-text-centered" v-if="totalNumRecipes > 0">
                    This page does not have any recipes.
                  </div>
                  <div class="content has-text-centered" v-else>
                    You don't have any recipes yet. Why don't you <a href="/recipes/add">add one</a>?
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
                    <div v-if="!!item.description">{{ item.description }}</div>
                    <div v-else><i>No description</i></div>
                  </div>
                </div>
                <footer class="card-footer">
                  <div class="card-footer-item recipe-card-date" v-if="!!item.date">
                    <span class="tag is-white">
                      {{ makeDateReadable(item.date) }}
                    </span>
                  </div>
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

            <div>
              Show
              <span class="select is-small">
                <select v-model.number="perPage">
                  <option v-if="!perPageInList">{{ perPage }}</option>
                  <option disabled value="" v-if="!perPageInList">---</option>
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </span>
              per page
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
  import moment from 'moment';

  export default {
    name: 'recipes-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        const userid = response.id;
        api.getPaginatedUserRecipes(userid, this.page, this.perPage, function(success, response) {
          this.recipes = response.content || [];

          api.getUsersRecipes(userid, function(success, response) {
            if (success) {
              this.numPages = Math.ceil(response.content.length / this.perPage);
              this.totalNumRecipes = response.content.length;
            }
            else {
              this.numPages = 1;
              this.totalNumRecipes = 0;
            }
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
        perPage: !!this.$route.query.n ? parseInt(this.$route.query.n, 10) : 10,
        isMobile: utils.isMobile()
      }
    },
    computed: {
      perPageInList: function() {
        return [5, 10, 20, 50, 100].indexOf(this.perPage) > -1;
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
          window.location.href = '/recipes/search?q=' + this.query + '&n=' + this.perPage;
      },
      makeDateReadable(date) {
        return utils.makeDateReadable(date);
      }
    },
    watch: {
      perPage: function(val, oldVal) {
        window.location.href = '/recipes?p=1&n=' + val;
      }
    }
  }
</script>
