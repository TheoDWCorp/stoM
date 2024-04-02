<script setup>
import Timer from '../components/Timer.vue'
import Topbar from '../components/Topbar.vue';
import FourProp from '../components/FourProp.vue';
import Guess from '../components/Guess.vue'
import History from '../components/History.vue';
import '../styles/60sec.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();


let words = [];
let index_words=0;
let cur_answer="";
let score = 0;
let time = [-1,-1,-1,-1];
let starting_time=Date.now()/1000;
let timerInterval;
let timer_div;
let time_anim=60;
let bulles_anim=[];
let index_bulles_anim=0;
let max_index_bulles=0;
let flag_4prop=true;
const correct_answer_score=2;
const incorrect_answer_score=-1;
const history= ref(null);
history.value=[];

function setup_game() {
	clearInterval(timerInterval);
	for (let i=0; i<index_bulles_anim; i++) {
		bulles_anim[i].style.animation="";
	}
	timer_div.children[0].textContent=6;
	timer_div.children[1].textContent=0;
	timer_div.children[3].textContent=0;
	timer_div.children[4].textContent=0;
	time = [-1,-1,-1,-1];
	bulles_anim=[];
	time_anim=60;
	index_bulles_anim=0;
	max_index_bulles=-1;
	score=0;
	const bulle = document.querySelectorAll(".circle");
	for (let i=0; i<bulle.length; i++) {
		if (bulle[i].getBoundingClientRect().bottom>window.innerHeight) {
			max_index_bulles=i-1;
			break;
		}
	}
	if (max_index_bulles==-1) max_index_bulles=bulle.length-1;
	bulles_anim=Array.from(bulle).slice(0, max_index_bulles);
	shuffleArray(bulles_anim);

	const score_span = document.getElementById("score");
	score_span.textContent = "Score : "+score.toString();

	timer_div.style.opacity=1;
	const times_up_span = document.getElementById("times_up");
	times_up_span.style.opacity=0;
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
	const real_time=60-Date.now()/1000+starting_time;
	if (real_time<=0&&time[0]!=-1) return;
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
	if (time[0]==-1) {
		if (index_words!=1) setup_game();
		time = [6,0,0,0];
		starting_time=Date.now()/1000;
		timerInterval = setInterval(updateTimer, 10);
		history.value=[];
	}

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


function updateAnim(cur_time) {
	const duration_anim=0.2+0.5*cur_time/60;
	if (max_index_bulles<=index_bulles_anim) return;
	bulles_anim[index_bulles_anim].style.animation = `pulse ${duration_anim}s infinite`;
	index_bulles_anim++;
	time_anim=cur_time-duration_anim;
}

function updateTimer() {
	const real_time=60-Date.now()/1000+starting_time;
	if (real_time<=0) {
		clearInterval(timerInterval);
		timer_div.style.opacity=0;
		const times_up_span = document.getElementById("times_up");
		times_up_span.style.opacity=1;
		time=[-1,-1,-1,-1];
		show_history();
		for (let i=0; i<index_bulles_anim; i++) {
			bulles_anim[i].style.animation="";
		}
		return;
	}
	if (time[3]==0) {
		time[0]=Math.floor(real_time/10);
		time[1]=Math.floor(real_time%10);
		time[2]=Math.floor(real_time*10%10);
		time[3]=9;
	} else time[3]--;

	if (real_time<time_anim) {
		updateAnim(real_time);
	}

	timer_div.children[0].textContent=time[0];
	timer_div.children[1].textContent=time[1];
	timer_div.children[3].textContent=time[2];
	timer_div.children[4].textContent=time[3];
}



function show_history() {
    const container_history = document.getElementById("container_history");
	container_history.style.opacity=1;
    container_history.style.zIndex=3;
}

function quit_function(next_view) {
	clearInterval(timerInterval);
	for (let i=0; i<index_bulles_anim; i++) {
		bulles_anim[i].style.animation="";
	}
	router.push(next_view);
}


onMounted(() => {
	timer_div = document.getElementById("timer");
    switch_function(true);
})


</script>


<template>
	<div id="container">
		<History :history="history"></History>
		<Topbar @switch_function="switch_function" @quit_function="quit_function" game_playing="60 secondes"></Topbar>
		<div id="container_body">
			<span id="score">Score : 0</span>
      		<Timer id="timer"></Timer>
			<span id="times_up">Time's up!</span>
			<div id="container_word_to_guess">
				<span></span>
			</div>
			<Guess @guess_function="guess_function" id="Guess"></Guess>
			<FourProp @guess_function="guess_function" id="FourProp"></FourProp>
		</div>
	</div>
</template>