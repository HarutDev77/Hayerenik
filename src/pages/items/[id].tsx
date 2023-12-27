import React, {ReactElement} from 'react';
import MainLayout from "@/layouts";
import ItemPage from "@/components/pages/ItemPage";

const Item = () => {

    return <ItemPage/>
};

Item.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default Item;