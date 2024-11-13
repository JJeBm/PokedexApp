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

export const fetchPokemonsWithDetails = (nextUrl: string) => async (dispatch: (arg0: { type: string; payload?: any[]; nextUrl?: any; }) => void, getState: () => { pokemon: any; }) => {
  const { pokemon } = getState();
  
  if (!nextUrl) return; // Si no hay más URL, no realizar otra solicitud

  dispatch({ type: 'FETCH_POKEMONS_REQUEST' });
  try {
    const response = await axios.get(nextUrl);
    const pokemonsList = response.data.results;
    const next = response.data.next; // URL de la siguiente página

    const pokemonDetailsPromises = pokemonsList.map((pokemon: { url: string; }) => axios.get(pokemon.url));
    const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
    const pokemonsWithDetails = pokemonDetailsResponses.map((response) => response.data);

    // Concatenar los nuevos Pokémon con los existentes en el estado
    dispatch({
      type: 'FETCH_POKEMONS_SUCCESS',
      payload: [...pokemon.pokemons, ...pokemonsWithDetails],
      nextUrl: next, // Guardar la URL de la siguiente página
    });
  } catch (error) {
    dispatch({ type: 'FETCH_POKEMONS_FAILURE' });
    console.error('Error fetching pokemons with details:', error);
  }
};