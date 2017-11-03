<template>
  <div>
    <div v-if="!recipe"></div>
    <div v-else-if="recipe === -1" class="has-text-centered">That recipe doesn't exist</div>
    <div v-else-if="recipe.private && recipe.user_id !== user.id" class="has-text-centered">This recipe has been set to private</div>
    <div v-else>

      <div class="recipe-top-container">
        <div class="top-right">
          <span class="tag is-white" v-if="!!recipe.date">
            Added {{ readableDate }}
          </span>
        </div>
      </div>

      <section class="hero is-primary view-recipe-body">
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
              <div v-for="item in recipe.ingredients" style="margin-bottom: 0.5rem;">
                <checklist-toggle>&bull; {{ item.amount }} {{ item.measurement }} {{ item.name }}</checklist-toggle>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Directions</p>
            <div class="content">
              <div v-for="(item, index) in recipe.steps" style="white-space: pre-line; margin-bottom: 0.5rem;">
                <checklist-toggle>{{ index + 1 }}. {{ item }}</checklist-toggle>
              </div>
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

      <div>
        <a :href="'/recipes/' + recipe.id + '/edit'" class="button is-info"><i class="fa fa-pencil-square-o btn-icon"></i> Edit</a>
      </div>

    </div>
  </div>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

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
    computed: {
      readableDate: function() {
        return utils.makeDateReadable(this.recipe.date);
      }
    }
  }
</script>
