<template>
  <b-form @submit.prevent="onSubmit">

    <b-alert variant="danger" :show="!!errorMsg">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
    </b-alert>

    <b-alert variant="success" :show="success">
      <i class="fa fa-check-circle" aria-hidden="true"></i> Your recipe has been successfully updated
    </b-alert>

    <div style="margin-top: 15px; margin-bottom: 15px;">
      <div class="text-align-right float-right" v-if="!!recipe">
        <b-button v-b-modal.deleteModal type="button" variant="danger" :disabled="submitting">Delete Recipe</b-button>
      </div>
      <div>
        <b-button type="submit" variant="primary" :disabled="submitting">{{ !!recipe ? "Update" : "Create" }} Recipe</b-button>
      </div>
    </div>

    <b-card>
      <b-form-group id="recipePrivateGroup">
        <b-form-checkbox id="recipePrivateField" v-model="form.private" value="true" unchecked-value="false">Make Private?</b-form-checkbox>
      </b-form-group>

      <b-form-group id="recipeTitleGroup" label="Title:" label-for="recipeTitleField">
        <b-form-input id="recipeTitleField" type="text" v-model="form.title" placeholder="Title" :state="state.title" />
      </b-form-group>

      <b-form-group id="recipeDescGroup" label="Description:" label-for="recipeDescField">
        <b-form-textarea id="recipeDescField" v-model="form.description" placeholder="Description" rows="3" max-rows="3" state="valid"></b-form-textarea>
      </b-form-group>
    </b-card>

    <hr />

    <div class="row align-items-center">
      <div class="col">
        <b-card>
          <b-form-group id="recipeStepGroup" label="Steps:" label-for="recipeStepField">
            <b-input-group v-for="(step, i) in form.steps" class="step-input-group">
              <b-tooltip :target="'removeStepBtn' + i" title="Remove Step" triggers="hover" v-if="form.steps.length > 1"></b-tooltip>
              <b-input-group-addon>{{ i + 1 }}.</b-input-group-addon>
              <b-form-textarea id="recipeStepField" v-model="form.steps[i]" rows="1" max-rows="3" :state="state.steps[i]"></b-form-textarea>
              <b-input-group-button>
                <b-btn variant="danger" :id="'removeStepBtn' + i" @click="remove(i, 'steps')" :disabled="form.steps.length < 2"><i class="fa fa-times" aria-hidden="true"></i></b-btn>
              </b-input-group-button>
            </b-input-group>
            <div class="text-align-center">
              <b-button type="button" variant="primary" @click="add('steps')">Add Step</b-button>
            </div>
          </b-form-group>
        </b-card>
      </div>
      <div class="col">
        <b-card>
          <b-form-group id="recipeIngredientGroup" label="Ingredients:" label-for="recipeIngredientField">
            <b-input-group v-for="(item, i) in form.ingredients" class="step-input-group">
              <b-tooltip :target="'removeIngredientBtn' + i" title="Remove Ingredient" triggers="hover" v-if="form.ingredients.length > 1"></b-tooltip>
              <b-input-group-addon>{{ i + 1 }}.</b-input-group-addon>
              <b-form-input type="text" v-model="form.ingredients[i].amount" :state="state.ingredients[i].amount" />
              <b-form-select v-model="form.ingredients[i].measurement" :options="form.ingredientOptions" :state="state.ingredients[i].measurement"></b-form-select>
              <b-form-input type="text" v-model="form.ingredients[i].name" :state="state.ingredients[i].name" />
              <b-input-group-button>
                <b-btn variant="danger" :id="'removeIngredientBtn' + i" @click="remove(i, 'ingredients')" :disabled="form.ingredients.length < 2"><i class="fa fa-times" aria-hidden="true"></i></b-btn>
              </b-input-group-button>
            </b-input-group>
            <div class="text-align-center">
              <b-button type="button" variant="primary" @click="add('ingredients')">Add Ingredient</b-button>
            </div>
          </b-form-group>
        </b-card>
      </div>
    </div>

    <b-modal id="deleteModal" ref="deleteModal" title="Delete Recipe?" @ok="onDelete" ok-title="Yes" close-title="No">
      This cannot be undone!
    </b-modal>

  </b-form>
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
          stepsStates.push('valid');
        this.form.steps = this.recipe.steps;
        this.state.steps = stepsStates;

        let ings = [];
        let ingsStates = [];
        for (let i in this.recipe.ingredients) {
          if (this.recipe.ingredients.hasOwnProperty(i)) {
            let ing = this.recipe.ingredients[i];
            ings.push({ name: ing.name, measurement: ing.measurement, amount: ing.amount });
            ingsStates.push({name: 'valid', measurement: 'valid', amount: 'valid'});
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
          title: 'valid',
          steps: ['valid'],
          ingredients: [{name: 'valid', measurement: 'valid', amount: 'valid'}]
        }
      }
    },
    methods: {
      add(type) {
        if (type === 'steps') {
          this.form.steps.push('');
          this.state.steps.push('valid');
        }
        else {
          this.form.ingredients.push({name: '', measurement: '', amount: ''});
          this.state.ingredients.push({name: 'valid', measurement: 'valid', amount: 'valid'});
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
        this.state.title = 'valid';
        this.state.steps.fill('valid');
        this.state.ingredients.fill({name: 'valid', measurement: 'valid', amount: 'valid'});
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
        console.log('deleted')
      }
    }
  }
</script>
