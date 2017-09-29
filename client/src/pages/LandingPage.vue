<template>

  <!--
  <b-container>
    <div class="row justify-content-md-center align-items-center">
      <div class="col col-lg-6">
        <b-card no-body>
          <b-tabs ref="tabs" card>
            <b-tab title="Login" active>
              <login-form :next="next" />
            </b-tab>
            <b-tab title="Register">
              <register-form />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </b-container>
  -->

  <section class="section">
    <div class="container">

      <div class="card">
        <div class="card-content">
          <div class="tabs is-centered is-boxed">
            <ul>
              <li class="is-active"><a><span>Login</span></a></li>
              <li><a><span>Register</span></a></li>
            </ul>
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
        next: !!this.$route.query.n ? this.$route.query.n : null
      }
    }
  }
</script>
