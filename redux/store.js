import { configureStore } from '@reduxjs/toolkit'
import quantityReducer from "./quantitySlice"
import cartReducer from "./cartSlice"
import smoSlice from './smoSlice'

export const store = configureStore({
    reducer:{
      cart: cartReducer,
      smo: quantityReducer,
      smoiki : smoSlice
    },
  
  })