// src/redux/reducers/pokemonReducer.ts
interface PokemonState {
  pokemons: any[];
  pokemonDetails: any | null;
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonDetails: null,
};

const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_POKEMONS_SUCCESS':
      return {
        ...state,
        pokemons: action.payload,
      };
    case 'FETCH_POKEMON_DETAILS_SUCCESS':
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
