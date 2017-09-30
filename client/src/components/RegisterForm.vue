<template>
  <form @submit.prevent="onSubmit">

    <div class="notification is-danger" v-if="!!errors.general">
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      {{ errors.general }}
    </div>

    <div class="notification is-success" v-if="!!success">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
      You have successfully registered! You may now <a v-on:click="$emit('show', 'login')">login</a>.
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input class="input" :class="!state.email ? 'is-danger' : ''" v-model="form.email" type="email" placeholder="Email">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!errors.email">{{ errors.email }}</p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input class="input" :class="!state.password ? 'is-danger' : ''" v-model="form.password" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!errors.password">{{ errors.password }}</p>
    </div>

    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control has-icons-left">
        <input class="input" :class="!state.confirmpassword ? 'is-danger' : ''" v-model="form.confirmpassword" type="password" placeholder="Confirm Password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!errors.confirmpassword">{{ errors.confirmpassword }}</p>
    </div>

    <div class="field">
      <p class="control has-text-centered">
        <button class="button is-primary" :class="submitting && !success ? 'is-loading' : ''" :disabled="success" type="submit">
          Register
        </button>
      </p>
    </div>

  </form>
</template>

<script>
  import api from '@/utils/api';

  export default {
    name: 'register-form',
    data: function() {
      return {
        submitting: false,
        success: false,
        form: {
          email: '',
          password: '',
          confirmpassword: ''
        },
        state: {
          email: true,
          password: true,
          confirmpassword: true
        },
        errors: {
          general: null,
          email: null,
          password: null,
          confirmpassword: null
        }
      }
    },
    methods: {
      showLogin() {
        this.$emit('backToLogin', 'login');
      },
      resetErrors() {
        this.errors.general = null;
        this.errors.email = null;
        this.errors.password = null;
        this.errors.confirmpassword = null;
        this.state.email = true;
        this.state.password = true;
        this.state.confirmpassword = true;
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        api.register(this.form, function(success, response) {
          if (success) {
            this.success = true;
          }
          else {
            this.errors.email = response.data.message.email;
            this.errors.password = response.data.message.password;
            this.errors.confirmpassword = response.data.message.confirmpassword;
            this.errors.general = response.data.message.general;
            this.state.email = response.data.content.emailState;
            this.state.password = response.data.content.passwordState;
            this.state.confirmpassword = response.data.content.confirmPasswordState;
            this.submitting = false;
          }
        }.bind(this));
      }
    }
  }
</script>
