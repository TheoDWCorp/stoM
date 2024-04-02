import { createStore } from 'vuex';
import VueCookies from 'vue-cookies';

export default createStore({
    state: {
        isLoggedIn: VueCookies.get('isLoggedIn') || false, // Get the authentication state from a cookie
        pseudo: VueCookies.get('pseudo') || '',
    },
    mutations: {
        login(state, pseudo) {
            state.isLoggedIn = true;
            state.pseudo = pseudo;
            VueCookies.set('isLoggedIn', true); // Store the authentication state in a cookie
            VueCookies.set('pseudo', pseudo);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.pseudo = '';
            VueCookies.remove('isLoggedIn'); // Remove the authentication state from the cookie
            VueCookies.remove('pseudo');
        },
    },
});