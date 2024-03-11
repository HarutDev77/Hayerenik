import React, { ReactElement } from 'react';
import OrderPage from '@/components/pages/Order';
import MainLayout from '@/layouts';

const Order = () => {
   return <OrderPage />;
};

Order.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
export default Order;
