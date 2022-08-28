<template>
  <q-header class="bg-white">
    <q-toolbar id="toolbar">
      <img class="Filter" src="images\Filter.png" />
      <img class="ArrowUp" src="images\ArrowUp.png" />
      <img class="ArrowDown" src="images\ArrowDown.png" />
    </q-toolbar>
  </q-header>

  <div id="pokedex">
    <div class="pokedexTitle">Pokédex</div>
    <button @click="sortPokemonList('name', 'desc')">
      sorteer op naam aflopend
    </button>
    <button @click="filterPokemonListByType('fire')">
      filter op fire type
    </button>

    <div class="searchPokemon">
      <!-- <form @submit="pressed(search.toString())"> -->
      <q-input
        style="width: 343px"
        rounded
        standout
        label="Pokemon zoeken"
        color="grey-3"
        id="searchInput"
        type="search"
        v-model="searchQuery"
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
        :info="'4' + ' pokemons'"
        @click="onNavigate('/mijnteam')"
      />
      <TrainerButton
        class="myFave"
        :title="'Favorieten'"
        :info="'2' + ' pokemons'"
        @click="onNavigate('/favorieten')"
      />
    </div>
    <div class="pokemonlist-container" v-if="pokemonList">
      <PokemonList
        v-for="(pokemonInstance, index) in searchedPokemonList"
        :key="index"
        :image="pokemonInstance.sprites.front_default"
        :name="pokemonInstance.name"
        :id="pokemonInstance.id"
        :types="pokemonInstance.types"
        @click="setPokemon(pokemonInstance)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PokemonService } from 'src/services/pokemonService';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pokemon } from 'src/components/models';
import PokemonList from 'src/components/PokemonList.vue';
import TrainerButton from '../components/TrainerButton.vue';
import { sort } from 'fast-sort';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const router = useRouter();
    let pokemonId;
    const { getPokemonList } = PokemonService();

    const selectedPokemon = ref();

    const pokemonDetail = ref();
    const pokemonList = ref();
    const searchQuery = ref('');

    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }

    function setPokemon(selectPokemon: Pokemon) {
      selectedPokemon.value = selectPokemon;
      router.push({ path: `/${selectPokemon.id}` }).catch(console.error);
    }
    onMounted(async () => {
      pokemonList.value = await getPokemonList();
      // @ts-ignore:next-line
    });

    const searchedPokemonList = computed(() => {
      if (!searchQuery.value) {
        return pokemonList.value;
      }

      if (parseInt(searchQuery.value)) {
        // @ts-ignore:next-line
        return pokemonList.value.filter((pokemon) => {
          return (
            pokemon.id.toString().indexOf(searchQuery.value.toLowerCase()) != -1
          );
        });
      }
      // @ts-ignore:next-line
      return pokemonList.value.filter((pokemon) => {
        return (
          pokemon.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !=
          -1
        );
      });
    });

    return {
      pokemonList,
      searchedPokemonList,
      selectedPokemon,
      setPokemon,
      pokemonDetail,
      pokemonId,
      searchQuery,
      onNavigate,
    };
  },
  methods: {
    sortPokemonList(property: string, direction: string) {
      if (direction === 'asc') {
        // @ts-ignore:next-line
        this.pokemonList = sort(this.pokemonList).asc(property);
      } else {
        // @ts-ignore:next-line
        this.pokemonList = sort(this.pokemonList).desc(property);
      }
    },

    filterPokemonListByType(pokemonFilterType: string) {
      // @ts-ignore:next-line
      this.pokemonList = this.pokemonList.filter((pokemon) => {
        return (
          // @ts-ignore:next-line
          pokemon.types.some((pokemonType) => {
            return pokemonType.type.name.indexOf(pokemonFilterType) != -1;
          })
        );
      });
    },
  },

  components: { PokemonList, TrainerButton },
});
</script>

<style scoped>
#toolbar {
  max-width: 370px;
  justify-content: flex-end;
}

.Filter {
  margin-right: 0.6rem;
}
</style>
