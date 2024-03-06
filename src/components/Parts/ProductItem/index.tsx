import React, { FC } from 'react';
import Link from 'next/link';
import { BACKEND_IMAGES_URL } from '@/constants/config';
import MainButton from '@/components/Parts/MainButton';
import NoImageAvailable from '@/assets/images/no_product_image.png';
import classes from './ProductItem.module.scss';
import Image from 'next/image';

interface ProductItem {
   id: number;
   imageUrl?: string;
   title: string | React.ReactNode;
   description: string | React.ReactNode;
   price: number;
}

const ProductItem: FC<ProductItem> = ({ id, imageUrl, title, description, price }) => {
   return (
      <Link
         rel='preload'
         style={{ textDecoration: 'none', color: 'black' }}
         href={`/product/${id}`}
         key={id}
      >
         <div className={classes.hk_product_item_box} key={id}>
            <div>
               {imageUrl ? (
                  <img src={`${BACKEND_IMAGES_URL}/${imageUrl}`} alt={`${title}`} />
               ) : (
                  <Image src={NoImageAvailable} alt={'no image available'} priority={true} />
               )}
            </div>
            <div>
               <h3>{title}</h3>
               <p>{description}</p>
            </div>
            <div>
               <MainButton text={'Add to card'} />
               <span>{'$' + price}</span>
            </div>
         </div>
      </Link>
   );
};

export default ProductItem;
