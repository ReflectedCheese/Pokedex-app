import { doGet } from './utils';

const PokemonService = () => {
  function getPokemonList() {
    return doGet(
      'https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon'
    );
  }

  function getPokemonDetail(id: string) {
    return doGet(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  const Types = [
    'fire',
    'normal',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'fairy',
  ];

  return { getPokemonList, getPokemonDetail, Types };
};

export { PokemonService };
