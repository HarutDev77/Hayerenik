import { combineReducers } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import productsReducer from './productsSlice'

const rootReducer = combineReducers({
   filter: filterReducer,
   products: productsReducer,
})

export default rootReducer
