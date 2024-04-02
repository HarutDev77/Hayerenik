import React, { FC, useEffect, useState } from 'react';
import ProductItem from '@/components/Parts/ProductItem';
import { PAGINATION_LIMIT } from '@/constants';
import Pagination from '@/components/Parts/Pagination';
import { useRouter } from 'next/router';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { SearchParams } from '@/types/search-params';
import classes from './SearchResult.module.scss';

const SearchResultPage: FC<SearchParams> = ({
   productsData,
   term,
   limit = PAGINATION_LIMIT,
   page = 1,
}) => {
   const [products, setProducts] = useState<{ rows: any[]; count: number }>(productsData);
   const router = useRouter();
   const changePage = async (page: number = 1) => {
      await router.push(`/search-result?term=${term}&page=${page}&limit=${limit}`);
   };

   useEffect(() => {
      setProducts(productsData);
   }, [term, limit, page, productsData]);

   return (
      <div className={classes.hk_search_result_page_main_box}>
         <h1>
            Search results for <span>“{term}”</span>
         </h1>
         <div className={classes.hk_search_result_page_main_box_item_box}>
            {products?.rows?.map((product) => (
               <ProductItem
                  key={product.id}
                  id={product.id}
                  imageUrl={product?.image || ''}
                  title={<DynamicMessage data={product} prop={'title'} />}
                  description={<DynamicMessage data={product} prop={'title'} />}
                  price={product.price}
               />
            ))}
            <Pagination amount={products.count} term={term} limit={limit} page={page} />
         </div>
      </div>
   );
};

export default SearchResultPage;
