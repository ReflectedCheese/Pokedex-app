<template>
  <!--<div v-if="pokemonList">{{ pokemonList }}</div>-->
  <div v-if="pokemonDetail" style="color: deeppink">
    {{ pokemonDetail.name }}
  </div>
</template>

<script lang="ts">
import { PokemonService } from 'src/services/pokemonService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    let pokemonId;
    const { getPokemonList, getPokemonDetail } = PokemonService();
    const pokemonList = ref();
    const pokemonDetail = ref();
    getPokemonDetail('1').then((result) => (pokemonDetail.value = result));
    getPokemonList().then((result) => (pokemonList.value = result));
    return {
      pokemonList,
      pokemonDetail,
      pokemonId,
    };
  },
});
</script>
