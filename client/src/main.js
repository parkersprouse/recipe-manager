'use strict';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination/Pagination';
import ChecklistToggle from '@/components/ChecklistToggle';
import DynamicTextArea from '@/components/DynamicTextArea';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import RecipeForm from '@/components/RecipeForm';
import MeasurementCalculator from '@/components/MeasurementCalculator';
import router from '@/router';

import '@/assets/css/font-awesome.min.css';
import '@/assets/css/bulma.css';
import '@/assets/css/custom.css';

Vue.config.productionTip = false;

// Globally register any components we may need.
// I know you don't have to globally register all components, but this is
//   how I first learned to do it and just haven't adjusted my implementation.
Vue.component('navigation-bar', Navbar);
Vue.component('pagination', Pagination);
Vue.component('checklist-toggle', ChecklistToggle);
Vue.component('dynamic-textarea', DynamicTextArea);
Vue.component('login-form', LoginForm);
Vue.component('register-form', RegisterForm);
Vue.component('recipe-form', RecipeForm);
Vue.component('measurement-calculator', MeasurementCalculator);

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
});
