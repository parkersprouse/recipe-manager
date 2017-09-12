import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/pages/LandingPage';
import HomePage from '@/pages/HomePage';
import utils from '@/utils/utils';

Vue.use(Router);

function mustBeLoggedIn(to, from, next) {
  utils.isLoggedIn(function(loggedIn) {
    if (!loggedIn)
      next('/');
    else
      next();
  });
}

function mustBeLoggedOut(to, from, next) {
  utils.isLoggedIn(function(loggedIn) {
    if (loggedIn)
      next('/home');
    else
      next();
  });
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      beforeEnter: mustBeLoggedOut
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: utils.logout
    },
    {
      path: '*',
      name: '404',
      component: { template: '<div style="text-align: center;">404 not found</div>' }
    }
  ]
})
