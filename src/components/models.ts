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
