import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsWithDetails } from '../redux/actions/pokemonActions';
import { PokemonDetails } from '../redux/reducers/types';
import { PokemonTypeImage } from '../util/ui';

const PokemonListScreen = ({ navigation }: any) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const pokemons = useSelector((state: any) => state.pokemon.pokemons);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonsWithDetails());
  }, [dispatch]);

  const filteredPokemons = pokemons.filter((pokemon: PokemonDetails) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: PokemonDetails }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })} style={styles.pokemonCard}> 
      <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
      <View style={styles.pokemonData}>
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>{item.id + " - " +item.name}</Text>
          <Text style={styles.pokemonDetails}>Peso: {item.weight / 10} kg</Text>
          <Text style={styles.pokemonDetails}>Altura: {item.height / 10} m</Text>
        </View>

        <View style={styles.pokemonType}>
          {item.types.map((item: { type: { name: string } }) => (
            <PokemonTypeImage key={item.type.name} type={item.type.name} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 20, height: useWindowDimensions().height }}>
      <TextInput
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredPokemons}
        // showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonData: {
    flex: 1,
    flexDirection: 'row',
  },
  pokemonInfo: {
    flex: .75
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pokemonDetails: {
    fontSize: 14,
    color: '#555',
  },
  pokemonType: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  }
});

export default PokemonListScreen;
