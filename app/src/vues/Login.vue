<script setup>
import '../styles/login_register.css';
import { ref, onMounted } from 'vue';


onMounted(() => {
})

</script>


<template>
	<div id="container_login_register">
        <span>Email</span>
        <input type="text">

        <span>Password</span>
        <input type="text">

        <button @click="$router.push('/Menu')">Login</button>
        <button id="register_buttton" @click="$router.push('/Register')">Register</button>
	</div>
</template>