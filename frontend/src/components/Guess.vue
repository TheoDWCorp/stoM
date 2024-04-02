<script setup>
const emit = defineEmits(['guess_function']);

function guess_function(event) {
    if (event.key!="Enter") return;
    emit('guess_function', event, event.target.value);
    event.target.value="";
}

</script>

<template>
    <div>
        <div id="container_guess">
            <input tabindex="-1" type="text" placeholder="Answer" @keypress="guess_function">
        </div>
    </div>
</template>

<style scoped src="../styles/guess.css">
</style>