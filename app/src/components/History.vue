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
                <div v-if="props.history.length!=0" v-for="(item, index) in props.history" :key="index">
                    <span>{{ item[0] }}</span>
                    <span v-for="index_item in item.length-1" :class="item[index_item][1]" >{{ item[index_item][0] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="../styles/history.css">
</style>

