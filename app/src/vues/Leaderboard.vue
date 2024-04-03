<script setup>
import '../styles/leaderboard.css';
import Switch from '../components/Switch.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const pseudo = computed(() => store.state.pseudo);

let source_path;
const leaderboard_guess = ref([]);
const leaderboard_4prop = ref([]);
const best_score_4prop = ref([]);
const best_score_guess = ref([]);

async function getLeaderboard(leaderboard) {
	try {
		const response = await fetch('http://18.215.51.7/api/' + leaderboard + '/' + 100);
		const leaderboardData = await response.json();
		return leaderboardData;
	} catch (error) {
		console.error('Could not get the leaderboard:', error);
	}
}

async function updateArrays(fourprop, guess, flagStreak) {
    const promiseValue4prop = await getLeaderboard(fourprop);
    leaderboard_4prop.value = promiseValue4prop;
    const promiseValueGuess = await getLeaderboard(guess);
    leaderboard_guess.value = promiseValueGuess;


    for (let i=0; i<leaderboard_4prop.value.length; i++) {
        if (leaderboard_4prop.value[i].username==pseudo.value) {
            best_score_4prop.value.push(i+1);
            best_score_4prop.value.push(pseudo.value+" (vous)");
            if (flagStreak) best_score_4prop.value.push(leaderboard_4prop.value[i].score_streak_4);
            else best_score_4prop.value.push(leaderboard_4prop.value[i].score_60_4);
            break;
        }
    }
    
    for (let i=0; i<leaderboard_guess.value.length; i++) {
        if (leaderboard_guess.value[i].username==pseudo.value) {
            best_score_guess.value.push(i+1);
            best_score_guess.value.push(pseudo.value+" (vous)");
            if (flagStreak) best_score_guess.value.push(leaderboard_guess.value[i].score_streak_guess);
            else best_score_guess.value.push(leaderboard_guess.value[i].score_60_guess);
            break;
        }
    }
}


function switch_function(switchIsLeft) {
    const container_4prop = document.getElementById("container_leaderboard_4prop");
    const container_guess = document.getElementById("container_leaderboard_guess");
    if (switchIsLeft) {
        container_4prop.style.opacity=1;
        container_guess.style.opacity=0;
    } else {
        container_4prop.style.opacity=0;
        container_guess.style.opacity=1;
    }
}



onMounted(() => {
    if (route.params.source == 'Streak') {
        source_path='/Streak';
        updateArrays('getLeaderboardStreak4', 'getLeaderboardStreakGuess', true);
    } else {
        source_path='/60sec';
        updateArrays('getLeaderboard604', 'getLeaderboard60Guess');
    }   
})


</script>


<template>
    <button id="back_button" @click="$router.push(source_path)">Back</button>
	<div id="container_leaderboard">
        <Switch @switch_function="switch_function" id="leaderboard_top" left_str="4 propositions" right_str="Guess"></Switch>
        <div id="leaderboard_body">
            <div id="container_leaderboard_4prop">
                <div>
                    <span v-for="(item, index) in best_score_4prop" :key="index">{{ item }}</span>
                </div>
                <div v-for="(player, index) in leaderboard_4prop" :key="index">
                    <span>{{ index+1 }}</span>
                    <span v-for="item in player">{{ item }}</span>
                </div>
            </div>
            <div id="container_leaderboard_guess">
                <div>
                    <span v-for="(item, index) in best_score_guess" :key="index">{{ item }}</span>
                </div>
                <div v-for="(player, index) in leaderboard_guess" :key="index">
                    <span>{{ index+1 }}</span>
                    <span v-for="item in player">{{ item }}</span>
                </div>
            </div>
            
        </div>
	</div>
</template>