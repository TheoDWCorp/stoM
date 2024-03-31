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

async function fetchWords() {
	try {
		const response = await fetch('https://raw.githubusercontent.com/theoFromArdeche/temp/main/test2.json');
		const wordsData = await response.json();
		return wordsData;
	} catch (error) {
		console.error('Error fetching color names:', error);
		return [];
	}
}

var words = [];
var index_words=0;
var cur_answer="";
var score = 0;
async function updateWords() {
	const wordsPromise = await fetchWords();
	words = wordsPromise;
	index_words=0;
	console.log(wordsPromise)

	nextWord();
}


function nextWord() {
	if (index_words==words.length) {
		updateWords();
		return;
	}

	const word_to_guess = document.querySelector("#container_word_to_guess > span");
	word_to_guess.textContent = words[index_words][0];
	cur_answer = words[index_words][1];

	const fourProp_childs = document.getElementById("container_fourProp").children;
	for (let i=0; i<4; i++) {
		fourProp_childs[i].textContent=words[index_words][i+2];
	}
	index_words++;
}


function guess_function(answer) {
	if (answer==cur_answer) {
		score++;
		const score_span = document.getElementById("score");
		score_span.textContent = "Score : "+score.toString();
	}
	nextWord();

}

onMounted(() => {
    switch_function(true);
	updateWords();
})

</script>


<template>
	<div id="container">
		<Topbar @switch_function="switch_function" game_playing="Streak"></Topbar>
		<div id="container_body">
			<span id="score">Score : 0</span>
			<div id="container_word_to_guess">
				<span>Dominique Mery</span>
			</div>
			<Guess id="Guess"></Guess>
			<FourProp @guess_function="guess_function" id="FourProp"></FourProp>
		</div>
	</div>
</template>