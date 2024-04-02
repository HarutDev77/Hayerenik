import React, { ReactElement } from 'react';
import SearchResultPage from '@/components/pages/SearchResult';
import MainLayout from '@/layouts';
import UserApi from '@/api/user.api';
import { PAGINATION_LIMIT } from '@/constants';
import { Product } from '@/types/product';
import { GetServerSidePropsContext } from 'next';
import { SearchParams } from '@/types/search-params';

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const { term = '', limit = PAGINATION_LIMIT, page = 1 } = context.query;
   const productsData: { rows: Product[]; count: number } = await UserApi.searchProducts(
      term as string,
      page as number,
      limit as number,
   );

   return { props: { productsData, term, page, limit } };
}

const SearchResult = (props: SearchParams) => {
   return <SearchResultPage {...props} />;
};

SearchResult.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default SearchResult;
