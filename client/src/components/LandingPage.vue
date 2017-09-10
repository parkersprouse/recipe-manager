<template>
  <b-container>
    <div class="row justify-content-md-center align-items-center">
      <div class="col col-lg-6">
        <b-card no-body>
          <b-tabs ref="tabs" card>
            <b-tab title="Login" active>
              <login-form />
            </b-tab>
            <b-tab title="Register">
              <register-form />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'landing-page'
  }
</script>
