<script setup>
import '../styles/password_input.css';
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
const props = defineProps(['password_id']);

library.add({faEye, faEyeSlash});

function switch_icon(icon_id) {
    var new_icon, old_icon;
    if (icon_id=="icon_view_password") {
        new_icon = document.querySelector('#' + props.password_id +' > #icon_view_password');
        old_icon = document.querySelector('#' + props.password_id +' > #icon_cant_view_password');
        const input = document.querySelector('#' + props.password_id +' > input');
        input.type="password";
    } else {
        new_icon = document.querySelector('#' + props.password_id +' > #icon_cant_view_password');
        old_icon = document.querySelector('#' + props.password_id +' > #icon_view_password');
        const input = document.querySelector('#' + props.password_id +' > input');
        input.type="text";
    }
    
    new_icon.style.opacity=1;
    new_icon.style.zIndex=1;
    old_icon.style.opacity=0;
    old_icon.style.zIndex=0;
}
onMounted(() => {
    switch_icon('icon_view_password');
})

</script>


<template>
	<div :id="props.password_id" class="container_password_input">
		<input type="password">
        <font-awesome-icon @click="switch_icon('icon_cant_view_password')" id="icon_view_password" icon="eye"/>
        <font-awesome-icon @click="switch_icon('icon_view_password')" id="icon_cant_view_password" icon="eye-slash"/>
	</div>
</template>