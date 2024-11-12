// src/redux/actions/pokemonActions.ts
import { Dispatch } from 'redux';
import axios from 'axios';

export const fetchPokemons = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_POKEMONS_REQUEST' }); // Inicia el loading y limpia los pokemons
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    dispatch({ type: 'FETCH_POKEMONS_SUCCESS', payload: response.data.results });
  } catch (error) {
    dispatch({ type: 'FETCH_POKEMONS_FAILURE' }); // Detiene el loading en caso de error
    console.error('Error fetching pokemons:', error);
  }
};

export const fetchPokemonDetails = (urlPokemon: string) => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_POKEMON_DETAILS_REQUEST' });
  try {
    const response = await axios.get(urlPokemon);
    dispatch({ type: 'FETCH_POKEMON_DETAILS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_POKEMON_DETAILS_FAILURE' });
    console.error('Error fetching pokemon details:', error);
  }
};
