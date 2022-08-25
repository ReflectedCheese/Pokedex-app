<template>
  <div class="DetailImage">
    <img id="MainDetailImage" :src="`${image}`" alt="Pokémon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PokemonService } from 'src/services/pokemonService';

export default defineComponent({
  name: 'DetailImage',
  props: {
    image: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },

    types: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { Types } = PokemonService();

    return { Types };
  },
});
</script>
