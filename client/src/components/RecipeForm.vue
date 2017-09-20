<template>
  <b-form @submit.prevent="onSubmit">

    <b-container>
      <b-alert variant="danger" :show="!!errorMsg">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
      </b-alert>

      <div class="text-align-right">
        <b-button type="submit" variant="primary" :disabled="submitting">Create Recipe</b-button>
      </div>

      <b-form-group id="recipeTitleGroup" label="Title:" label-for="recipeTitleField">
        <b-form-input id="recipeTitleField" type="text" v-model="form.title" placeholder="Title" :state="state.title" />
      </b-form-group>

      <b-form-group id="recipeDescGroup" label="Description:" label-for="recipeDescField">
        <b-form-textarea id="recipeDescField" v-model="form.description" placeholder="Description" rows="3" max-rows="3" state="valid"></b-form-textarea>
      </b-form-group>

      <b-form-group id="recipeStepGroup" label="Steps:" label-for="recipeStepField">
        <b-input-group v-for="(step, i) in form.steps" class="step-input-group">
          <b-tooltip :target="'removeStepBtn' + i" title="Remove Step" triggers="hover" v-if="form.steps.length > 1"></b-tooltip>
          <b-input-group-addon>{{ i + 1 }}.</b-input-group-addon>
          <b-form-textarea id="recipeStepField" v-model="form.steps[i]" rows="1" max-rows="3" :state="state.steps"></b-form-textarea>
          <b-input-group-button>
            <b-btn variant="danger" :id="'removeStepBtn' + i" @click="removeStep(i)" :disabled="form.steps.length < 2"><i class="fa fa-times" aria-hidden="true"></i></b-btn>
          </b-input-group-button>
        </b-input-group>
        <div class="text-align-center">
          <b-button type="button" variant="primary" @click="addStep">Add Step</b-button>
        </div>
      </b-form-group>

      <b-form-group id="recipeIngredientGroup" label="Ingredients:" label-for="recipeIngredientField">
        <b-input-group v-for="(item, i) in form.ingredients" class="step-input-group">
          <b-tooltip :target="'removeIngredientBtn' + i" title="Remove Ingredient" triggers="hover" v-if="form.ingredients.length > 1"></b-tooltip>
          <b-input-group-addon>{{ i + 1 }}.</b-input-group-addon>

          <b-form-input type="text" v-model="form.ingredients[i].amount" :state="state.ingredients[i]" />
          <b-form-select v-model="form.ingredients[i].measurement" :options="form.ingredientOptions" :state="state.ingredients[i]"></b-form-select>
          <b-form-input type="text" v-model="form.ingredients[i].name" :state="state.ingredients[i]" />

          <b-input-group-button>
            <b-btn variant="danger" :id="'removeIngredientBtn' + i" @click="removeIngredient(i)" :disabled="form.ingredients.length < 2"><i class="fa fa-times" aria-hidden="true"></i></b-btn>
          </b-input-group-button>
        </b-input-group>
        <div class="text-align-center">
          <b-button type="button" variant="primary" @click="addIngredient">Add Ingredient</b-button>
        </div>
      </b-form-group>

    </b-container>

  </b-form>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'recipe-form',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = response;
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        submitting: false,
        errorMsg: null,
        form: {
          title: '',
          description: '',
          steps: [''],
          ingredients: [{name: "", measurement: "", amount: ""}],
          ingredientOptions: [
            { value: 'c', text: 'c' },
            { value: 'g', text: 'g' },
            { value: 'kg', text: 'kg' },
            { value: 'l', text: 'l' },
            { value: 'lb', text: 'lb' },
            { value: 'ml', text: 'ml' },
            { value: 'oz', text: 'oz' },
            { value: 'pt', text: 'pt' },
            { value: 'tbsp', text: 'tbsp' },
            { value: 'tsp', text: 'tsp' }
          ]
        },
        state: {
          title: 'valid',
          steps: 'valid',
          ingredients: ['valid']
        }
      }
    },
    methods: {
      addStep() {
        this.form.steps.push('');
      },
      removeStep(index) {
        if (this.form.steps.length > 1)
          this.form.steps.splice(index, 1);
      },
      addIngredient() {
        this.form.ingredients.push({name: "", measurement: "", amount: ""});
        this.state.ingredients.push('valid');
      },
      removeIngredient(index) {
        if (this.form.ingredients.length > 1)
          this.form.ingredients.splice(index, 1);
      },
      resetErrors() {
        this.errorMsg = null;
        this.state.title = 'valid';
      },
      onSubmit(event) {

      }
    }
  }
</script>
