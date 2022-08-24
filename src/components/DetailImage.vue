<template>
  <div class="DetailImage">
    <img id="MainDetailImage" :src="`${image}`" alt="Pokémon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DetailImage',
  props: {
    image: {
      type: String,
      required: true,
    },
  },
});
</script>
