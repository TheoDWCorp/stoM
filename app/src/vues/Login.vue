<script setup>
import '../styles/login.css';
import { ref, onMounted } from 'vue';
import Password_input from '../components/Password_input.vue';




onMounted(() => {
})

</script>


<template>
	<div id="container_login">
		<span>Email</span>
		<input type="text">

		<span>Password</span>
		<Password_input password_id="login_password"></Password_input>

		<button @click="$router.push('/Menu')">Login</button>
		<div id="wrapper_register_button">
			<button id="register_buttton" @click="$router.push('/Register')">Register</button>
		</div>
	</div>
</template>