<script setup>
import Topbar from '../components/Topbar.vue';
import '../styles/60sec.css';
</script>

<template>
  <div id="container">
    <Topbar game_playing="60 secondes"></Topbar>
    <button @click="$router.push('/')">Go to menu</button>
  </div>
</template>