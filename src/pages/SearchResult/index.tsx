import React, {ReactElement} from 'react';
import classes from "./SearchResult.module.scss";
import {ALL_ITEMS} from "@/costants";
import ProductItem from "@/components/Parts/ProductItem";
import MainLayout from "@/layouts";
import Contacts from "@/pages/Contacts";

const SearchResult = () => {
    return (
        <div className={classes.hk_search_result_page_main_box}>
            <h1>Search results for <span>“book”</span></h1>
            <div className={classes.hk_search_result_page_main_box_item_box}>
                {ALL_ITEMS.map((item)=>(
                    <ProductItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

SearchResult.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default SearchResult;