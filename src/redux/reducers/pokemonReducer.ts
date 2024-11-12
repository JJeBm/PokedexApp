import { PokemonDetails, PokemonItem } from "./types";

interface PokemonState {
  pokemons: PokemonItem[] | [];
  pokemonDetails: PokemonDetails | null;
  loadingFetchPokemons: boolean;
  loadingPokemonsDetails: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  pokemonDetails: null,
  loadingFetchPokemons: false,
  loadingPokemonsDetails: false,
};

const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case 'FETCH_POKEMONS_REQUEST':
      return {
        ...state,
        loadingFetchPokemons: true,
        pokemons: [],
      };
    case 'FETCH_POKEMONS_SUCCESS':
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
        loadingFetchPokemons: false, 
      };
    case 'FETCH_POKEMONS_FAILURE':
      return {
        ...state,
        loadingFetchPokemons: false,
      };





    case 'FETCH_POKEMON_DETAILS_REQUEST':
      return {
        ...state,
        loadingPokemonsDetails: true,
        pokemonDetails: null,
      };
    case 'FETCH_POKEMON_DETAILS_SUCCESS':
      return {
        ...state,
        pokemonDetails: action.payload,
        loadingPokemonsDetails: false,
      };
    case 'FETCH_POKEMON_DETAILS_FAILURE':
      return {
        ...state,
        loadingPokemonsDetails: false,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
