import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/pages/LandingPage';
import HomePage from '@/pages/HomePage';
import ProfilePage from '@/pages/ProfilePage';
import EditProfilePage from '@/pages/EditProfilePage';
import utils from '@/utils/utils';

Vue.use(Router);

function mustBeLoggedIn(to, from, next) {
  utils.isLoggedIn(function(loggedIn) {
    if (!loggedIn)
      next({ path: '/', query: { n: to.fullPath } });
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
      component: LandingPage,
      beforeEnter: mustBeLoggedOut
    },
    {
      path: '/home',
      component: HomePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/profile',
      component: ProfilePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/profile/edit',
      component: EditProfilePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/recipes',
      component: ProfilePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/recipes/add',
      component: HomePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/recipes/:id',
      component: HomePage,
      beforeEnter: mustBeLoggedIn
    },
    {
      path: '/logout',
      beforeEnter: utils.logout
    },
    {
      path: '*',
      component: { template: '<div style="text-align: center;">404 not found</div>' }
    }
  ]
});
