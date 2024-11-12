import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../redux/actions/pokemonActions';
import { PokemonItem } from '../redux/reducers/types';

const PokemonListScreen = ({ navigation }: any) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const pokemons = useSelector((state: any) => state.pokemon.pokemons);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const filteredPokemons = pokemons.filter((pokemon: PokemonItem) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <TextInput placeholder="Buscar Pokémon" value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PokemonListScreen;
