import React from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import { PokemonTypeImage } from '../util/ui';
import { typeColors } from '../util/ui/typesComponent';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  const { height } = useWindowDimensions();
  const isSingleType = pokemon.types.length === 1;
  const primary = typeColors[pokemon.types[0]?.type.name]
  const secundary = typeColors[pokemon.types[1]?.type.name]
  const primary_2 = primary + "50"
  const secundary_2 = secundary + "50"

  const getColor = (type = 1) => {
    if (type === 2 && secundary) {
      return [secundary, secundary_2]
    }
    return [primary, primary_2]
  }
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

      <View style={[styles.typesContainer, isSingleType && styles.singleTypeContainer]}>
        {pokemon.types.map((item: { type: { name: string } }) => (
          <PokemonTypeImage key={item.type.name} type={item.type.name} />
        ))}
      </View>

      <View style={{ backgroundColor: getColor(1)[1], borderRadius: 20, padding: 10, borderColor: getColor(1)[0], borderWidth: 1 }}>
        <Text style={styles.text}>Peso: {pokemon.weight / 10} kg</Text>
        <Text style={styles.text}>Altura: {pokemon.height / 10} m</Text>
      </View>

      <Text style={styles.subTitle}>Habilidades</Text>
      <View style={{ backgroundColor: getColor(2)[1], borderRadius: 20, padding: 10, borderColor: getColor(2)[0], borderWidth: 1 }}>
        {pokemon.abilities.map((ability: { ability: { name: string }, is_hidden: boolean }) => (
          <Text key={ability.ability.name} style={styles.text}>
            {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
          </Text>
        ))}
      </View>

      <Text style={styles.subTitle}>Estadísticas</Text>
      <View style={{ backgroundColor: getColor(1)[1], borderRadius: 20, padding: 10, borderColor: getColor(1)[0], borderWidth: 1 }}>
        {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
          <View style={styles.statsContainer}>
            <Text style={styles.text}>
              {stat.stat.name.toUpperCase()}
            </Text>
            <Text style={styles.text}>
              {stat.base_stat}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.subTitle}>Movimientos</Text>
      <View style={{ backgroundColor: getColor(2)[1], borderRadius: 20, padding: 10, borderColor: getColor(2)[0], borderWidth: 1, flex:1 }}>
        <FlatList
          data={pokemon.moves}
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
    marginBottom: 0,
  },
  text: {
    fontSize: 13,
    marginVertical: 2,
  },
  subTitle: {
    fontSize: 15,
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
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});
