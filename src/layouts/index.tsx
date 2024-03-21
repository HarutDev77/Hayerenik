import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/components/Parts/Header';
import Footer from '@/components/Parts/Footer';
import { getLocalStorageItem } from '@/helpers/localStorage';
import { RootState } from '@/store/store';
import { ChosenItem, revalidateProducts } from '@/slices/cartSlice';

interface LayoutProp {
   children: React.ReactNode;
}

const MainLayout: FC<LayoutProp> = ({ children }) => {
   const dispatch = useDispatch();
   const chosenItems = useSelector((state: RootState) => state.cart.selectedProducts);

   useEffect(() => {
      const revalidateStore = () => {
         const selectedProducts = getLocalStorageItem<ChosenItem[]>('selectedProducts');
         console.log(selectedProducts, 'chosenItems', chosenItems);
         if (selectedProducts?.length && !chosenItems.length) {
            dispatch(revalidateProducts(selectedProducts));
         }
      };

      revalidateStore();
   }, [chosenItems.length, dispatch]);

   return (
      <>
         <Header />
         <main>{children}</main>
         <Footer />
      </>
   );
};

export default MainLayout;
