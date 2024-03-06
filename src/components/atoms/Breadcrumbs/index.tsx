import React, { FC } from 'react';
import Image from 'next/image';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { Breadcrumb } from '@/types/breadcrumb';
import ArrowImage from '@/assets/images/icon_arrow.svg';
import classes from './breadcrumbs.module.scss';

interface IBreadcrumbs {
   breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: FC<IBreadcrumbs> = ({ breadcrumbs }: IBreadcrumbs) => {
   return (
      <>
         <div className={classes.breadcrumb}>
            <span>All</span>
            {breadcrumbs.map((breadcrumb: Breadcrumb) => (
               <div key={breadcrumb.id} className={classes.breadcrumb_item_cont}>
                  <Image src={ArrowImage} alt='Arrow Image' priority={true} />
                  <span>
                     <DynamicMessage data={breadcrumb} prop={'title'} />
                  </span>
               </div>
            ))}
         </div>
      </>
   );
};

export default Breadcrumbs;
