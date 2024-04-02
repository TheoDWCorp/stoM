<script setup>
const emit = defineEmits(['guess_function']);

function guess_function(event) {
    emit("guess_function", event, event.target.textContent);
}

</script>

<template>
    <div>
        <div id="container_fourProp">
            <div v-for="index in 4" @click="guess_function" class="fourProp_wrapper">
                <button tabindex="-1"></button>
            </div>
        </div>
    </div>
</template>

<style scoped src="../styles/4prop.css">
</style>