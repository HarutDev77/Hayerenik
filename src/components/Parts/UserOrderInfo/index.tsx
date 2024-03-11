import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { CHOSE_ITEMS } from '@/constants';
import { OrderItem } from '@/types/order';
import Image from 'next/image';
import classes from './UserOrderInfo.module.scss';
import MainButton from '@/components/Parts/MainButton';

interface IUserOrderInfo {
   style?: CSSProperties;
   chosenItems: OrderItem[];
   isMobile: boolean;
}

const UserOrderInfo: FC<IUserOrderInfo> = ({ style, chosenItems, isMobile }) => {
   return (
      <div id={'user_order_info'} className={classes.hk_user_order_info} style={style}>
         {chosenItems.map((item: OrderItem) => (
            <div key={item.id} className={classes.hk_user_order_item}>
               <div className={classes.hk_user_order_item_image_box}>
                  <Image src={item.imageUrl} alt={'item image'} />
               </div>
               <div className={classes.hk_user_order_item_title_and_price}>
                  <p>{item.title}</p>
                  <p>$ {item.price}</p>
               </div>
               <div className={classes.hk_user_order_item_amount}>{item.amount}</div>
               <div className={classes.hk_user_order_item_total_price}>
                  <p>${item.totalPrice()}</p>
               </div>
            </div>
         ))}
         <div className={classes.hk_user_order_item_delivery}>
            <p>Delivery</p>
            <p>${chosenItems.reduce((accum, val) => accum + val.delivery, 0)}</p>
         </div>
         <div className={classes.hk_user_order_total}>
            {!isMobile && (
               <p>
                  <span>total</span>$
                  {chosenItems.reduce(
                     (accum, val) => accum + (val.amount * val.price + val.delivery),
                     0,
                  )}
               </p>
            )}
         </div>
      </div>
   );
};

export default UserOrderInfo;
