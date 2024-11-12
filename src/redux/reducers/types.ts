// interface Ability {
//     ability: object; //
//     is_hidden: boolean;
//     slot: number;
// }

// interface CryUrls {
//     latest: string;
//     legacy: string;
// }

// interface Form {
//     name: string;
//     url: string;
// }

// interface GameIndex {
//     game_index: number;
//     version: object;//
// }

// interface Move {
//     move: object;//
//     version_group_details: object[];//
// }

// export interface PokemonDetails {
//     abilities: Ability[];
//     base_experience: number;
//     cries: CryUrls;
//     forms: Form[];
//     game_indices: GameIndex[];
//     height: number;
//     held_items: any[]; //
//     id: number;
//     is_default: boolean;
//     location_area_encounters: string;
//     moves: Move[];
// }

export interface PokemonItem {
    name: string;
    url: string;
}


interface PokemonCries {
    latest: string;
    legacy: string;
}

interface PokemonSpecies {
    name: string;
    url: string;
}

interface PokemonSprites {
    back_default: string | undefined;
    back_female: string | undefined;
    back_shiny: string | undefined;
    back_shiny_female: string | undefined;
    front_default: string | undefined;
    front_female: string | undefined;
    front_shiny: string | undefined;
    front_shiny_female: string | undefined;
    other: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
    versions: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
}

interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

interface PokemonGameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}

export interface PokemonDetails {
    abilities: PokemonAbility[];
    base_experience: number;
    cries: PokemonCries;
    forms: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
    game_indices: PokemonGameIndex[];
    height: number;
    held_items: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: PokemonMove[];
    name: string;
    order: number;
    past_abilities: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
    past_types: any[]; // Puedes definir más específicamente el tipo de "Object" si sabes su estructura
    species: PokemonSpecies;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
    weight: number;
}
