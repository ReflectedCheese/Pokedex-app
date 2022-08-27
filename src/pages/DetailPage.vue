<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <q-header class="transparent detailPageHeader">
    <div>
      <BackButton id="Back" @click="goBack()" />
      <HeartButton class="Heart" @click="editFavorites(selectedPokemon)" />
    </div>
  </q-header>
  <div
    class="PokemonDetailContainer"
    v-if="pokemonDetail"
    :class="pokemonDetail.types[0].type.name + 'Background'"
  >
    <div class="DetailTitle" v-if="pokemonDetail">
      {{
        pokemonDetail.forms[0].name.charAt(0).toUpperCase() +
        pokemonDetail.forms[0].name.slice(1).split('-')[0]
      }}
    </div>
    <div class="ImageDetailContainer">
      <div class="DetailImage" v-if="pokemonDetail">
        <img
          :src="pokemonDetail.sprites.other['official-artwork'].front_default"
        />
        <img class="Shadow" src="images\Ellipse 2.png" />
      </div>
    </div>
    <!-- About Section-->
    <div id="about">
      <div class="topText">ABOUT</div>
      <div class="infoContainer">
        <div id="description">
          Vanaf de dag dat deze Pokémon wordt geboren, zit er een plantenzaadje
          op zijn rug. Het zaad wordt langzaam groter.
        </div>
        <div id="aboutList">
          <div id="type">
            <div class="info">Type</div>
            <div class="answer">
              <div id="typesDetailButton">
                <div
                  id="pokemonTypeButton"
                  v-for="(type, index) in pokemonDetail.types"
                  :key="index"
                  :class="type.type.name"
                >
                  {{
                    type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)
                  }}
                </div>
              </div>
            </div>
          </div>
          <div id="number">
            <div class="info">Nummer</div>
            <div class="answer">{{ formatId(pokemonDetail.id) }}</div>
          </div>
          <div id="height">
            <div class="info">Hoogte</div>
            <div class="answer">{{ pokemonDetail.height / 10 }}&nbsp;m</div>
          </div>

          <div id="weight">
            <div class="info">Gewicht</div>
            <div class="answer">{{ pokemonDetail.weight / 10 }}&nbsp;kg</div>
          </div>
          <div id="sex">
            <div class="info">Geslacht</div>
            <div class="answer" id="sex">
              {{ gender(pokemonDetail.name) }}
            </div>
          </div>

          <div id="ability">
            <div class="info">Vaardigheden</div>
            <span class="answer">
              {{ pokemonDetail.abilities[0].ability.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Stats Section-->
    <div id="stats">
      <div class="topText">STATISTIEKEN</div>
      <div class="statContainer">
        <div>
          <div
            class="row no-wrap"
            v-for="(stat, index) in pokemonDetail.stats"
            :key="index"
          >
            <div class="info col-2">{{ formatStatName(stat.stat.name) }}</div>
            <div class="numberStat col-2">
              {{ stat.base_stat }}
            </div>
            <div class="q-ml-xs q-mr-sm col-6">
              <q-linear-progress
                :value="stat.base_stat / 90"
                rounded
                size="5px"
                :color="stat.base_stat > 45 ? 'green' : 'red'"
              />
            </div>
          </div>
          <div class="row no-wrap">
            <div class="info col-2">Total</div>
            <div class="numberStat col-2">90</div>
            <div class="q-ml-xs q-mr-sm col-6">
              <q-linear-progress
                :value="1"
                rounded
                size="5px"
                :color="'green'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Moveset Section-->
    <div id="moveset">
      <div class="topText">MOVESET</div>
      <div class="movesetContainer" id="movesetContainer">
        <div
          class="moveset"
          v-for="(move, index) in moves(pokemonDetail.moves)"
          :key="index"
        >
          <div class="level">
            Level
            {{ move.version_group_details[0].level_learned_at }}
          </div>
          <span class="moveName">
            {{ move.move.name.replace('-', '&nbsp;') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PokemonService } from 'src/services/pokemonService';
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Pokemon } from 'src/components/models';
import BackButton from 'src/components/BackButton.vue';
import HeartButton from 'src/components/HeartButton.vue';

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
    const pokemonDetail = ref();
    const pokemonList = ref();
    // @ts-ignore:next-line
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
      selectedPokemon,
      setPokemon,
      pokemonDetail,
      pokemonList,
      pokemonId,
      search,
      onNavigate,
      goBack,
    };
  },
  methods: {
    formatId: function (id: number) {
      let formattedId = id.toString();
      if (formattedId.length > 2) {
        return formattedId;
      }
      return formattedId.length === 2 ? '0' + formattedId : '00' + formattedId;
    },

    gender: function (pokemonName: string) {
      const malePokemon = ['nidorino', 'nidoking'];
      const femalePokemon = ['nidorina', 'nidoqueen'];
      if (malePokemon.includes(pokemonName)) {
        return '♂';
      }
      if (femalePokemon.includes(pokemonName)) {
        return '♀';
      }

      if (pokemonName.split('-').length > 1) {
        return pokemonName.split('-')[1] === 'm' ? '♂' : '♀';
      }
      return '♂♀';
    },
    // @ts-ignore:next-line
    moves: function (allMoves: Array) {
      return (
        allMoves
          // @ts-ignore:next-line
          .filter((move) => move.version_group_details[0].level_learned_at > 0)
          .slice(0, 4)
      );
    },
    formatStatName: function (statName: string) {
      const statNameMapping = {
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        special_attack: 'Sp.Atk',
        special_defense: 'Sp.Def',
        speed: 'Speed',
      };
      // @ts-ignore:next-line
      return statNameMapping[statName.replace('-', '_')];
    },
  },

  components: { BackButton, HeartButton },
});
</script>
