import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../vues/Menu.vue';
import sixty_sec from '../vues/60sec.vue';
import streak from '../vues/Streak.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Menu }, // Initial route for Menu.vue
    { path: '/60sec', component: sixty_sec }, // Route for 60sec.vue
    { path: '/Streak', component: streak } // Route for Streak.vue
  ]
});

export default router;