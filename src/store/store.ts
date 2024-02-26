import rootReducer from '@/slices'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
   reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
