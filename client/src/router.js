import Vue from 'vue';
import Router from 'vue-router';
import Container from '@/Container';
import LandingPage from '@/pages/LandingPage';
import EditProfilePage from '@/pages/EditProfilePage';
import RecipesPage from '@/pages/RecipesPage';
import ViewRecipePage from '@/pages/ViewRecipePage';
import AddRecipePage from '@/pages/AddRecipePage';
import EditRecipePage from '@/pages/EditRecipePage';
import RecipeSearchResultsPage from '@/pages/RecipeSearchResultsPage';
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
      next('/recipes');
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
      path: '/profile',
      redirect: '/profile/edit'
    },
    {
      path: '/profile/edit',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: EditProfilePage})
    },
    {
      path: '/recipes',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: RecipesPage})
    },
    {
      path: '/recipes/add',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: AddRecipePage})
    },
    {
      path: '/recipes/search',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: RecipeSearchResultsPage})
    },
    {
      path: '/recipes/:id',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: ViewRecipePage})
    },
    {
      path: '/recipes/:id/edit',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({content: EditRecipePage})
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
