<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-alert variant="danger" :show="!!errorMsg">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ errorMsg }}
      </b-alert>

      <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmailField">
        <b-form-input id="loginEmailField" type="text" v-model="form.email" placeholder="Email" :state="emailState" />
      </b-form-group>

      <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPasswordField">
        <b-form-input id="loginPasswordField" type="password" v-model="form.password" placeholder="Password" :state="passwordState" />
      </b-form-group>

      <div class="centered-text">
        <b-button type="submit" variant="primary">Login</b-button>
      </div>

    </b-form>
  </div>
</template>

<script>
  import api from '@/utils/api';

  export default {
    name: 'login-form',
    data: function() {
      return {
        errorMsg: null,
        emailState: 'valid',
        passwordState: 'valid',
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      resetErrors() {
        this.errorMsg = null;
        this.showErrorMsg = false;
        this.emailState = 'valid';
        this.passwordState = 'valid';
      },
      onSubmit(event) {
        this.resetErrors();

        api.login(this.form, function(success, response) {
          if (success) {
            window.location.href = '/home';
          }
          else {
            this.errorMsg = response.data.message;
            this.emailState = response.data.content.emailState || 'valid';
            this.passwordState = response.data.content.passwordState || 'valid';
          }
        }.bind(this));
      }
    }
  }
</script>
