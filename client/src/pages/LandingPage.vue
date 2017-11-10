<template>
  <div class="row p-divider" style="margin-top: 3rem;">
    <div class="col-6 p-divider__block">
      <header style="border-bottom: 1px solid #cdcdcd; margin-bottom: .75rem; padding-bottom: .75rem;">
        <h3>Login</h3>
      </header>
      <login-form :next="next" />
    </div>
    <div class="col-6 p-divider__block">
      <header style="border-bottom: 1px solid #cdcdcd; margin-bottom: .75rem; padding-bottom: .75rem;">
        <h3>Register</h3>
      </header>
      <!--<register-form />--> Register
    </div>
  </div>
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
