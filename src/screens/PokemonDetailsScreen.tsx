import React, { useEffect } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetails } from '../redux/actions/pokemonActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { PokemonTypeImage } from '../util/ui';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  console.log(JSON.stringify(pokemon))
  // const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  // const pokemonDetails = useSelector((state: any) => state.pokemon.pokemonDetails);

  // useEffect(() => {
  //   dispatch(fetchPokemonDetails(pokemon.url));
  // }, [dispatch, pokemon]);

  return (
    <View style={{ padding: 20, height: useWindowDimensions().height }}>
      <Text>{pokemon.name}</Text>
      <Image source={{ uri: pokemon.sprites.front_default }} style={{ width: 100, height: 100 }} />
      <Text>Peso: {pokemon.weight}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <View style={{ flexDirection: 'row' }}>
        {pokemon.types.map((item: { type: { name: string } }) => {
          return (
            <PokemonTypeImage type={item.type.name} />
          )
        })}
      </View>
    </View>
  );
};

export default PokemonDetailsScreen;
