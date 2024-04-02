<script setup>
import Background from './components/Background.vue';
import './styles/keyframes.css';
</script>

<template>
	<router-view />
	<Background></Background>
	<div id="background_non_animated"></div>
</template>