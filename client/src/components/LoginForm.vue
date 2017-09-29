<template>
  <form @submit.prevent="onSubmit">

    <div class="notification is-danger" v-if="!!errors.general">
      <i aria-hidden="true" class="fa fa-exclamation-circle"></i>
      {{ errors.general }}
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input class="input" :class="!state.email ? 'is-danger' : ''" v-model="form.email" type="email" placeholder="Email">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!errors.email">{{ errors.email }}</p>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input class="input" :class="!state.password ? 'is-danger' : ''" v-model="form.password" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!errors.password">{{ errors.password }}</p>
    </div>

    <div class="field">
      <p class="control has-text-centered">
        <button class="button is-primary" :class="submitting ? 'is-loading' : ''" type="submit">
          Login
        </button>
      </p>
    </div>

  </form>
</template>

<script>
  import api from '@/utils/api';

  export default {
    name: 'login-form',
    props: ['next'],
    data: function() {
      return {
        submitting: false,
        form: {
          email: '',
          password: ''
        },
        state: {
          email: true,
          password: true
        },
        errors: {
          general: null,
          email: null,
          password: null
        }
      }
    },
    methods: {
      resetErrors() {
        this.errors.general = null;
        this.errors.email = null;
        this.errors.password = null;
        this.state.email = true;
        this.state.password = true;
      },
      onSubmit(event) {
        this.resetErrors();
        this.submitting = true;

        api.login(this.form, function(success, response) {
          if (success) {
            window.location.href = this.next || '/recipes';
          }
          else {
            this.errors.email = response.data.message.email;
            this.errors.password = response.data.message.password;
            this.errors.general = response.data.message.general;
            this.state.email = response.data.content.emailState;
            this.state.password = response.data.content.passwordState;
            this.submitting = false;
          }
        }.bind(this));
      }
    }
  }
</script>
