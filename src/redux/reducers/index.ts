// src/redux/reducers/index.ts
import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  // otros reducers si los tienes
});

export default rootReducer;
