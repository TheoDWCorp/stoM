<script setup>
import Topbar from '../components/Topbar.vue';
import '../styles/60sec.css';
import { ref, onMounted } from 'vue';

const topbar_ref = ref(null);

const get_switchIsLeft = ref(null);
const anim_green = ref(null);

onMounted(() => {
    get_switchIsLeft.value = topbar_ref.value.get_switchIsLeft;
    anim_green.value = topbar_ref.value.anim_green;
    const switch_span = document.getElementById("switch_span");
    if (get_switchIsLeft.value()) {
      switch_span.innerText="switch is left";
    } else {
      switch_span.innerText="switch is right";
    }
})

function button_click() {
  anim_green.value();
  if (get_switchIsLeft.value()) {
      switch_span.innerText="switch is left";
  } else {
    switch_span.innerText="switch is right";
  }
}

</script>

<template>
  <div id="container">
    <Topbar ref="topbar_ref" game_playing="60 secondes"></Topbar>
    <div id="container_body">
      <p>60 secondes view</p>
      <button @click="button_click">test switch</button>
      <span id="switch_span"></span>
    </div>
  </div>
</template>