<template>
  <div id="pokedex">
    <div class="pokedexTitle">Pokédex</div>

    <div class="searchPokemon">
      <!-- <form @submit.prevent="pressed(search.toString())"> -->
      <q-input
        id="searchInput"
        filled
        v-model="search"
        type="search"
        placeholder="Pokemon zoeken"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <!-- </form> -->
    </div>
    <div class="button-container">
      <TrainerButton
        class="myTeam"
        :title="'Mijn team'"
        :info="'number' + 'pokemons'"
        @click="onNavigate('/myTeam')"
      />
      <TrainerButton
        class="myFave"
        :title="'Favorieten'"
        :info="'12' + 'pokemons'"
        @click="onNavigate('/myFave')"
      />
    </div>
    <div class="pokemonlist-container">
      <PokemonList
        v-for="(pokemonInstance, index) in pokemonList"
        :key="index"
        :image="pokemonInstance.sprites.front_default"
        :name="pokemonInstance.name"
        :id="pokemonInstance.id"
        :types="pokemonInstance.types"
      />
    </div>

    <!-- <div v-if="pokemonDetail" style="color: deeppink">
      {{ pokemonDetail.name }}
    </div> -->
  </div>

  <!-- <div v-if="pokemonList">{{ pokemonList }}</div> -->
</template>

<script lang="ts">
import { PokemonService } from 'src/services/pokemonService';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import TrainerButton from 'src/components/TrainerButton.vue';
import PokemonList from 'src/components/PokemonList.vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const router = useRouter();
    let pokemonId;
    const { getPokemonList, getPokemonDetail } = PokemonService();
    const search = ref('');
    const pokemonList = ref();
    const pokemonDetail = ref();
    getPokemonDetail('1').then((result) => (pokemonDetail.value = result));
    getPokemonList().then((result) => (pokemonList.value = result));

    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }
    return {
      pokemonList,
      pokemonDetail,
      pokemonId,
      search,
      onNavigate,
    };
  },
  components: { TrainerButton, PokemonList },
});
</script>
