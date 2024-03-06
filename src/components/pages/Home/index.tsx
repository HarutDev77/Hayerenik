import { FC } from 'react';

import SectionHeader from '@/components/pages/Home/SectionHeader';
import SectionBestsellers from '@/components/pages/Home/Bestsellers';
import SectionTopCategories from '@/components/pages/Home/TopCategories';
import SectionReviews from '@/components/pages/Home/Reviews';
import SectionDifferentAges from '@/components/pages/Home/DifferentAges';
import { Bestseller } from '@/types/bestseller';
import { TopCategory } from '@/types/category';

const Home: FC<{ bestsellers: Bestseller[]; topCategories: TopCategory[] }> = ({
   bestsellers,
   topCategories,
}) => {
   return (
      <>
         <SectionHeader />
         <SectionBestsellers bestsellers={bestsellers} />
         <SectionTopCategories topCategories={topCategories} />
         <SectionReviews />
         <SectionDifferentAges />
      </>
   );
};

export default Home;
