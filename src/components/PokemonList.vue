<template>
  <div class="listItem">
    <img :src="`${image}`" alt="Pokémon" />
    <div id="pokemonIdentifiers">
      <div id="name">
        {{ name.charAt(0).toUpperCase() + name.slice(1) }}
      </div>
      <div id="id">Nr. {{ id }}</div>
      <div id="types">
        <div
          v-for="(type, index) in types"
          :key="index"
          :class="type.type.name"
        >
          {{ type.type.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PokemonService } from 'src/services/pokemonService';

export default defineComponent({
  name: 'PokemonListComponent',
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
