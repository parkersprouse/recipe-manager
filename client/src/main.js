'use strict';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/App';
import Navbar from '@/components/Navbar';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import RecipeForm from '@/components/RecipeForm';
import router from '@/router';

import './assets/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/custom.css';

Vue.config.productionTip = false;

// Configure Vue to use any modules we may need
Vue.use(BootstrapVue);

// Globally register any components we may need
Vue.component('navbar', Navbar);
Vue.component('login-form', LoginForm);
Vue.component('register-form', RegisterForm);
Vue.component('recipe-form', RecipeForm);

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
});
