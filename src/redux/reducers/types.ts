interface Ability {
    ability: object; //
    is_hidden: boolean;
    slot: number;
}

interface CryUrls {
    latest: string;
    legacy: string;
}

interface Form {
    name: string;
    url: string;
}

interface GameIndex {
    game_index: number;
    version: object;//
}

interface Move {
    move: object;//
    version_group_details: object[];//
}

export interface PokemonDetails {
    abilities: Ability[];
    base_experience: number;
    cries: CryUrls;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: any[]; //
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
}

export interface PokemonItem {
  name: string;
  url: string;
}
