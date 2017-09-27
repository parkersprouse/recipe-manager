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

      <div class="text-align-center">
        <b-button type="submit" variant="primary" :disabled="submitting">Login</b-button>
      </div>

    </b-form>
  </div>
</template>

<script>
  import api from '@/utils/api';

  export default {
    name: 'login-form',
    props: ['next'],
    data: function() {
      return {
        submitting: false,
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
        this.emailState = 'valid';
        this.passwordState = 'valid';
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        api.login(this.form, function(success, response) {
          if (success) {
            window.location.href = this.next || '/recipes';
          }
          else {
            this.errorMsg = response.data.message;
            this.emailState = response.data.content.emailState || 'valid';
            this.passwordState = response.data.content.passwordState || 'valid';
            this.submitting = false;
          }
        }.bind(this));
      }
    }
  }
</script>
