import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import BigPuzzle from '@/components/pages/Home/TopCategories/BigPuzzle';
import { PUZZLE_COLORS } from '@/constants';

import { TopCategory } from '@/types/category';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import classes from './TopCategories.module.scss';

const SectionTopCategories: FC<{ topCategories: TopCategory[] }> = ({ topCategories }) => {
   const [selectedImgId, setSelectedImgId] = useState<number>();

   const handleMouseEnter = (num: number) => {
      setSelectedImgId(num);
   };

   const handleMouseLeave = () => {
      setSelectedImgId(undefined);
   };

   return (
      <section className={classes.hk_home_section_top_categories}>
         <div>{!!topCategories.length && <h2>{<FormattedMessage id={'topCategories'} />}</h2>}</div>
         <div className={classes.hk_home_section_top_categories_box}>
            {topCategories.slice(0, 3).map((category: TopCategory, index: number) => (
               <BigPuzzle
                  id={category.id}
                  key={category.id}
                  color={PUZZLE_COLORS[index]}
                  src={category.img}
                  alt={category.titleEn}
                  title={<DynamicMessage data={category} prop={'title'} />}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  isShow={selectedImgId === category.id}
               />
            ))}
         </div>
      </section>
   );
};

export default SectionTopCategories;
