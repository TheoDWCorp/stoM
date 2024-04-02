<script setup>
const props = defineProps(["history"]);

function hide_history() {
    const container_history = document.getElementById("container_history");
    container_history.style.zIndex=-3;
    container_history.style.opacity=0;
}


</script>

<template>
    <div>
        <div id="container_history">
            <button @click="hide_history">close</button>
            <div id="wrapper_history">
                <span v-for="(item, index) in props.history" :key="index">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped src="../styles/history.css">
</style>

