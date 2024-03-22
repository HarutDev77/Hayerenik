import { combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
   filter: filterReducer,
   products: productsReducer,
   cart: cartReducer,
});

export default rootReducer;
