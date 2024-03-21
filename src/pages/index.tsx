import MainLayout from '@/layouts';
import { ReactElement } from 'react';
import Home from '@/components/pages/Home';
import UserApi from '@/api/user.api';
import { Bestseller } from '@/types/bestseller';
import { TopCategory } from '@/types/category';

export async function getServerSideProps() {
   const bestsellers = await UserApi.getBestsellers();
   const topCategories = await UserApi.getTopCategories(5);

   return { props: { bestsellers, topCategories } };
}

const HomePage = ({
   bestsellers,
   topCategories,
}: {
   bestsellers: Bestseller[];
   topCategories: TopCategory[];
}) => {
   return <Home topCategories={topCategories} bestsellers={bestsellers} />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
export default HomePage;
