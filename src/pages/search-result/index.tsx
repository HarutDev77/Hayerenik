import React, {ReactElement} from 'react';
import SearchResultPage from "@/components/pages/SearchResult";
import MainLayout from "@/layouts";
import UserApi from "@/api/user.api";
import { PAGINATION_LIMIT } from "@/constants";

export async function getServerSideProps(context) {
    const { term, limit = PAGINATION_LIMIT, page = 1 } = context.query;
    const productsData = await UserApi.searchProducts(term, page, limit);

    return { props: { productsData, term, page, limit } };
}
const SearchResult = ({ productsData, term, page, limit }) => {
    return (
        <SearchResultPage productsData={productsData} term={term} page={page} limit={limit} />
    );
};

SearchResult.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default SearchResult;