<template>
  <div class="pokedex">
    <q-header class="bg-white">
      <q-toolbar class="toolbar">
        <img
          class="Filter"
          src="images\Filter.png"
          @click="showFilterModal = true"
        />
        <span class="sortIcons" @click="showSortModal = true">
          <img class="ArrowUp" src="images\ArrowUp.png" />
          <img class="ArrowDown" src="images\ArrowDown.png" />
        </span>
      </q-toolbar>
    </q-header>

    <div class="pokedexTitle">Pokédex</div>

    <div class="searchPokemon">
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
    </div>

    <div class="button-container">
      <TrainerButton
        class="myTeam"
        :title="'Mijn team'"
        :info="myTeamIds ? myTeamIds.length + ' pokemons' : '0 pokemons'"
        @click="onNavigate('/mijnteam')"
      />
      <TrainerButton
        class="myFave"
        :title="'Favorieten'"
        :info="favoriteIds ? favoriteIds.length + ' pokemons' : '0 pokemons'"
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
    <div
      class="modal"
      :class="{ showModal: showFilterModal, hideModal: !showFilterModal }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <span @click="showFilterModal = false" class="close">&times;</span>
          <div class="sortTitle">Filter op</div>
        </div>
        <q-select
          filled
          class="typeForm"
          v-model="selectedFilter"
          :options="filterOptions"
          label="Type Pokemon"
        />
        <div class="formTypeButton">
          <button
            class="toepassen"
            @click="
              showFilterModal = false;
              filterPokemonListByType(selectedFilter);
            "
          >
            Toepassen
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal"
      :class="{ showModal: showSortModal, hideModal: !showSortModal }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <span @click="showSortModal = false" class="close">&times;</span>
          <div class="sortTitle">Sorteren op</div>
        </div>
        <q-select
          filled
          class="typeForm"
          v-model="selectedSort"
          :options="sortOptions"
          label="Sort Pokemon"
        />
        <div class="formTypeButton">
          <button
            class="toepassen"
            @click="
              showSortModal = false;
              sortPokemonList(selectedSort);
            "
          >
            Toepassen
          </button>
        </div>
      </div>
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
    const {
      getPokemonList,
      getFavoritesIds,
      getMyTeamIds,
      addToMyTeam,
      removeFromMyTeam,
    } = PokemonService();
    const selectedPokemon = ref();
    const pokemonDetail = ref();
    const pokemonList = ref([]);
    const searchQuery = ref('');
    const selectedFilter = ref('');
    const selectedSort = ref('');
    const filteredPokemonList = ref([]);
    const favoriteIds = getFavoritesIds();
    const myTeamIds = getMyTeamIds();
    const myTeams = ref([]);
    myTeams.value = getMyTeamIds();

    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }

    function setPokemon(selectPokemon: Pokemon) {
      selectedPokemon.value = selectPokemon;
      router.push({ path: `/${selectPokemon.id}` }).catch(console.error);
    }
    onMounted(async () => {
      pokemonList.value = await getPokemonList();
      filteredPokemonList.value = pokemonList.value;
    });

    const searchedPokemonList = computed(() => {
      if (!searchQuery.value) {
        return filteredPokemonList.value;
      }

      if (parseInt(searchQuery.value)) {
        return filteredPokemonList.value.filter((pokemon) => {
          return (
            // @ts-ignore:next-line
            pokemon.id.toString().indexOf(searchQuery.value.toLowerCase()) != -1
          );
        });
      }
      return filteredPokemonList.value.filter((pokemon) => {
        return (
          // @ts-ignore:next-line
          pokemon.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !=
          -1
        );
      });
    });

    return {
      sortOptions: [
        'Alfabetisch oplopend',
        'Alfabetisch aflopend',
        'Numeriek oplopend',
        'Numeriek aflopend',
      ],
      filterOptions: [
        'grass',
        'fire',
        'water',
        'bug',
        'normal',
        'poison',
        'electric',
        'ground',
        'fairy',
        'fighting',
        'psychic',
        'rock',
        'ghost',
        'ice',
        'dragon',
        'flying',
      ],
      pokemonList,
      searchedPokemonList,
      selectedPokemon,
      setPokemon,
      pokemonDetail,
      pokemonId,
      searchQuery,
      onNavigate,
      filteredPokemonList,
      selectedFilter,
      selectedSort,
      favoriteIds,
      addToMyTeam,
      getMyTeamIds,
      removeFromMyTeam,
      myTeamIds,
    };
  },
  methods: {
    sortPokemonList(selectedSort: string) {
      const sortOptionMapping = {
        alfabetisch_oplopend: { direction: 'asc', property: 'name' },
        alfabetisch_aflopend: { direction: 'desc', property: 'name' },
        numeriek_oplopend: { direction: 'asc', property: 'id' },
        numeriek_aflopend: { direction: 'desc', property: 'id' },
      };

      const options =
        // @ts-ignore:next-line
        sortOptionMapping[selectedSort.toLowerCase().replace(' ', '_')];

      if (options.direction === 'asc') {
        // @ts-ignore:next-line
        this.filteredPokemonList = sort(this.filteredPokemonList).asc(
          options.property
        );
      } else {
        // @ts-ignore:next-line
        this.filteredPokemonList = sort(this.filteredPokemonList).desc(
          options.property
        );
      }
    },

    filterPokemonListByType(pokemonFilterType: string) {
      // @ts-ignore:next-line
      this.filteredPokemonList = this.pokemonList.filter((pokemon) => {
        return (
          // @ts-ignore:next-line
          pokemon.types.some((pokemonType) => {
            return pokemonType.type.name.indexOf(pokemonFilterType) != -1;
          })
        );
      });
      this.sortPokemonList(this.selectedSort);
    },

    // editTeam: function () {
    //   if (this.myTeam) {
    //     console.debug('removing ' + this.pokemonDetail.name);
    //     this.removeFromMyTeam(this.pokemonDetail);
    //   } else {
    //     console.debug('adding ' + this.pokemonDetail.name);
    //     this.addToMyTeam(this.pokemonDetail);
    //   }
    //   this.myTeams = this.getMyTeamIds();
    // },
  },
  data() {
    return {
      showFilterModal: false,
      showSortModal: false,
    };
  },

  components: { PokemonList, TrainerButton },
});
</script>
