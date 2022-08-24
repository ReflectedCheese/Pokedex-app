<template>
  <div id="detailPage"></div>

  <div class="Header">
    <BackButton id="Back" @click="goBack()" />
  </div>

  <div class="DetailTitle" v-if="pokemonDetail">
    {{ pokemonDetail.name }}
  </div>
  <DetailImage {{pokemonDetail.sprites.other.official_artwork.front_default}} />
</template>

<script lang="ts">
import { PokemonService } from 'src/services/pokemonService';
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Pokemon } from 'src/components/models';
import BackButton from '../components/BackButton.vue';
import DetailImage from '../components/DetailImage.vue';

export default defineComponent({
  name: 'DetailPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    let pokemonId;
    const { id } = route.params;
    const { getPokemonDetail } = PokemonService();
    const search = ref('');
    const selectedPokemon = ref();
    const pokemonList = ref();
    const pokemonDetail = ref();
    getPokemonDetail(id).then((result) => (pokemonDetail.value = result));

    function goBack() {
      router.go(-1);
    }

    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }

    function setPokemon(selectPokemon: Pokemon) {
      selectedPokemon.value = selectPokemon;
      router.push({ path: `/${selectPokemon.id}` }).catch(console.error);
    }
    return {
      pokemonList,
      selectedPokemon,
      setPokemon,
      pokemonDetail,
      pokemonId,
      search,
      onNavigate,
      goBack,
    };
  },
  components: { BackButton, DetailImage },
});
</script>
