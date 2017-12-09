<template>
  <div>
    <div class="header-title">
      <h1 class="title is-1"><a href="/">Recipe Manager</a></h1>
    </div>
    <nav class="navbar">
      <div class="navbar-brand" :class="isBurgerActive ? 'navbar-open' : ''">
        <div class="navbar-burger burger" :class="isBurgerActive ? 'is-active' : ''" data-target="navigation" @click="toggleBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navigation" class="navbar-menu" :class="isBurgerActive ? 'is-active has-text-right' : ''">
        <div class="navbar-start">
          <a class="navbar-item" href="/recipes">My Recipes</a>
          <a class="navbar-item" href="/recipes/add">Add Recipe</a>
          <a class="navbar-item" href="/convert">Measurement Calculator</a>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" href="/profile/edit" v-if="isBurgerActive">Edit Profile</a>
          <a class="navbar-item" href="/logout" v-if="isBurgerActive">Logout</a>
          <div class="navbar-item has-dropdown is-hoverable" v-if="!isBurgerActive">
            <a class="navbar-link" href="/profile">
              {{ !!user ? user.email : user }} <i class="fa fa-angle-down" aria-hidden="true" style="margin-left: 0.35rem;"></i>
            </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item navbar-dropdown-item" href="/profile/edit">Edit Profile</a>
              <a class="navbar-item navbar-dropdown-item" href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import utils from '@/utils/utils';

  export default {
    name: 'navigation-bar',
    mounted: function() {
      utils.getCurrentUserInfo((success, response) => {
        this.user = success ? response : null;
      });
    },
    data: function() {
      return {
        isBurgerActive: false,
        user: null
      }
    },
    methods: {
      toggleBurger() {
        this.isBurgerActive = !this.isBurgerActive;
      }
    }
  }
</script>
