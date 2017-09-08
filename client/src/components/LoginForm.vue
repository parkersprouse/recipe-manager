<template>
  <div>
    <b-form @submit.prevent="onSubmit">

      <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmailField">
        <b-form-input id="loginEmailField" type="email" v-model="form.email" required placeholder="Email" />
      </b-form-group>

      <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPasswordField">
        <b-form-input id="loginPasswordField" type="password" v-model="form.password" required placeholder="Password" />
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'login-form',
    data: function() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit(event) {
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style>
</style>