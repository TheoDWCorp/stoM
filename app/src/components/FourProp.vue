<script setup>
const emit = defineEmits(['guess_function']);

function guess_function(event) {
    emit("guess_function", event.target.textContent);
}

</script>

<template>
    <div>
        <div id="container_fourProp">
            <button @click="guess_function"></button>
            <button @click="guess_function"></button>
            <button @click="guess_function"></button>
            <button @click="guess_function"></button>
        </div>
    </div>
</template>

<style scoped src="../styles/4prop.css">
</style>