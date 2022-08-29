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

    <div id="pokedex">
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
          id="typeForm"
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
          <q-select
            filled
            id="typeForm"
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
    const pokemonList = ref([]);
    const searchQuery = ref('');
    const selectedFilter = ref('');
    const selectedSort = ref('');
    const filteredPokemonList = ref([]);

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

<style scoped>
.toolbar {
  position: relative;
  margin: auto;
  max-width: 370px;
  justify-content: flex-end;
}

.Filter {
  margin-right: 0.6rem;
}
.sortTitle {
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: -0.408px;
  margin-bottom: 1.3rem;
  padding-left: 0.5rem;

  /* Dark 1 */
  color: #1f2029;
}
.modal {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.showModal {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.4s ease-in, visibility 0ms ease-in 0ms;
}

.hideModal {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.4s ease-in, visibility 0ms ease-in 0.2s;
}

.modal-content {
  position: fixed;
  max-width: 375px;
  bottom: 0;
  left: calc((100% - 375px) / 2);
  align-items: center;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s;
}

.sortItems {
  width: 346px;
  height: 40px;
  left: 13px;
  top: 518px;
  cursor: pointer;
  margin-bottom: 0.8rem;
  background: #f7f7f9;
  border-radius: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-left: 10px;

  letter-spacing: -0.408px;

  color: #000000;
}

.formTypeButton {
  margin-bottom: 1rem;

  margin-top: 1rem;
  margin-left: 3rem;
}
.toepassen {
  width: 343px;
  height: 44px;
  left: 16px;
  top: 734px;
  cursor: pointer;
  margin-left: -1.5rem;

  background: #1f2029;
  border-radius: 100px;

  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: -0.408px;

  color: #ffffff;
}

.close {
  color: grey;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 30px 20px;
  background-color: white;

  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: -0.408px;

  color: #1f2029;
}

@-webkit-keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>
