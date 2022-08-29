import { Pokemon } from 'src/components/models';
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

  function getFavoritesIds() {
    // @ts-ignore:next-line
    return JSON.parse(localStorage.getItem('favorites'));
  }

  function addToFavorites(pokemon: Pokemon) {
    const favoritesArray: Array<number> = getFavoritesIds()
      ? getFavoritesIds()
      : [];
    favoritesArray.push(pokemon.id);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  function removeFromFavorites(pokemon: Pokemon) {
    let favoritesArray: Array<number> = getFavoritesIds()
      ? getFavoritesIds()
      : [];
    favoritesArray = favoritesArray.filter((id) => id != pokemon.id);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return {
    getPokemonList,
    getPokemonDetail,
    Types,
    getFavoritesIds,
    addToFavorites,
    removeFromFavorites,
  };
};

export { PokemonService };
