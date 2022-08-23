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
  types: [];
}
