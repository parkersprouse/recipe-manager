import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage';
import HomePage from '@/components/HomePage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      name: '404',
      component: { template: '<div style="text-align: center;">404 not found</div>' }
    }
  ]
})
