<script setup>
import '../styles/register.css';
import { ref, onMounted } from 'vue';


onMounted(() => {
})

</script>


<template>
        <div id="container_register">
                <span>Email</span>
                <input type="text">

                <span>Password</span>
                <input type="text">

                <span>Confirm Password</span>
                <input type="password">
                
                <span>Birthdate</span>
                <input type="date">
                <button @click="$router.push('/Login')">Register</button>
        </div>
</template>