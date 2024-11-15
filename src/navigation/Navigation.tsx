import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList">
        <Stack.Screen 
          name="PokemonList" 
          component={PokemonListScreen} 
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen 
          name="PokemonDetails" 
          component={PokemonDetailsScreen} 
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
