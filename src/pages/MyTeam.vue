<template>
  <div class="pokedex">
    <q-header class="transparent detailPageHeader">
      <div>
        <BackButton id="Back" @click="goBack()" />
      </div>
    </q-header>

    <div class="pokemonlist-container">
      <div class="faveTitle">Mijn Team</div>
      <PokemonList
        v-for="(myTeam, index) in myTeamList"
        :key="index"
        :image="myTeam.sprites.front_default"
        :name="myTeam.name"
        :id="myTeam.id"
        :types="myTeam.types"
        @click="setPokemon(myTeam)"
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
  name: 'myTeam',
  components: {
    PokemonList,
  },
  setup() {
    const router = useRouter();
    const myTeamList = ref([]);
    const pokemonList = ref([]);
    const selectedPokemon = ref();
    const { getPokemonList, getMyTeamIds } = PokemonService();
    function setPokemon(selectPokemon: Pokemon) {
      selectedPokemon.value = selectPokemon;
      router.push({ path: `/${selectPokemon.id}` }).catch(console.error);
    }

    function goBack() {
      router.go(-1);
    }

    onMounted(async () => {
      const myTeamIds = getMyTeamIds();
      pokemonList.value = await getPokemonList();
      myTeamList.value = pokemonList.value.filter((pokemon: Pokemon) =>
        myTeamIds.includes(pokemon.id)
      );
    });

    return { myTeamList, setPokemon, goBack };
  },
});
</script>
