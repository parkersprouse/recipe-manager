<template>
  <form @submit.prevent="onSubmit">

    <div class="notification is-danger" v-if="!!errorMsg">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      {{ errorMsg }}
    </div>

    <div class="field">
      <div class="control is-pulled-right">
        <button class="button is-danger" :disabled="submitting" type="button">
          Delete Recipe
        </button>
      </div>
      <div class="control">
        <button class="button is-primary" :class="submitting ? 'is-loading' : ''" type="submit">
          {{ !!recipe ? "Update" : "Create" }} Recipe
        </button>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" :class="!state.title ? 'is-danger' : ''" v-model="form.title" type="text" placeholder="Title">
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea class="textarea" v-model="form.description" type="text" placeholder="Description" rows="3"></textarea>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">

      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <label class="label">Steps</label>
              <div class="control">
                <textarea class="textarea" :class="!state.description ? 'is-danger' : ''" v-model="form.description" type="text" placeholder="Description" rows="2"></textarea>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <label class="label">Ingredients</label>
              <div class="control">
                <textarea class="textarea" :class="!state.description ? 'is-danger' : ''" v-model="form.description" type="text" placeholder="Description" rows="3"></textarea>
              </div>
            </div>
          </div>
        </article>
      </div>

    </div>

  </form>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'recipe-form',
    props: ['recipe'],
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
      }.bind(this));

      if (!!this.recipe) {
        this.form.title = this.recipe.title;
        this.form.description = this.recipe.description;
        this.form.private = this.recipe.private + '';

        let stepsStates = [];
        for (let i in this.recipe.steps)
          stepsStates.push(true);
        this.form.steps = this.recipe.steps;
        this.state.steps = stepsStates;

        let ings = [];
        let ingsStates = [];
        for (let i in this.recipe.ingredients) {
          if (this.recipe.ingredients.hasOwnProperty(i)) {
            let ing = this.recipe.ingredients[i];
            ings.push({ name: ing.name, measurement: ing.measurement, amount: ing.amount });
            ingsStates.push({name: true, measurement: true, amount: true});
          }
        }
        this.form.ingredients = ings;
        this.state.ingredients = ingsStates;
      }
    },
    data: function() {
      return {
        user: null,
        submitting: false,
        errorMsg: null,
        success: false,
        form: {
          title: '',
          description: '',
          steps: [''],
          ingredients: [{name: '', measurement: '', amount: ''}],
          ingredientOptions: ['c', 'g', 'kg', 'l', 'lb', 'ml', 'oz', 'pt', 'tbsp', 'tsp'],
          private: 'false'
        },
        state: {
          title: true,
          steps: [true],
          ingredients: [{name: true, measurement: true, amount: true}]
        }
      }
    },
    methods: {
      add(type) {
        if (type === 'steps') {
          this.form.steps.push('');
          this.state.steps.push(true);
        }
        else {
          this.form.ingredients.push({name: '', measurement: '', amount: ''});
          this.state.ingredients.push({name: true, measurement: true, amount: true});
        }
      },
      remove(index, type) {
        if (this.form[type].length > 1) {
          this.form[type].splice(index, 1);
          this.state[type].splice(index, 1);
        }
      },
      resetErrors() {
        this.success = false;
        this.errorMsg = null;
        this.state.title = true;
        this.state.steps.fill(true);
        this.state.ingredients.fill({name: true, measurement: true, amount: true});
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        const data = {
          title: this.form.title,
          description: this.form.description,
          steps: this.form.steps,
          ingredients: {},
          id: !!this.recipe ? this.recipe.id : this.user.id,
          private: this.form.private === 'true' ? true : false
        }

        for (let i = 0; i < this.form.ingredients.length; i++) {
          const ing = this.form.ingredients[i];
          data.ingredients[i] = { name: ing.name, measurement: ing.measurement, amount: ing.amount };
        }

        const submissionMethod = !!this.recipe ? api.updateRecipe : api.addRecipe;
        submissionMethod(data, function(success, response) {
          if (success) {
            if (!!this.recipe) {
              this.success = true;
              this.submitting = false;
            }
            else
              window.location.href = '/recipes/' + response.content.id;
          }
          else {
            this.state.title = response.data.content.titleState;
            this.state.steps = response.data.content.stepsState;
            this.state.ingredients = response.data.content.ingredientsState;
            this.errorMsg = response.data.message;
            this.submitting = false;
          }
        }.bind(this));
      },
      onDelete(event) {
        api.deleteRecipe(this.recipe.id, function(success, response) {
          if (success) {
            window.location.href = '/recipes';
          }
          else {
            this.errorMsg = 'There was a problem when attempting to delete the recipe';
          }
        }.bind(this));
      }
    }
  }
</script>
