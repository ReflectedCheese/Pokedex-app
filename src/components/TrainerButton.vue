<template>
  <div id="TrainerButton">
    <div id="TrainerButtonText">
      <div id="TrainerButtonTitle">{{ title }}</div>
      <div id="TrainerButtonInfo">{{ info }}</div>
    </div>
    <img class="Pokebal" src="images\Group.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrainerButton',
  props: {
    title: {
      type: String,
      required: true,
    },

    info: {
      type: String,
      required: true,
    },
  },
});
</script>
