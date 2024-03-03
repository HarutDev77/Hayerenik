import { Products, ProductsList } from '@/types/main'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProductsState {
   categoryProducts: ProductsList
   products: Products
}
const initialState: ProductsState = {
   categoryProducts: {} as ProductsList,
   products: {} as Products,
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      setCategoryProducts: (state, action: PayloadAction<ProductsList>) => {
         state.categoryProducts = action.payload
      },
      setProducts: (state, action: PayloadAction<Products>) => {
         state.products = action.payload
      },
   },
})

export const { setCategoryProducts, setProducts } = productsSlice.actions
export default productsSlice.reducer
