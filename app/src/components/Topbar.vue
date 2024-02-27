<script setup>
defineProps(['game_playing']);
import timer from '../components/Timer.vue';
import menu_button from '../components/Menu_button.vue';
</script>

<template>
    <div id="container">
        <span id="game_playing">{{game_playing}}</span>
        <timer id="timer"></timer>
        <menu_button id="menu_button"></menu_button>
    </div>
</template>

<style scoped src="../styles/topbar.css">
</style>