<template>
  <div class="landing-container">
    <div class="columns is-centered">
      <div class="column is-4 is-narrow" style="max-width: 650px;">
        <div class="box landing-box">
          <div class="tabs is-centered is-boxed">
            <ul>
              <li :class="displayLogin ? 'is-active' : ''"><a @click="show('login')"><span>Login</span></a></li>
              <li :class="displayRegister ? 'is-active' : ''"><a @click="show('register')"><span>Register</span></a></li>
            </ul>
          </div>
          <div class="landing-box-content">
            <div class="columns is-centered">
              <div class="column is-9 is-narrow">
                <div id="login-container" v-if="displayLogin">
                  <login-form :next="next" />
                </div>
                <div id="register-container" v-if="displayRegister">
                  <register-form @show="show" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="require-field-notice">
          <span class="required-field-marker">*</span> Required Field
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    mounted: function() {
      console.log(Modernizr.input.list);
    },
    data: function() {
      return {
        displayLogin: true,
        displayRegister: false,
        next: this.$route.query.n
      }
    },
    methods: {
      show(toShow) {
        this.displayLogin = toShow === 'login' ? true : false;
        this.displayRegister = toShow === 'register' ? true : false;
      }
    }
  }
</script>
