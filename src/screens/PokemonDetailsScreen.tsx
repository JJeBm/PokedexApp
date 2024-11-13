import React from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import { PokemonTypeImage } from '../util/ui';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  const { height } = useWindowDimensions();
  const isSingleType = pokemon.types.length === 1;
  console.log(pokemon.moves)
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

      <View style={[styles.typesContainer, isSingleType && styles.singleTypeContainer]}>
        {pokemon.types.map((item: { type: { name: string } }) => (
          <PokemonTypeImage key={item.type.name} type={item.type.name} />
        ))}
      </View>

      <Text style={styles.text}>Peso: {pokemon.weight / 10} kg</Text>
      <Text style={styles.text}>Altura: {pokemon.height / 10} m</Text>

      <Text style={styles.subTitle}>Habilidades</Text>
      <View>
        {pokemon.abilities.map((ability: { ability: { name: string }, is_hidden: boolean }) => (
          <Text key={ability.ability.name} style={styles.text}>
            {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
          </Text>
        ))}
      </View>

      <Text style={styles.subTitle}>Estadísticas</Text>
      <FlatList
        data={pokemon.stats}
        keyExtractor={(item) => item.stat.name}
        renderItem={({ item }) => (
          <View style={styles.statRow}>
            <Text style={styles.text}>{item.stat.name.toUpperCase()}</Text>
            <Text style={styles.text}>{item.base_stat}</Text>
          </View>
        )}
      />

      <Text style={styles.subTitle}>Movimientos</Text>
      <FlatList
        data={pokemon.moves}
        style={styles.movesContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        keyExtractor={(item) => item.move.name}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {`${item.move.name}`}
          </Text>
        )}
      />
    </View>
  );
};

export default PokemonDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  typesContainer: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignSelf: 'center',
  },
  movesContainer: {
    flex: 1,
  },
  singleTypeContainer: {
    justifyContent: 'center',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
