import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../vues/Menu.vue';
import Sixty_sec from '../vues/60sec.vue';
import Streak from '../vues/Streak.vue';
import Login from '../vues/Login.vue';
import Register from '../vues/Register.vue';
import Leaderboard from '../vues/Leaderboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login }, // Initial route for Login.vue
    { path: '/Menu', component: Menu }, // Route for Menu.vue
    { path: '/60sec', component: Sixty_sec }, // Route for 60sec.vue
    { path: '/Streak', component: Streak }, // Route for Streak.vue
    { path: '/Login', component: Login }, // Route for Login.vue
    { path: '/Register', component: Register }, // Route for Register.vue
    { path: '/Leaderboard/:source', component: Leaderboard } // Route for Leaderboard.vue, source is the previous path (used in the back button)
  ]
});

export default router;