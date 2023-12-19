import React, {ReactElement} from 'react';
import CartPage from "@/components/pages/Card";
import MainLayout from "@/layouts";

const Cart = () => {
    return <CartPage/>
};

Cart.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default Cart;