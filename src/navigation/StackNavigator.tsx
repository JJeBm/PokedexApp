import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Pokémon List' }} />
    <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} options={{ title: 'Details' }} />
  </Stack.Navigator>
);

export default StackNavigator;
