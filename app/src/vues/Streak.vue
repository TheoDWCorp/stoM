<script setup>
import Topbar from '../components/Topbar.vue';
import FourProp from '../components/FourProp.vue';
import Guess from '../components/Guess.vue'
import History from '../components/History.vue';
import '../styles/streak.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

let words = [];
let index_words=0;
let cur_answer="";
let score = 0;
let life=3;
let life_div;
let flag_4prop=true;
const correct_answer_score=2;
const incorrect_answer_score=-1;
const history= ref(null);
history.value=[];


function setup_game() {
	score=0;
	life=3;
	history.value=[];
	const score_span = document.getElementById("score");
	score_span.textContent = "Score : "+score.toString();
	life_div.textContent="Life : "+life.toString();
	updateWords();
}


function switch_function(switchIsLeft) {
	const FourProp = document.getElementById("FourProp")
	const Guess = document.getElementById("Guess")
	flag_4prop=switchIsLeft;
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
	setup_game();
}

async function fetchWords() {
	try {
		const response = await fetch('http://18.215.51.7/api/getWords/50');
		const wordsData = await response.json();
		return wordsData;
	} catch (error) {
		console.error('Error fetching words:', error);
		return [];
	}
}


async function updateWords() {
	const wordsPromise = await fetchWords();
	words = wordsPromise;
	index_words=0;
	if (words.length==0) {
		setTimeout(() => {
			updateWords();
		}, 5000);
	} else nextWord();
}


function nextWord() {
	if (index_words==words.length) {
		updateWords();
		return;
	}

	const word_to_guess = document.querySelector("#container_word_to_guess > span");
	word_to_guess.textContent = words[index_words][0];
	cur_answer = standardiseWord(words[index_words][1]);

	const cur_words=words[index_words].slice(1);
	shuffleArray(cur_words);
	const fourProp_childs = document.getElementById("container_fourProp").children;
	for (let i=0; i<4; i++) {
		fourProp_childs[i].children[0].textContent=cur_words[i];
	}
	index_words++;
}



function guess_function(event, answer) {
	if (index_words==0) return;
	const word_to_guess = document.querySelector("#container_word_to_guess > span");
	if (flag_4prop) {
		let temp =[word_to_guess.textContent];
		const fourProp_childs = document.getElementById("container_fourProp").children;
		for (let i=0; i<4; i++) {
			if (standardiseWord(fourProp_childs[i].children[0].textContent)==cur_answer) {
				temp.push([fourProp_childs[i].children[0].textContent, 'vert']);
			} else if (standardiseWord(fourProp_childs[i].children[0].textContent)==standardiseWord(answer)) {
				temp.push([fourProp_childs[i].children[0].textContent, 'rouge']);
			} else {
				temp.push([fourProp_childs[i].children[0].textContent, 'neutre']);
			}
		}
		history.value.push(temp);
	}
	let button_pressed = event.target;
	if (button_pressed.nodeName=="DIV") {
		button_pressed=button_pressed.children[0];
	}
	if (life==0) setup_game();
	
	const score_span = document.getElementById("score");
	if (standardiseWord(answer)==cur_answer) {
		if (!flag_4prop) {
			history.value.push([word_to_guess.textContent,[cur_answer, 'vert']]); 
		}
		score+=correct_answer_score;
		button_pressed.style.animation="anim_vert 0.35s";
	} else {
		if (!flag_4prop) {
			history.value.push([word_to_guess.textContent,[cur_answer, 'vert'],[answer, 'rouge']]);
		}
		score+=incorrect_answer_score;
		button_pressed.style.animation="anim_rouge 0.35s";

		life--;
		life_div.textContent="Life : "+life.toString();
		if (life==0) {
			show_history();
		}
	}
	score_span.textContent = "Score : "+score.toString();
	setTimeout(() => {
		button_pressed.style.animation = "";
	}, 350);
	
	nextWord();
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[array[i], array[j]] = [array[j], array[i]];
	}
}


function standardiseWord(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-_]/, ' ').toLowerCase();
}


function show_history() {
    const container_history = document.getElementById("container_history");
	container_history.style.opacity=1;
    container_history.style.zIndex=3;
}


function quit_function(next_view) {
	router.push(next_view);
}


onMounted(() => {
	life_div = document.getElementById("life");
    switch_function(true);
	updateWords();
})

</script>


<template>
	<div id="container">
		<History :history="history"></History>
		<Topbar @switch_function="switch_function" @quit_function="quit_function" game_playing="Streak"></Topbar>
		<div id="container_body">
			<span id="score">Score : 0</span>
			<span id="life">Life : 3</span>
			<div id="container_word_to_guess">
				<span></span>
			</div>
			<Guess @guess_function="guess_function" id="Guess"></Guess>
			<FourProp @guess_function="guess_function" id="FourProp"></FourProp>
		</div>
	</div>
</template>