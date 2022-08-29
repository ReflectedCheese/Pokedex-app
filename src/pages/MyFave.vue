<template>
  <div class="pokedex">
    <q-header class="transparent detailPageHeader">
      <div>
        <BackButton id="Back" @click="goBack()" />
      </div>
    </q-header>

    <div class="pokemonlist-container">
      <div class="faveTitle">Favorieten</div>
      <PokemonList
        v-for="(favorite, index) in favoritesList"
        :key="index"
        :image="favorite.sprites.front_default"
        :name="favorite.name"
        :id="favorite.id"
        :types="favorite.types"
        @click="setPokemon(favorite)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PokemonList from 'src/components/PokemonList.vue';
import { PokemonService } from 'src/services/pokemonService';
import { Pokemon } from 'src/components/models';

export default defineComponent({
  name: 'myFave',
  components: {
    PokemonList,
  },
  setup() {
    const router = useRouter();
    const favoritesList = ref([]);
    const pokemonList = ref([]);
    const selectedPokemon = ref();
    const { getPokemonList, getFavoritesIds } = PokemonService();
    function setPokemon(selectPokemon: Pokemon) {
      selectedPokemon.value = selectPokemon;
      router.push({ path: `/${selectPokemon.id}` }).catch(console.error);
    }

    function goBack() {
      router.go(-1);
    }

    onMounted(async () => {
      const favoriteIds = getFavoritesIds();
      pokemonList.value = await getPokemonList();
      favoritesList.value = pokemonList.value.filter((pokemon: Pokemon) =>
        favoriteIds.includes(pokemon.id)
      );
    });

    return { favoritesList, setPokemon, goBack };
  },
});
</script>

<style scoped>
.faveTitle {
  margin-top: 3rem;
  display: flex;
  height: 41px;
  left: 16px;
  right: 16px;

  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;

  letter-spacing: 0.374px;

  color: white;
}
</style>
