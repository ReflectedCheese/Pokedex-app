export interface Sprites {
  front_default: string;
}

export interface TypeDetails {
  slot: number;
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  other: string;
  official_artwork: string;
  front_default: string;
  types: [];
}

export interface PokemonDetails {
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  sprites: Sprites;
  weight: number;
  favorites: [];
}
