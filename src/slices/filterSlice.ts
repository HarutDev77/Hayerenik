import { FilterData } from '@/types/main'
import { createSlice } from '@reduxjs/toolkit'

interface FilterState {
   filterData: FilterData
}
const initialState: FilterState = {
   filterData: {} as FilterData,
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setFilterData: (state, action) => {
         state.filterData = action.payload
      },
   },
})

export const { setFilterData } = filterSlice.actions
export default filterSlice.reducer
