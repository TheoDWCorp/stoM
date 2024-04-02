<script setup>
import Menu_button from '../components/Menu_button.vue';
import Switch from './Switch.vue';
const props = defineProps(['game_playing']);
const emit = defineEmits(['switch_function', 'quit_function'])


function switch_function(switchIsLeft) {
    emit('switch_function', switchIsLeft)
}

function show_history() {
    const container_history = document.getElementById("container_history");
    container_history.style.opacity=1;
    container_history.style.zIndex=3;
}

function quit_function(next_view) {
    emit("quit_function", next_view);
}

</script>

<template>
    <div id="container_topbar">
        <div id="container_left">
            <span id="game_playing">{{ game_playing }}</span>
            <Switch @switch_function="switch_function" id="switch" left_str="4 propositions" right_str="Guess"></Switch>
        </div>
        <div id="container_right">
            <Menu_button @quit_function="quit_function" id="menu_button"></Menu_button>
            <button id="leaderboard_button" @click="quit_function('./Leaderboard/'+props.game_playing)">Leaderboard</button>
            <button @click="show_history">History</button>
        </div>
    </div>
</template>

<style scoped src="../styles/topbar.css">
</style>