<template>
  <form @submit.prevent="onSubmit">

    <div class="notification is-danger" v-if="!!errorMsg">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      {{ errorMsg }}
    </div>

    <div class="notification is-success" v-if="success">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
      Recipe updated successfully
    </div>

    <div style="margin-bottom: 1rem;">
      <button class="button is-danger is-pulled-right" :disabled="submitting" type="button" @click="showModal(true)" v-if="!!recipe">
        Delete Recipe
      </button>
      <button class="button is-primary" :class="submitting ? 'is-loading' : ''" type="submit">
        {{ !!recipe ? "Update" : "Create" }} Recipe
      </button>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="field">
              <input class="is-checkbox" id="private-checkbox" type="checkbox" name="private-checkbox" checked="checked" v-model="form.private">
              <label for="private-checkbox">Private?</label>
            </div>
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
      <!---->
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <label class="label">Steps</label>
            <div class="field is-grouped is-grouped-centered" v-for="(step, i) in form.steps">
              <div class="control">
                <a class="button is-static">
                  {{ i + 1 }}
                </a>
              </div>
              <div class="control is-expanded">
                <input class="input" :class="!state.steps[i] ? 'is-danger' : ''" v-model="form.steps[i]" type="text" placeholder="Step" />
              </div>
              <div class="control">
                <button class="button is-danger" :class="form.steps.length > 1 ? 'tooltip' : ''" type="button" @click="remove(i, 'steps')" :disabled="form.steps.length < 2" data-tooltip="Remove Step">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-info" type="button" @click="add('steps')">
                  Add Step
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <!---->
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <label class="label">Ingredients</label>

            <div v-for="(item, i) in form.ingredients">
              <div v-if="isMobile" style="margin-bottom: 0.75rem;">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-static">
                      {{ i + 1 }}
                    </a>
                  </div>
                  <div class="control is-expanded" style="width: 83px;">
                    <input class="input" :class="!state.ingredients[i].amount ? 'is-danger' : ''" v-model="form.ingredients[i].amount" type="text" placeholder="Amount" />
                  </div>
                  <div class="control">
                    <span class="select" :class="!state.ingredients[i].measurement ? 'is-danger' : ''">
                      <select v-model="form.ingredients[i].measurement">
                        <option v-for="item in form.ingredientOptions">{{ item }}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <div class="control is-expanded">
                    <input class="input" :class="!state.ingredients[i].name ? 'is-danger' : ''" v-model="form.ingredients[i].name" type="text" placeholder="Ingredient" />
                  </div>
                  <div class="control">
                    <button class="button is-danger" :class="form.ingredients.length > 1 ? 'tooltip' : ''" type="button" @click="remove(i, 'ingredients')" :disabled="form.ingredients.length < 2" data-tooltip="Remove Ingredient">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <hr />
              </div>
              <div v-else style="margin-bottom: 0.75rem;">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-static">
                      {{ i + 1 }}
                    </a>
                  </div>
                  <div class="control" style="width: 83px;">
                    <input class="input" :class="!state.ingredients[i].amount ? 'is-danger' : ''" v-model="form.ingredients[i].amount" type="text" placeholder="Amount" />
                  </div>
                  <div class="control">
                    <span class="select" :class="!state.ingredients[i].measurement ? 'is-danger' : ''">
                      <select v-model="form.ingredients[i].measurement">
                        <option v-for="item in form.ingredientOptions">{{ item }}</option>
                      </select>
                    </span>
                  </div>
                  <div class="control is-expanded">
                    <input class="input" :class="!state.ingredients[i].name ? 'is-danger' : ''" v-model="form.ingredients[i].name" type="text" placeholder="Ingredient" />
                  </div>
                  <div class="control">
                    <button class="button is-danger" :class="form.ingredients.length > 1 ? 'tooltip' : ''" type="button" @click="remove(i, 'ingredients')" :disabled="form.ingredients.length < 2" data-tooltip="Remove Ingredient">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control has-text-centered">
                <button class="button is-info" type="button" @click="add('ingredients')">
                  Add Ingredient
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <!---->
    </div>

    <div class="modal" :class="showDeleteModal ? 'is-active' : ''" v-if="!!recipe">
      <div class="modal-background" @click="showModal(false)"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete Recipe?</p>
          <button class="delete" aria-label="close" @click="showModal(false)" type="button"></button>
        </header>
        <section class="modal-card-body">
          Are you sure you want to delete this recipe?<br />
          <strong>This cannot be undone!</strong>
        </section>
        <footer class="modal-card-foot flex-right">
          <button class="button is-danger" @click="onDelete" type="button">Yes</button>
          <button class="button is-info" @click="showModal(false)" type="button">No</button>
        </footer>
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
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        this.getWindowWidth()
      });

      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
      }.bind(this));

      if (!!this.recipe) {
        this.form.title = this.recipe.title;
        this.form.description = this.recipe.description;
        this.form.private = this.recipe.private;

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
            ingsStates.push({ name: true, measurement: true, amount: true });
          }
        }
        this.form.ingredients = ings;
        this.state.ingredients = ingsStates;
      }
    },
    data: function() {
      return {
        windowWidth: 0,
        showDeleteModal: false,
        user: null,
        submitting: false,
        errorMsg: null,
        success: false,
        form: {
          title: '',
          description: '',
          steps: [''],
          ingredients: [{ name: '', measurement: '', amount: '' }],
          ingredientOptions: ['c', 'g', 'kg', 'l', 'lb', 'ml', 'oz', 'pt', 'tbsp', 'tsp'],
          private: false
        },
        state: {
          title: true,
          steps: [true],
          ingredients: [{ name: true, measurement: true, amount: true }]
        }
      }
    },
    computed: {
      isMobile: function() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
      }
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      },
      showModal(show) {
        this.showDeleteModal = show;
      },
      add(type) {
        if (type === 'steps') {
          this.form.steps.push('');
          this.state.steps.push(true);
        }
        else {
          this.form.ingredients.push({ name: '', measurement: '', amount: '' });
          this.state.ingredients.push({ name: true, measurement: true, amount: true });
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
        this.state.ingredients.fill({ name: true, measurement: true, amount: true });
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
          private: this.form.private
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
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    }
  }
</script>
