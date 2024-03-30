<script setup>
import { ref, onMounted } from 'vue';
import Timer from '../components/Timer.vue';
import Menu_button from '../components/Menu_button.vue';
import Switch from './Switch.vue';
const props = defineProps(['game_playing']);
const emit = defineEmits(['switch_function'])

const switch_ref = ref(null);

const get_switchIsLeft = ref(null);
const anim_green = ref(null);


function switch_function(switchIsLeft) {
    emit('switch_function', switchIsLeft)
}

onMounted(() => {
    get_switchIsLeft.value = switch_ref.value.get_switchIsLeft;
    anim_green.value = switch_ref.value.anim_green;

    
})



defineExpose({get_switchIsLeft, anim_green});

</script>

<template>
    <div id="container_topbar">
        <div id="container_left">
            <span id="game_playing">{{ game_playing }}</span>
            <Switch @switch_function="switch_function" ref="switch_ref" id="switch" left_str="4 propositions" right_str="Guess"></Switch>
        </div>
        <Timer id="timer"></Timer>
        <div id="container_right">
            <Menu_button id="menu_button"></Menu_button>
            <button id="leaderboard_button" @click="$router.push('/Leaderboard/'+props.game_playing)">Leaderboard</button>
        </div>
    </div>
</template>

<style scoped src="../styles/topbar.css">
</style>