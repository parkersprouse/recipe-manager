<template>
  <form class="p-form p-form--stacked" @submit.prevent="onSubmit">

    <div class="p-notification--negative" v-if="!!errors.general">
      <p class="p-notification__response">
        <span class="p-notification__status">{{ errors.general }}</span>
      </p>
    </div>

    <div class="p-form__group" :class="!state.email ? 'p-form-validation is-error' : ''">
      <label for="email" class="p-form__label">Email *</label>
      <div class="p-form__control">
        <input id="email" class="p-form-validation__input" v-model="form.email" type="text" placeholder="Email"
               :aria-invalid="!state.email" :aria-describedby="!state.email ? 'input-error-message-stacked' : ''" />
      </div>
    </div>

    <div class="p-form__group" :class="!state.password ? 'p-form-validation is-error' : ''">
      <label for="password" class="p-form__label">Password *</label>
      <div class="p-form__control">
        <input id="password" class="p-form-validation__input" v-model="form.password" type="password" placeholder="Password"
               :aria-invalid="!state.password" :aria-describedby="!state.password ? 'input-error-message-stacked' : ''" />
      </div>
    </div>

    <div class="u-align--center">
      <button class="p-button--positive">Login</button>
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
