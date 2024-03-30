<script setup>
import '../styles/login.css';
import { ref, onMounted } from 'vue';


onMounted(() => {
})

</script>


<template>
	<div id="container_login">
        <span>Email</span>
        <input type="text">

        <span>Password</span>
        <input type="text">

        <button @click="$router.push('/Menu')">Login</button>
        <div id="wrapper_register_button">
            <button id="register_buttton" @click="$router.push('/Register')">Register</button>
        </div>
	</div>
</template>