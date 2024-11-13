import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Image, useWindowDimensions, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsWithDetails } from '../redux/actions/pokemonActions';
import { Header, PokemonTypeImage } from '../util/ui';
import { PokemonDetails } from '../redux/reducers/types';

const PokemonListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { pokemons, nextUrl, loading } = useSelector((state: any) => state.pokemon);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Solo realiza la carga inicial si nextUrl es la URL base
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
          onPress: () => null, // Si cancela, no hace nada
          style: "cancel",
        },
        {
          text: "Salir",
          onPress: () => BackHandler.exitApp(), // Si confirma, sale de la app
        },
      ],
      { cancelable: false } // Para que no se cierre si toca fuera del alert
    );
    return true; // Esto previene que la aplicación se cierre de forma predeterminada
  };

  useEffect(() => {
    // Agregar el listener para cuando el usuario presione el botón de atrás
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const filteredPokemons = pokemons.filter((pokemon: PokemonDetails) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMorePokemons = () => {
    if (nextUrl && !loading) {
      dispatch(fetchPokemonsWithDetails(nextUrl)); // Llama a la URL `nextUrl` para obtener la siguiente página
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
    <View style={{ padding: 20, height: useWindowDimensions().height }}>
      <Header title='Pokedex' onBackPress={() => handleBackPress()} />
      <TextInput
        placeholder="Buscar Pokémon"
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
    alignItems: 'center'
  }
});

export default PokemonListScreen;
