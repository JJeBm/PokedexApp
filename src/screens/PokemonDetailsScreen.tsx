import React from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { PokemonTypeImage } from '../util/ui';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  const { height } = useWindowDimensions();
  const isSingleType = pokemon.types.length === 1;
  console.log(pokemon)
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

      {/* Imagen del Pokémon */}
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

      {/* Tipos */}
      <View style={[styles.typesContainer, isSingleType && styles.singleTypeContainer]}>
        {pokemon.types.map((item: { type: { name: string } }) => (
          <PokemonTypeImage key={item.type.name} type={item.type.name} />
        ))}
      </View>

      
      {/* Información básica */}
      <Text style={styles.text}>Peso: {pokemon.weight / 10} kg</Text>
      <Text style={styles.text}>Altura: {pokemon.height / 10} m</Text>


      {/* Habilidades */}
      <Text style={styles.subTitle}>Habilidades</Text>
      <View>
        {pokemon.abilities.map((ability: { ability: { name: string }, is_hidden: boolean }) => (
          <Text key={ability.ability.name} style={styles.text}>
            {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
          </Text>
        ))}
      </View>

      {/* Estadísticas */}
      <Text style={styles.subTitle}>Estadísticas</Text>
      {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
        <Text key={stat.stat.name} style={styles.text}>
          {stat.stat.name.toUpperCase()}: {stat.base_stat}
        </Text>
      ))}

      {/* Movimientos */}
      <Text style={styles.subTitle}>Movimientos</Text>
      <View style={styles.movesContainer}>
        {pokemon.moves.slice(0, 5).map((move: { move: { name: string } }) => (
          <Text key={move.move.name} style={styles.text}>
            {`${move.move.name}  `}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PokemonDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    alignSelf:'center'
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleTypeContainer: {
    justifyContent: 'center',  // Centra el icono si hay un solo tipo
  },
});
