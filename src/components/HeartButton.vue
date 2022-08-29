<template>
  <div>
    <img v-if="!isFavorite" src="images\Heart.png" />
    <img v-if="isFavorite" src="images\HeartFull.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeartButton',
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
