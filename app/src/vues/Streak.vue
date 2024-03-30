<script setup>
import Topbar from '../components/Topbar.vue';
import FourProp from '../components/FourProp.vue';
import Guess from '../components/Guess.vue'
import '../styles/streak.css';
import { ref, onMounted } from 'vue';

function switch_function(switchIsLeft) {
	const FourProp = document.getElementById("FourProp")
	const Guess = document.getElementById("Guess")
	if (switchIsLeft) {
		FourProp.style.opacity=1;
		Guess.style.opacity=0;
	} else {
		FourProp.style.opacity=0;
		Guess.style.opacity=1;
	}
}



onMounted(() => {
    switch_function(true)
})

</script>


<template>
	<div id="container">
		<Topbar @switch_function="switch_function" game_playing="Streak"></Topbar>
		<div id="container_body">
			<div id="container_word_to_guess">
				<span> motATraduire</span>
			</div>
			<FourProp id="FourProp"></FourProp>
			<Guess id="Guess"></Guess>
		</div>
	</div>
</template>