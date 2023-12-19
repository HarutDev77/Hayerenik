import React, {ReactElement} from 'react';
import SearchResultPage from "@/components/pages/SearchResult";
import MainLayout from "@/layouts";

const SearchResult = () => {
    return (
        <SearchResultPage/>
    );
};

SearchResult.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default SearchResult;