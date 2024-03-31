<script setup>
import '../styles/register.css';
import { ref, onMounted } from 'vue';
import Password_input from '../components/Password_input.vue';

onMounted(() => {
})

</script>


<template>
	<div id="container_register">
		<span>Email</span>
		<input type="text">

		<span>Password</span>
		<Password_input password_id="password"></Password_input>

		<span>Confirm Password</span>
		<Password_input password_id="password_confirm"></Password_input>
		
		<span>Birthdate</span>
		<input type="date">
		<button @click="$router.push('/Login')">Register</button>
	</div>
</template>