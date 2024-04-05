<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router  = useRouter();


function disconnect() {
	store.commit('logout');
	router.push('/Login');
}

</script>

<template>
	<div id="container">
		<div id="button_wrapper">
			<button @click="$router.push('/60sec')">60 secondes</button>
			<button @click="$router.push('/Streak')">Streak</button>
		</div>
		<button id="disconnect_button" @click="disconnect">Disconnect</button>
	</div>
</template>

<style scoped src='../styles/menu.css'>
</style>