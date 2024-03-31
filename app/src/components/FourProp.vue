<script setup>
const emit = defineEmits(['guess_function']);

function guess_function(event) {
    emit("guess_function", event.target.textContent);
}

</script>

<template>
    <div>
        <div id="container_fourProp">
            <button @click="guess_function">test1</button>
            <button @click="guess_function">test2</button>
            <button @click="guess_function">test3</button>
            <button @click="guess_function">test4</button>
        </div>
    </div>
</template>

<style scoped src="../styles/4prop.css">
</style>