<script setup>
defineProps(['game_playing']);
import Timer from '../components/Timer.vue';
import Menu_button from '../components/Menu_button.vue';
import Switch from './Switch.vue';
</script>

<template>
    <div id="container">
        <div id="container_left">
            <span id="game_playing">{{ game_playing }}</span>
            <Switch id="switch" left_str="4 propositions" right_str="Guess"></Switch>
        </div>
        <Timer id="timer"></Timer>
        <Menu_button id="menu_button"></Menu_button>
    </div>
</template>

<style scoped src="../styles/topbar.css">
</style>