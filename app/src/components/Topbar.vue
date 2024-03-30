<script setup>
import Menu_button from '../components/Menu_button.vue';
import Switch from './Switch.vue';
const props = defineProps(['game_playing']);
const emit = defineEmits(['switch_function'])


function switch_function(switchIsLeft) {
    emit('switch_function', switchIsLeft)
}

</script>

<template>
    <div id="container_topbar">
        <div id="container_left">
            <span id="game_playing">{{ game_playing }}</span>
            <Switch @switch_function="switch_function" id="switch" left_str="4 propositions" right_str="Guess"></Switch>
        </div>
        <div id="container_right">
            <Menu_button id="menu_button"></Menu_button>
            <button id="leaderboard_button" @click="$router.push('/Leaderboard/'+props.game_playing)">Leaderboard</button>
        </div>
    </div>
</template>

<style scoped src="../styles/topbar.css">
</style>