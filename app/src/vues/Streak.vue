<script setup>
import Topbar from '../components/Topbar.vue';
import '../styles/streak.css';
</script>


<template>
  <div id="container">
    <Topbar game_playing="Streak"></Topbar>
    <button @click="$router.push('/')">Go to menu</button>
  </div>
</template>