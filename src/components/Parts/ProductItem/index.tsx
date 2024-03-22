import React, { FC } from 'react';
import Image from 'next/image';
import { BACKEND_IMAGES_URL } from '@/constants/config';
import MainButton from '@/components/Parts/MainButton';
import NoImageAvailable from '@/assets/images/no_product_image.png';
import { useRouter } from 'next/router';
import classes from './ProductItem.module.scss';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProducts } from '@/slices/cartSlice';
import { RootState } from '@/store/store';

interface ProductItem {
   id: number;
   imageUrl?: string;
   title: string | React.ReactNode;
   description: string | React.ReactNode;
   price: number;
   className?: string;
}

const ProductItem: FC<ProductItem> = ({ id, imageUrl, title, description, price, className }) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const selectedProducts = useSelector((state: RootState) => state.cart.selectedProducts);
   const handleClick = () => {
      router.push(`/product/${id}`);
   };

   return (
      <div
         className={classNames(classes.hk_product_item_box, className)}
         onClick={(e: any) => {
            if (e.target.classList.contains('add_to_cart_btn')) {
               return;
            } else {
               handleClick();
            }
         }}
         key={id}
      >
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
            <MainButton
               className={`add_to_cart_btn`}
               text={
                  selectedProducts.map((item) => item.id).includes(+id) ? 'Added' : 'Add to card'
               }
               onClick={() => {
                  dispatch(setSelectedProducts({ id: id, amount: 1 }));
               }}
            />
            <span>{'$' + price}</span>
         </div>
      </div>
   );
};

export default ProductItem;
