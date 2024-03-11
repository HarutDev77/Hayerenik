import { FC } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import ProductItem from '@/components/Parts/ProductItem';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { Bestseller } from '@/types/bestseller';
import classes from './Bestsellers.module.scss';

interface ISectionBestsellers {
   bestsellers: Bestseller[];
   margin?: string;
}
const SectionBestsellers: FC<ISectionBestsellers> = ({
   bestsellers,
   margin = '350px auto 45px',
}: ISectionBestsellers) => {
   return (
      <section style={{ margin }} className={classes.hk_home_section_bestsellers}>
         <div>
            {!!bestsellers.length && (
               <h2 className={classes.hk_home_section_bestsellers_title}>
                  <FormattedMessage id={'bestsellers'} />
               </h2>
            )}
            <div className={classes.hk_home_section_bestsellers_items_container}>
               {bestsellers?.map((item) => (
                  <ProductItem
                     key={item.id}
                     id={item.id}
                     imageUrl={item.image}
                     title={<DynamicMessage data={item} prop={'title'} />}
                     description={<DynamicMessage data={item} prop={'shortDescription'} />}
                     price={item.price}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};

export default SectionBestsellers;
