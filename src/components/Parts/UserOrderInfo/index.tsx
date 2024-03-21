import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { CHOSE_ITEMS } from '@/constants';
import { OrderItem } from '@/types/order';
import Image from 'next/image';
import classes from './UserOrderInfo.module.scss';
import MainButton from '@/components/Parts/MainButton';
import { CartProduct } from '@/types/product';
import { BACKEND_IMAGES_URL } from '@/constants/config';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface IUserOrderInfo extends CartProduct {
   style?: CSSProperties;
   chosenItems: OrderItem[];
   isMobile: boolean;
}

const UserOrderInfo: FC<IUserOrderInfo> = ({ style, chosenItems, isMobile }) => {
   const choseItems = useSelector((state: RootState) => state.cart.selectedProducts);

   return (
      <div id={'user_order_info'} className={classes.hk_user_order_info} style={style}>
         {chosenItems.map((item: OrderItem) => (
            <div key={item.id} className={classes.hk_user_order_item}>
               <div className={classes.hk_user_order_item_image_box}>
                  <Image
                     src={`${BACKEND_IMAGES_URL}/${item.image}`}
                     alt={'item image'}
                     priority={true}
                     width={35}
                     height={35}
                  />
               </div>
               <div className={classes.hk_user_order_item_title_and_price}>
                  <p>
                     {' '}
                     <DynamicMessage prop={'title'} data={item} />
                  </p>
                  <p>$ {item.price}</p>
               </div>
               <div className={classes.hk_user_order_item_amount}>
                  {choseItems.find((product) => product.id === item.id)?.amount}
               </div>
               <div className={classes.hk_user_order_item_total_price}>
                  <p>
                     ${choseItems.find((product) => product.id === item.id)?.amount * item.price}
                  </p>
               </div>
            </div>
         ))}
         <div className={classes.hk_user_order_item_delivery}>
            <p>Delivery</p>
            {/*<p>${chosenItems.reduce((accum, val) => accum + val.delivery, 0)}</p>*/}
            <p>$0</p>
         </div>
         <div className={classes.hk_user_order_total}>
            {!isMobile && (
               <p>
                  <span>total</span>$
                  {chosenItems.reduce(
                     (accum, val) =>
                        accum +
                        choseItems.find((product) => product.id === val.id)?.amount * val.price,
                     0,
                  )}
               </p>
            )}
         </div>
      </div>
   );
};

export default UserOrderInfo;
