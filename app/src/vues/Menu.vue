<script setup>


function pop_background() {
	console.log("TODO pop background");
}



</script>

<template>
	<div id="container">
		<div id="button_wrapper">
			<button @click="$router.push('/60sec'); pop_background()">60 secondes</button>
			<button @click="$router.push('/Streak'); pop_background()">Streak</button>
		</div>
		<button id="disconnect_button" @click="$router.push('/Login')">Disconnect</button>
	</div>
</template>

<style scoped src='../styles/menu.css'>
</style>