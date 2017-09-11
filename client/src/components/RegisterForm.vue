<template>
  <div>
    <b-form @submit.prevent="onSubmit">

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
  export default {
    name: 'register-form',
    data: function() {
      return {
        submitted: false,
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
      emailState: function() {
        return this.form.email.length > 0 || !this.submitted ? 'valid' : 'invalid';
      },
      passwordState: function() {
        return this.form.password.length > 0 || !this.submitted ? 'valid' : 'invalid';
      },
      confirmPasswordState: function() {
        return this.form.confirmpassword.length > 0 || !this.submitted ? 'valid' : 'invalid';
      },
      emailValid: function() {
        return this.emailState === 'valid';
      },
      passwordValid: function() {
        return this.passwordState === 'valid';
      },
      confirmPasswordValid: function() {
        return this.confirmPasswordState === 'valid';
      }
    },
    methods: {
      onSubmit(event) {
        this.submitted = true;
      }
    }
  }
</script>
