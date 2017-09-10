<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmailField">
        <b-form-input id="loginEmailField" type="text" v-model="form.email" placeholder="Email" :state="emailState" />
        <span v-if="!emailValid">Wrong</span>
      </b-form-group>

      <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPasswordField">
        <b-form-input id="loginPasswordField" type="password" v-model="form.password" placeholder="Password" :state="passwordState" />
      </b-form-group>

      <div class="centered-text"><b-button type="submit" variant="primary">Login</b-button></div>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'login-form',
    data: function() {
      return {
        submitted: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      anyErrors: function() {
        return !this.emailValid || !this.passwordValid
      },
      emailState: function() {
        return this.form.email.length > 0 || !this.submitted ? 'valid' : 'invalid'
      },
      passwordState: function() {
        return this.form.password.length > 0 || !this.submitted ? 'valid' : 'invalid'
      },
      emailValid: function() {
        return this.emailState === 'valid'
      },
      passwordValid: function() {
        return this.passwordState === 'valid'
      }
    },
    methods: {
      onSubmit(event) {
        this.submitted = true
      }
    }
  }
</script>

<style>
  .was-validated .form-control:valid, .form-control.is-valid, .was-validated .custom-select:valid, .custom-select.is-valid {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .was-validated .form-control:valid:focus, .form-control.is-valid:focus, .was-validated .custom-select:valid:focus, .custom-select.is-valid:focus {
    border-color: #80bdff;
    box-shadow: none;
  }

  .was-validated .form-control:invalid:focus, .form-control.is-invalid:focus, .was-validated .custom-select:invalid:focus, .custom-select.is-invalid:focus {
    box-shadow: none;
  }

  .centered-text {
    text-align: center;
  }
</style>
