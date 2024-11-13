
import { PokemonDetails } from "./types";

interface PokemonState {
  pokemons: PokemonDetails[] | [];
  loading: boolean;
  nextUrl: string | null | undefined;
  error: any;
}

const initialState : PokemonState = {
  pokemons:[],
  loading: false,
  nextUrl: 'https://pokeapi.co/api/v2/pokemon/', // URL inicial
  error: null,
};

const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_POKEMONS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_POKEMONS_SUCCESS':
      return {
        ...state,
        pokemons: action.payload,
        nextUrl: action.nextUrl, // Almacena la próxima URL
        loading: false,
      };
    case 'FETCH_POKEMONS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};


export default pokemonReducer;
