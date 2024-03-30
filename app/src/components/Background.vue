<script setup>
import { onMounted } from 'vue';




onMounted(() => {
    const container_children = document.getElementById('container_background').children;
    for (let i=0; i<container_children.length; i++) {
        if (i%2) {
            container_children[i].style.transform="translate(2.5%, "+ (-50-i*60).toString() +"%)";
        } else {
            container_children[i].style.transform="translateY("+ (-50-i*60).toString() +"%)";
        }
    }
})

</script>

<template>
    <div id="container_background">
        <div class="row" v-for="index in 100">
            <div class="circle" v-for="index in 20"></div>
        </div>
    </div>
</template>

<style scoped src="../styles/background.css">
</style>