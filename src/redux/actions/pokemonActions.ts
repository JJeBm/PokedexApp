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


export const fetchPokemonsWithDetails = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_POKEMONS_REQUEST' }); // Inicia el loading y limpia los pokemons
  try {
    // Paso 1: Obtener el listado de Pokémon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const pokemonsList = response.data.results;

    // Paso 2: Obtener los detalles de cada Pokémon en paralelo
    const pokemonDetailsPromises = pokemonsList.map((pokemon: { url: string }) =>
      axios.get(pokemon.url)
    );

    const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

    // Paso 3: Guardar el listado de Pokémon junto con los detalles
    const pokemonsWithDetails = pokemonDetailsResponses.map((response) => response.data);

    // Disparar acción con el listado de Pokémon completo (detalles incluidos)
    dispatch({
      type: 'FETCH_POKEMONS_SUCCESS',
      payload: pokemonsWithDetails,
    });
  } catch (error) {
    dispatch({ type: 'FETCH_POKEMONS_FAILURE' }); // Detiene el loading en caso de error
    console.error('Error fetching pokemons with details:', error);
  }
};