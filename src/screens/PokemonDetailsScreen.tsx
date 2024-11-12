import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetails } from '../redux/actions/pokemonActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  // const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  // const pokemonDetails = useSelector((state: any) => state.pokemon.pokemonDetails);

  // useEffect(() => {
  //   dispatch(fetchPokemonDetails(pokemon.url));
  // }, [dispatch, pokemon]);

  return (
    <View>
      {pokemon ? (
        <>
          <Text>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.sprites.front_default }} style={{ width: 100, height: 100 }} />
          <Text>Peso: {pokemon.weight}</Text>
          <Text>Altura: {pokemon.height}</Text>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default PokemonDetailsScreen;
