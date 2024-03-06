import React, { FC } from 'react';
import Header from '@/components/Parts/Header';
import Footer from '@/components/Parts/Footer';
import { TopCategory } from '@/types/category';

interface LayoutProp {
   children: React.ReactNode;
}

const MainLayout: FC<LayoutProp> = ({ children }) => {
   return (
      <>
         <Header />
         <main>{children}</main>
         <Footer />
      </>
   );
};

export default MainLayout;
