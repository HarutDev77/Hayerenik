import { combineReducers } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'

const rootReducer = combineReducers({
   filter: filterReducer,
})

export default rootReducer
