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
import ConvertorPage from '@/pages/ConvertorPage';
import NotFound from '@/pages/404.vue';
import utils from '@/utils/utils';

Vue.use(Router);

function mustBeLoggedIn(to, from, next) {
  utils.isLoggedIn((loggedIn) => {
    if (!loggedIn)
      next({ path: '/', query: { n: to.fullPath } });
    else
      next();
  });
}

function mustBeLoggedOut(to, from, next) {
  utils.isLoggedIn((loggedIn) => {
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
      props: (route) => ({ content: EditProfilePage })
    },
    {
      path: '/recipes',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: RecipesPage })
    },
    {
      path: '/recipes/add',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: AddRecipePage })
    },
    {
      path: '/recipes/search',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: RecipeSearchResultsPage })
    },
    {
      path: '/recipes/:id',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: ViewRecipePage })
    },
    {
      path: '/recipes/:id/edit',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: EditRecipePage })
    },
    {
      path: '/convert',
      component: Container,
      beforeEnter: mustBeLoggedIn,
      props: (route) => ({ content: ConvertorPage })
    },
    {
      path: '/logout',
      beforeEnter: utils.logout
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
