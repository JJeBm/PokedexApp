import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetails: { pokemonId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList">
        <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Lista de Pokémon' }} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} options={{ title: 'Detalles del Pokémon' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
