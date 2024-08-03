<script setup>
import '../styles/register.css';
import { ref, onMounted } from 'vue';
import Password_input from '../components/Password_input.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

async function register() {
	const pseudo = document.getElementById("pseudo").value;
	const password = document.querySelector("#password > input").value;
	const password_confirm = document.querySelector("#password_confirm > input").value;
	if (pseudo==""||password==""||password!=password_confirm) return;
	try {
		const response = await fetch('http://18.215.51.7/api/register/' + pseudo + '/' + password);
		const registerData = await response.json();
		if (registerData) {
			store.commit('login', pseudo);
			router.push('./Menu');
		}
	} catch (error) {
		console.error("Could not register:", error);
	}
}

</script>


<template>
	<div id="container_register">
		<span>Username</span>
		<input id="pseudo" type="text">

		<span>Password</span>
		<Password_input password_id="password"></Password_input>

		<span>Confirm Password</span>
		<Password_input password_id="password_confirm"></Password_input>
		
		<span>Birthdate</span>
		<input type="date">
		<button @click="$router.push('/Login')">Register</button>
		<button @click="$router.push('/Login')">Login</button>
	</div>
</template>	