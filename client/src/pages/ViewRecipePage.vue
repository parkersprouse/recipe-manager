<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navbar />
          <div v-if="!recipe"></div>
          <div v-else-if="recipe === -1" class="has-text-centered">That recipe doesn't exist</div>
          <div v-else-if="recipe.private && recipe.user_id !== user.id" class="has-text-centered">This recipe has been set to private</div>
          <div v-else>

            <div class="recipe-top-container">
              <div>
                <a :href="'/recipes/' + recipe.id + '/edit'" class="button is-info">Edit Recipe</a>
              </div>
              <div v-if="!!recipe.date" class="top-right">
                <span class="tag">
                  {{ convertDate(recipe.date) }}
                </span>
              </div>
            </div>

            <section class="hero is-primary is-bold has-ribbon view-recipe-body" style="margin-bottom: 1.5rem;">
              <div class="ribbon is-info tooltip is-tooltip-left" data-tooltip="This recipe can only be viewed by you" v-if="recipe.private">Private</div>
              <div class="ribbon is-info tooltip is-tooltip-left" data-tooltip="This recipe can be viewed by anyone" v-else>Public</div>
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                    {{ recipe.title }}
                  </h1>
                  <h2 class="subtitle" v-if="recipe.description">
                    {{ recipe.description }}
                  </h2>
                  <h2 class="subtitle" v-else>
                    <i>No description</i>
                  </h2>
                </div>
              </div>
            </section>

            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">Ingredients</p>
                  <div class="content">
                    <p>
                      <ul>
                        <li v-for="item in recipe.ingredients">{{ item.amount }} {{ item.measurement }} {{ item.name }}</li>
                      </ul>
                    </p>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">Directions</p>
                  <div class="content">
                    <p>
                      <ol>
                        <li v-for="item in recipe.steps" style="white-space: pre-line;">{{ item }}</li>
                      </ol>
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div class="tile is-ancestor" v-if="!!recipe.notes">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">Additional Notes</p>
                  <div class="content">
                    <p style="white-space: pre-line;">{{ recipe.notes }}</p>
                  </div>
                </article>
              </div>
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
    name: 'view-recipe-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
        api.getRecipe(this.$route.params.id, function(success, response) {
          this.recipe = success ? response.content : -1;
        }.bind(this));
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        recipe: null
      }
    },
    methods: {
      convertDate(date) {
        return moment(date).format("MMMM Do, YYYY")
      }
    }
  }
</script>
