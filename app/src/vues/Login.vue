<script setup>
import '../styles/login.css';
import { ref, onMounted } from 'vue';
import Password_input from '../components/Password_input.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

async function connexion() {
	router.push('./Menu');
	const pseudo = document.getElementById("pseudo").value;
	const password = document.querySelector("#login_password > input").value;
	if (pseudo==""||password=="") return;
	try {
		const response = await fetch('http://18.215.51.7/api/login/' + pseudo + '/' + password);
		const loginData = await response.json();
		if (loginData) {
			store.commit('login', pseudo);
			router.push('./Menu');
		}
	} catch (error) {
		console.error('Could not log in:', error);
	}
}


</script>


<template>
	<div id="container_login">
		<span>Username</span>
		<input id="pseudo" type="text">

		<span>Password</span>
		<Password_input password_id="login_password"></Password_input>

		<button @click="connexion">Login</button>
		<div id="wrapper_bottom_button">
			<button id="register_buttton" @click="$router.push('/Register')">Register</button>
		</div>
	</div>
</template>