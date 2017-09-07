<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="/">NavBar</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item href="/">Link</b-nav-item>
        </b-nav>
        <!-- Right aligned nav items -->
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="/">Account</b-dropdown-item>
            <b-dropdown-item href="/">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style>
  #navbar {
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
