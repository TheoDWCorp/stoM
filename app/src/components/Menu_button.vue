<script setup>
const emit = defineEmits(['quit_function'])

function quit_function() {
    emit("quit_function", './Menu');
}

</script>

<template>
    <button @click="quit_function">Menu</button>
</template>

<style scoped src="../styles/menu_button.css">
</style>