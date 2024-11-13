import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { Header, PokemonTypeImage } from '../util/ui';
import { typeColors } from '../util/ui/typesComponent';
import { useNavigation } from '@react-navigation/native';

const PokemonDetailsScreen = ({ route }: any) => {
  const { pokemon } = route.params;
  const [currentSprite, setCurrentSprite] = useState(pokemon.sprites.front_default);
  const [selectedSprite, setSelectedSprite] = useState('front_default');

  const sprites = {
    front_default: pokemon.sprites.front_default,
    back_default: pokemon.sprites.back_default,
    front_shiny: pokemon.sprites.front_shiny,
    back_shiny: pokemon.sprites.back_shiny,
  };

  const changeSprite = (spriteKey: keyof typeof sprites) => {
    if (sprites[spriteKey]) {
      setCurrentSprite(sprites[spriteKey]);
      setSelectedSprite(spriteKey);
    }
  };

  const isSingleType = pokemon.types.length === 1;
  const primary = typeColors[pokemon.types[0]?.type.name];
  const secundary = typeColors[pokemon.types[1]?.type.name];
  const primary_2 = primary + "50";
  const secundary_2 = secundary + "50";
  const navigation = useNavigation()
  const getColor = (type = 1) => {
    return type === 2 && secundary ? [secundary, secundary_2] : [primary, primary_2];
  };

  const InfoContainer = ({ children, type = 1 }) => {
    const color = getColor(type);
    return (
      <View style={{ backgroundColor: color[1], borderRadius: 20, padding: 10, borderColor: color[0], borderWidth: 1 }}>
        {children}
      </View>
    );
  };

  const handleBackPress = () => {
    navigation.goBack()
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <Header title={pokemon.name.toUpperCase()} />

      <Image source={{ uri: currentSprite }} style={styles.image} />

      <View style={styles.spriteButtons}>
        {Object.keys(sprites).map((key) => (
          <TouchableOpacity key={key} onPress={() => changeSprite(key as keyof typeof sprites)}>
            <Text style={[styles.text, selectedSprite === key && [styles.selectedText, { color: primary }]]}>
              {key.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.typesContainer, isSingleType && styles.singleTypeContainer]}>
        {pokemon.types.map((item: { type: { name: string } }) => (
          <PokemonTypeImage key={item.type.name} type={item.type.name} />
        ))}
      </View>

      <InfoContainer>
        <Text style={styles.text}>Peso: {pokemon.weight / 10} kg</Text>
        <Text style={styles.text}>Altura: {pokemon.height / 10} m</Text>
      </InfoContainer>

      <Text style={styles.subTitle}>Habilidades</Text>
      <InfoContainer type={2}>
        {pokemon.abilities.map((ability: { ability: { name: string }, is_hidden: boolean }) => (
          <View style={styles.statsContainer} key={ability.ability.name}>
            <Text style={styles.text}>
              {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
            </Text>
          </View>
        ))}
      </InfoContainer>

      <Text style={styles.subTitle}>Estadísticas</Text>
      <InfoContainer>
        {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
          <View style={styles.statsContainer} key={stat.stat.name}>
            <Text style={styles.text}>
              {stat.stat.name.toUpperCase()}
            </Text>
            <Text style={styles.text}>
              {stat.base_stat}
            </Text>
          </View>
        ))}
      </InfoContainer>

      {pokemon.moves && pokemon.moves.length > 0 && (
        <>
          <Text style={styles.subTitle}>Movimientos</Text><View style={{ backgroundColor: getColor(2)[1], borderRadius: 20, padding: 10, borderColor: getColor(2)[0], borderWidth: 1, flex: 1 }}>
            <FlatList
              data={pokemon.moves}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
              keyExtractor={(item) => item.move.name}
              renderItem={({ item }) => (
                <Text style={styles.text}>{`${item.move.name}`}</Text>
              )} />
          </View>
        </>)}
    </View>
  );
};

export default PokemonDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  spriteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  text: {
    fontSize: 13,
    marginVertical: 2,
    color: 'gray',
  },
  selectedText: {
    fontWeight: 'bold',
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
  singleTypeContainer: {
    justifyContent: 'center',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});
