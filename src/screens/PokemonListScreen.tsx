import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Image, useWindowDimensions, ActivityIndicator, Alert, BackHandler, SafeAreaView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsWithDetails } from '../redux/actions/pokemonActions';
import { Header, PokemonTypeImage } from '../util/ui';
import { PokemonDetails } from '../redux/reducers/types';

const PokemonListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { pokemons, nextUrl, loading } = useSelector((state: any) => state.pokemon);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (nextUrl === 'https://pokeapi.co/api/v2/pokemon/') {
      dispatch(fetchPokemonsWithDetails(nextUrl));
    }
  }, [dispatch, nextUrl]);

  useEffect(() => {
    if (!loading && nextUrl) {
      loadMorePokemons();
    }
  }, [loading, nextUrl]);

  const handleBackPress = () => {
    Alert.alert(
      "Salir de la aplicación",
      "¿Estás seguro de que quieres salir?",
      [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Salir",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const filteredPokemons = pokemons.filter((pokemon: PokemonDetails) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMorePokemons = () => {
    if (nextUrl && !loading) {
      dispatch(fetchPokemonsWithDetails(nextUrl));
    }
  };

  const renderItem = ({ item }: { item: PokemonDetails }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })} style={styles.pokemonCard}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
      <View style={styles.pokemonData}>
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>{item.id + " - " + item.name}</Text>
          <Text style={styles.pokemonDetails}>Peso: {item.weight / 10} kg</Text>
          <Text style={styles.pokemonDetails}>Altura: {item.height / 10} m</Text>
        </View>
        <View style={styles.pokemonType}>
          {item.types.map((type: { type: { name: string; }; }) => (
            <PokemonTypeImage key={type.type.name} type={type.type.name} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLoading = () => {
    if (loading) {
      return (
        <ActivityIndicator style={{ alignSelf: 'center', marginTop: 10 }} />
      )
    }
  }


  return (
    <SafeAreaView style={{ width: "90%", height: useWindowDimensions().height * .98, alignSelf: 'center' }}>
      <Header title='Pokedex' onBackPress={() => handleBackPress()} isIOS={Platform.OS === 'ios'} />
      <TextInput
        placeholder="Pokémon ..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ListFooterComponent={renderLoading()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    paddingHorizontal: 20
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
    alignItems: 'center'
  }
});

export default PokemonListScreen;
