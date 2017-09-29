<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half is-narrow">
          <div class="box landing-box">
            <div class="tabs is-centered is-boxed">
              <ul>
                <li :class="displayLogin ? 'is-active' : ''"><a v-on:click="show('login')"><span>Login</span></a></li>
                <li :class="displayRegister ? 'is-active' : ''"><a v-on:click="show('register')"><span>Register</span></a></li>
              </ul>
            </div>
            <div class="landing-box-content">
              <div id="login-container" v-if="displayLogin">
                <login-form :next="next" />
              </div>
              <div id="register-container" v-if="displayRegister">
                <register-form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'landing-page',
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
