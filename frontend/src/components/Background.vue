<script setup>
import { onMounted } from 'vue';

let nb_per_row=20;
if (window.innerWidth<=700) nb_per_row=10;
let translate_pourcentage=50/nb_per_row;

onMounted(() => {
    
    const container_children = document.getElementById('container_background').children;
    for (let i=0; i<container_children.length; i++) {
        if (i%2) {
            container_children[i].style.transform="translate(" + translate_pourcentage.toString() + "%, "+ (-50-i*60).toString() +"%)";
        } else {
            container_children[i].style.transform="translateY("+ (-50-i*60).toString() +"%)";
        }
    }
})

</script>

<template>
    <div id="container_background">
        <div class="row" v-for="index in 100">
            <div class="circle" v-for="index in nb_per_row"></div>
        </div>
    </div>
</template>

<style scoped src="../styles/background.css">
</style>