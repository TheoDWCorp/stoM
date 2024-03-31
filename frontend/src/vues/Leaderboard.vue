<script setup>
import '../styles/leaderboard.css';
import Switch from '../components/Switch.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();
var source_path;

onMounted(() => {
    if (route.params.source == 'Streak') {
        source_path='/Streak';
    } else source_path='/60sec';
})

</script>


<template>
    <button id="back_button" @click="$router.push(source_path)">Back</button>
	<div id="container_leaderboard">
        <Switch id="leaderboard_top" left_str="4 propositions" right_str="Guess"></Switch>
        <div id="leaderboard_body">
        </div>
	</div>
</template>