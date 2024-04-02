import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLocalStorageItem } from '@/helpers/localStorage';

export type ChosenItem = {
   id: number;
   amount?: number;
};

interface CartState {
   selectedProducts: ChosenItem[];
}

const initialState: CartState = {
   selectedProducts: [] as ChosenItem[],
};

const cartSlice = createSlice({
   name: 'selectedProducts',
   initialState,
   reducers: {
      setSelectedProducts: (state, action: PayloadAction<ChosenItem>) => {
         if (!state.selectedProducts.map((item) => item.id).includes(action.payload.id)) {
            setLocalStorageItem<ChosenItem[]>('selectedProducts', [
               ...state.selectedProducts,
               action.payload,
            ]);
            state.selectedProducts.push(action.payload);
         }
      },
      revalidateProducts: (state, action: PayloadAction<ChosenItem[]>) => {
         state.selectedProducts = action.payload;
      },

      deleteItemId: (state, action: PayloadAction<ChosenItem>) => {
         const newSelectedItems = state.selectedProducts.filter(
            (item) => item.id !== action.payload.id,
         );
         state.selectedProducts = newSelectedItems;
         setLocalStorageItem<ChosenItem[]>('selectedProducts', newSelectedItems);
      },

      changeAmount: (state, action: PayloadAction<{ id: number; change: string }>) => {
         const { change, id } = action.payload;

         const changedItem = state.selectedProducts.find((item) => id === item.id);

         if (change === 'decrease' && changedItem.amount - 1 < 0) {
            return;
         }

         if (changedItem) {
            changedItem.amount =
               change === 'increase' ? changedItem.amount + 1 : changedItem.amount - 1;
         }

         const newItems = state.selectedProducts.map((item) =>
            item.id === changedItem.id ? changedItem : item,
         );
         state.selectedProducts = newItems;
         setLocalStorageItem<ChosenItem[]>('selectedProducts', newItems);
      },
      changeAmountByValue: (state, action: PayloadAction<{ id: number; value: number }>) => {
         console.log(action.payload);
         const itemIds = Object.keys(action.payload);

         const newState = state.selectedProducts.map((item) => {
            if (itemIds.includes(`${item.id}`)) {
               return { id: item.id, amount: action.payload[item.id] };
            } else {
               return item;
            }
         });
         state.selectedProducts = newState;
         setLocalStorageItem<ChosenItem[]>('selectedProducts', newState);
      },
      addToCart: (state, action: PayloadAction<number[]>) => {
         const selectedProducts: number[] = state.selectedProducts.map(
            (item: ChosenItem) => item.id,
         );

         const data: number[] = action.payload.filter((item) => {
            return !selectedProducts.includes(item);
         });

         let newItems: ChosenItem[] = data.map((item: number) => {
            return { id: item, amount: 1 };
         });

         const newItems2 = [...state.selectedProducts, ...newItems];

         state.selectedProducts = newItems2;
         setLocalStorageItem<ChosenItem[]>('selectedProducts', newItems2);
      },
   },
});

export const {
   setSelectedProducts,
   revalidateProducts,
   deleteItemId,
   changeAmount,
   changeAmountByValue,
   addToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
