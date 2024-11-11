import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetails } from '../redux/actions/pokemonActions';

const PokemonDetailsScreen = ({ route }: any) => {
  const { dataPokemon } = route.params;
  const dispatch = useDispatch();
  const pokemonDetails = useSelector((state: any) => state.pokemon.pokemonDetails);

  useEffect(() => {
    dispatch(fetchPokemonDetails(dataPokemon.url));
  }, [dispatch, dataPokemon]);

  return (
    <View>
      {pokemonDetails ? (
        <>
          <Text>{pokemonDetails.name}</Text>
          <Image source={{ uri: pokemonDetails.sprites.front_default }} style={{ width: 100, height: 100 }} />
          <Text>Peso: {pokemonDetails.weight}</Text>
          <Text>Altura: {pokemonDetails.height}</Text>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default PokemonDetailsScreen;
