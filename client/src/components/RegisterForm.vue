<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-alert variant="danger" :show="showErrorMsg">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
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

      <div class="centered-text"><b-button type="submit" variant="primary">Register</b-button></div>
    </b-form>
  </div>
</template>

<script>
  import api from '../utils/api';

  export default {
    name: 'register-form',
    data: function() {
      return {
        submitted: false,
        errorMsg: null,
        showErrorMsg: false,
        form: {
          email: '',
          password: '',
          confirmpassword: ''
        }
      }
    },
    computed: {
      anyErrors: function() {
        return !this.emailValid || !this.passwordValid || !this.confirmPasswordValid;
      },
      anyEmpty: function() {
        return this.emailEmpty || this.passwordEmpty || this.confirmPasswordEmpty;
      },
      emailState: function() {
        return !this.emailEmpty || !this.submitted ? 'valid' : 'invalid';
      },
      passwordState: function() {
        return !this.passwordEmpty || !this.submitted ? 'valid' : 'invalid';
      },
      confirmPasswordState: function() {
        return !this.confirmPasswordEmpty || !this.submitted ? 'valid' : 'invalid';
      },
      emailValid: function() {
        return this.emailState === 'valid';
      },
      passwordValid: function() {
        return this.passwordState === 'valid';
      },
      confirmPasswordValid: function() {
        return this.confirmPasswordState === 'valid';
      },
      emailEmpty: function() {
        return this.form.email.length < 1;
      },
      passwordEmpty: function() {
        return this.form.password.length < 1;
      },
      confirmPasswordEmpty: function() {
        return this.form.confirmpassword.length < 1;
      }
    },
    methods: {
      resetErrors() {
        this.submitted = false;
        this.errorMsg = null;
        this.showErrorMsg = false;
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitted = true;

        if (this.anyEmpty) {
          this.errorMsg = 'Please make sure all required fields are filled out';
          this.showErrorMsg = true;
        }
      }
    }
  }
</script>
