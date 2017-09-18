<template>
  <b-form @submit.prevent="onSubmit">

    <b-alert variant="danger" :show="!!errorMsg">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
    </b-alert>

    <b-form-group id="recipeTitleGroup" label="Title:" label-for="recipeTitleField">
      <b-form-input id="recipeTitleField" type="text" v-model="form.title" placeholder="Title" :state="state.title" />
    </b-form-group>

    <b-form-group id="recipeDescGroup" label="Description:" label-for="recipeDescField">
      <b-form-textarea id="recipeDescField" v-model="form.description" placeholder="Description" rows="3" max-rows="3" state="valid"></b-form-textarea>
    </b-form-group>

    <b-form-group id="recipeStepGroup" label="Steps:" label-for="recipeStepField">
      <b-form-input id="recipeStepField" v-model="form.steps" placeholder="Step" :state="state.steps" />
    </b-form-group>

    <div class="centered-text">
      <b-button type="submit" variant="primary" :disabled="submitting">Create Recipe</b-button>
    </div>

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
          steps: ''
        },
        state: {
          title: 'valid',
          steps: 'valid'
        }
      }
    },
    methods: {
      resetErrors() {
        this.errorMsg = null;
        this.state.title = 'valid';
      },
      submit(event) {

      }
    }
  }
</script>
