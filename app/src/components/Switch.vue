<script setup>
import { ref } from 'vue';
defineProps(['left_str', 'right_str']);
const emit = defineEmits(['switch_function'])

var switchIsLeft = true;

function anim_green() {
    const green_anim_div = document.getElementById("green_anim_div");
    if (switchIsLeft) {
        green_anim_div.style.left="50%";
    } else {
        green_anim_div.style.left="0";
    }
    switchIsLeft=!switchIsLeft;
    emit('switch_function', switchIsLeft)
}

function get_switchIsLeft() {
    return switchIsLeft;
}

defineExpose({get_switchIsLeft, anim_green});

</script>

<template>
    <div>
        <div id="container_switch">
            <div id="green_anim_div"></div>
            <button @click="anim_green" id="left_part">{{ left_str }}</button>
            <button @click="anim_green" id="right_part">{{ right_str }}</button>
        </div>
    </div>
</template>

<style scoped src="../styles/switch.css">
</style>