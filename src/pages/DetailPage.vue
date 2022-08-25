<template>
  <div
    id="detailPage"
    class="PokemonDetailContainer"
    v-if="pokemonDetail"
    :class="pokemonDetail.types[0].type.name + 'Background'"
  >
    <div class="Header">
      <BackButton id="Back" @click="goBack()" />
    </div>

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
    <div id="about">
      <div class="topText">ABOUT</div>
      <div class="infoContainer">
        <div id="description">Gotta catch 'em all!</div>
        <div id="aboutList">
          <div id="type" class="info">
            <span>Type</span>
            <span
              id="pokemonTypeButton"
              v-for="(type, index) in pokemonDetail.types"
              :key="index"
              :class="type.type.name"
            >
              {{
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
              }}
            </span>
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
            <div class="answer">
              {{ gender(pokemonDetail.name) }}
            </div>
          </div>

          <div id="ability">
            <div class="info">Vaardigheden</div>
            <div class="answer">
              {{ pokemonDetail.abilities[0].ability.name }}
            </div>
          </div>
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
import BackButton from '../components/BackButton.vue';

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
  },

  components: { BackButton },
});
</script>
