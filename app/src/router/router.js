import { createRouter, createWebHistory } from 'vue-router';
import Store from '../store/index.js';
import Menu from '../vues/Menu.vue';
import Sixty_sec from '../vues/60sec.vue';
import Streak from '../vues/Streak.vue';
import Login from '../vues/Login.vue';
import Register from '../vues/Register.vue';
import Leaderboard from '../vues/Leaderboard.vue';
import VueCookies from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login }, // Initial route for Login.vue
    {
      path: '/Menu',
      component: Menu,
      meta: { requiresAuth: true },
    }, // Route for Menu.vue
    {
      path: '/60sec',
      component: Sixty_sec,
      meta: { requiresAuth: true },
    }, // Route for 60sec.vue
    {
      path: '/Streak',
      component: Streak,
      meta: { requiresAuth: true },
    }, // Route for Streak.vue
    { path: '/Login', component: Login }, // Route for Login.vue
    { path: '/Register', component: Register }, // Route for Register.vue
    { path: '/Leaderboard/:source', component: Leaderboard }, // Route for Leaderboard.vue, source is the previous path (used in the back button)
  ],
});

/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = VueCookies.get('isLoggedIn') || Store.state.isLoggedIn; // Get the authentication state from a cookie

  if (requiresAuth && !isLoggedIn) {
    next('/'); // Redirect to the login page if not logged in
  } else {
    next(); // Otherwise, proceed to the requested route
  }
});
*/

export default router;
