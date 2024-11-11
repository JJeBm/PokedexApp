// src/redux/actions/pokemonActions.ts
import { Dispatch } from 'redux';
import axios from 'axios';

export const fetchPokemons = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    dispatch({ type: 'FETCH_POKEMONS_SUCCESS', payload: response.data.results });
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};

export const fetchPokemonDetails = (urlPokemon: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(urlPokemon);
    console.log(response.data)
    dispatch({ type: 'FETCH_POKEMON_DETAILS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  }
};
