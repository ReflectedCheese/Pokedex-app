<template>
  <div class="listItem">
    <!-- <q-card-section>
      <q-skeleton type="QSlider" /> -->

    <img id="listImage" :src="`${image}`" alt="Pokémon" />
    <div id="pokemonIdentifiers">
      <div id="name">
        {{ name.charAt(0).toUpperCase() + name.slice(1).split('-')[0] }}
      </div>
      <div id="id">Nr. {{ id }}</div>
      <div id="types">
        <div
          id="pokemonTypeButton"
          v-for="(type, index) in types"
          :key="index"
          :class="type.type.name"
        >
          {{ type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1) }}
        </div>
      </div>
      <div id="pointSymbol">&#10095;</div>
    </div>
    <!-- </q-card-section> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PokemonService } from 'src/services/pokemonService';
import { QSlider } from 'quasar';

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

    return { Types, QSlider };
  },
});
</script>
