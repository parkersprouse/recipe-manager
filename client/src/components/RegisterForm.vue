<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-alert variant="danger" :show="!!errorMsg">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
      </b-alert>

      <b-alert variant="success" :show="registrationSuccessful">
        <i class="fa fa-check-circle" aria-hidden="true"></i> You have successfully registered! You may now login.
      </b-alert>

      <b-form-group id="registerEmailGroup" label="Email:" label-for="registerEmailField">
        <b-form-input id="registerEmailField" type="text" v-model="form.email" placeholder="Email" :state="emailState" />
      </b-form-group>

      <b-form-group id="registerPasswordGroup" label="Password:" label-for="registerPasswordField">
        <b-form-input id="registerPasswordField" type="password" v-model="form.password" placeholder="Password" :state="passwordState" />
      </b-form-group>

      <b-form-group id="registerConfirmPasswordGroup" label="Confirm Password:" label-for="registerConfirmPasswordField">
        <b-form-input id="registerConfirmPasswordField" type="password" v-model="form.confirmpassword" placeholder="Confirm Password" :state="confirmPasswordState" />
      </b-form-group>

      <div class="centered-text">
        <b-button type="submit" variant="primary" :disabled="submitting">Register</b-button>
      </div>
      
    </b-form>
  </div>
</template>

<script>
  import api from '@/utils/api';

  export default {
    name: 'register-form',
    data: function() {
      return {
        submitting: false,
        registrationSuccessful: false,
        errorMsg: null,
        emailState: 'valid',
        passwordState: 'valid',
        confirmPasswordState: 'valid',
        form: {
          email: '',
          password: '',
          confirmpassword: ''
        }
      }
    },
    methods: {
      resetErrors() {
        this.errorMsg = null;
        this.showErrorMsg = false;
        this.emailState = 'valid';
        this.passwordState = 'valid';
        this.confirmPasswordState = 'valid';
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        api.register(this.form, function(success, response) {
          if (success) {
            this.registrationSuccessful = true;
          }
          else {
            this.errorMsg = response.data.message;
            this.emailState = response.data.content.emailState || 'valid';
            this.passwordState = response.data.content.passwordState || 'valid';
            this.confirmPasswordState = response.data.content.confirmPasswordState || 'valid';
            this.submitting = false;
          }
        }.bind(this));
      }
    }
  }
</script>
