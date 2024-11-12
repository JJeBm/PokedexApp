import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface PokemonTypeImageProps {
    type: string;
}

const PokemonTypeImage: React.FC<PokemonTypeImageProps> = ({ type }) => {
    const typeColors: { [key: string]: string } = {
        bug: '#A8B820',
        dark: '#705848',
        dragon: '#7038F8',
        electric: '#F8D030',
        fairy: '#EE99AC',
        fighting: '#C03028',
        fire: '#F08030',
        flying: '#A890F0',
        ghost: '#705898',
        grass: '#78C850',
        ground: '#E0C068',
        ice: '#98D8D8',
        normal: '#A8A878',
        poison: '#A040A0',
        psychic: '#F85888',
        rock: '#B8A038',
        steel: '#B8B8D0',
        water: '#6890F0',
    };

    const backgroundColor = typeColors[type.toLowerCase()] || '#A8A878';

    const typeImages: { [key: string]: any } = {
        bug: require('../images/types/bug.png'),
        fire: require('../images/types/fire.png'),
        grass: require('../images/types/grass.png'),
        water: require('../images/types/water.png'),
        electric: require('../images/types/electric.png'),
        fairy: require('../images/types/fairy.png'),
        dark: require('../images/types/dark.png'),
        dragon: require('../images/types/dragon.png'),
        fighting: require('../images/types/fighting.png'),
        ghost: require('../images/types/ghost.png'),
        ground: require('../images/types/ground.png'),
        ice: require('../images/types/ice.png'),
        normal: require('../images/types/normal.png'),
        poison: require('../images/types/poison.png'),
        psychic: require('../images/types/psychic.png'),
        rock: require('../images/types/rock.png'),
        flying: require('../images/types/flying.png'),
        steel: require('../images/types/steel.png'),

    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Image source={typeImages[type]} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default PokemonTypeImage;
