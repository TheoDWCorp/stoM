<script setup>
import Timer from '../components/Timer.vue'
import Topbar from '../components/Topbar.vue';
import FourProp from '../components/FourProp.vue';
import Guess from '../components/Guess.vue'
import '../styles/60sec.css';
import { ref, onMounted } from 'vue';

function switch_function(switchIsLeft) {
	const FourProp = document.getElementById("FourProp")
	const Guess = document.getElementById("Guess")
	if (switchIsLeft) {
		FourProp.style.opacity=1;
		FourProp.style.zIndex=1;
		Guess.style.opacity=0;
		Guess.style.zIndex=0;
	} else {
		FourProp.style.opacity=0;
		FourProp.style.zIndex=0;
		Guess.style.opacity=1;
		Guess.style.zIndex=1;
	}
}


onMounted(() => {
    switch_function(true)
})

</script>


<template>
	<div id="container">
		<Topbar @switch_function="switch_function" game_playing="60 secondes"></Topbar>
		<div id="container_body">
      <Timer id="timer"></Timer>
			<div id="container_word_to_guess">
				<span></span>
			</div>
			<Guess id="Guess"></Guess>
			<FourProp id="FourProp"></FourProp>
		</div>
	</div>
</template>