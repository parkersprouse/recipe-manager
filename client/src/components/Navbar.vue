<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="/home">Recipes</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <!-- Left-aligned items -->
        <b-nav is-nav-bar>
          <b-nav-item href="/home">Home</b-nav-item>
          <b-nav-item-dropdown text="Recipes">
            <b-dropdown-item href="/recipes">My Recipes</b-dropdown-item>
            <b-dropdown-item href="/recipes/add">Add Recipe</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>

        <!-- Right-aligned items -->
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="/profile">View Profile</b-dropdown-item>
            <b-dropdown-item href="/profile/edit">Edit Profile</b-dropdown-item>
            <b-dropdown-item href="/logout">Logout</b-dropdown-item>
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
