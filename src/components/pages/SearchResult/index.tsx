import React, {useEffect, useState} from 'react';
import ProductItem from "@/components/Parts/ProductItem";
import classes from "./SearchResult.module.scss";
import {PAGINATION_LIMIT} from "@/constants";
import {Pagination} from "antd";
import UserApi from "@/api/user.api";
import {useRouter} from "next/router";

const SearchResultPage = ({ productsData, term, limit = PAGINATION_LIMIT, page = 1 }) => {
    const [products, setProducts] = useState<{rows: any[], count: number}>(productsData);
    const router = useRouter();
    const { locale } = router;
    const changePage = async (page: number = 1) => {
        await router.push(`/search-result?term=${term}&page=${page}&limit=${limit}`);
    }

    useEffect(() => {
        setProducts(productsData)
    }, [term, limit, page, productsData]);


    return (
        <div className={classes.hk_search_result_page_main_box}>
            <h1>Search results for <span>“{term}”</span></h1>
            <div className={classes.hk_search_result_page_main_box_item_box}>
                {products?.rows?.map((product)=>(
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        imageUrl={product.image}
                        title={locale === 'en' || product.titleAm ? product.titleEn : product.titleAm}
                        description={locale === 'en' || !product.descriptionAm ? product.descriptionEn : product.descriptionAm}
                        price={product.price}
                    />
                ))}
            </div>

            <Pagination
                style={{ marginBottom: '150px', textAlign: 'center'}}
                onChange={changePage}
                defaultPageSize={limit}
                total={products?.count || 0}
            />
        </div>

    );
};

export default SearchResultPage;