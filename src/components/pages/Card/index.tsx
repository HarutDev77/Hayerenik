import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { CHOSE_ITEMS } from '@/constants';
import MainButton from '@/components/Parts/MainButton';
import ImageMinus from '@/assets/images/MinusImg.svg';
import ImagePlus from '@/assets/images/plusImg.svg';
import XImage from '@/assets/images/VectorX.svg';
import classes from './Cart.module.scss';

const CartPage = () => {
   const [items, setItems] = useState(CHOSE_ITEMS);
   const [allPrice, setAllPrice] = useState(0);
   const [screenSize, setScreenSize] = useState<number>();

   const calculatePrice = (changeAmount: 'plus' | 'minus', id: number) => {
      if (changeAmount === 'plus') {
         const newItems = items.map((item) => {
            if (item.id === id) {
               item.amount += 1;
            }
            return item;
         });
         setItems(newItems);
      } else {
         const newItems = items.map((item) => {
            if (item.id === id && item.amount >= 2) {
               item.amount -= 1;
            }
            return item;
         });
         setItems(newItems);
      }
   };

   const calculateTotalPrice = useCallback(
      () => items.reduce((accum, item) => accum + item.totalPrice(), 0),
      [items],
   );

   const deleteItem = (id: number) => setItems(items.filter((item) => item.id !== id));

   useEffect(() => {
      setAllPrice(calculateTotalPrice());
   }, [calculateTotalPrice]);

   useEffect(() => {
      function handleResize() {
         setScreenSize(window?.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <div>
         <div className={classes.hk_cart}>
            <h2>Cart</h2>
            {screenSize > 767
               ? items.map((item) => (
                    <div key={item.id} className={classes.hk_cart_item_to_buy}>
                       <div className={classes.hk_cart_item_to_buy_first_box}>
                          <div>
                             <Image
                                src={XImage}
                                alt='X'
                                priority={true}
                                onClick={() => deleteItem(item.id)}
                             />
                          </div>
                          <div className={classes.hk_cart_item_to_buy_first_box_image}>
                             <Image src={item.imageUrl} alt='item image' priority={true} />
                          </div>
                          <div>
                             <p>{item.title}</p>
                             <p>$ {item.price}</p>
                          </div>
                       </div>
                       <div className={classes.hk_cart_item_to_buy_second_box}>
                          <div>
                             <Image
                                className={classes.hk_cart_item_to_buy_second_box_image}
                                src={ImageMinus}
                                alt='image minus'
                                priority={true}
                                onClick={() => calculatePrice('minus', item.id)}
                             />
                             <p>{item.amount}</p>
                             <Image
                                className={classes.hk_cart_item_to_buy_second_box_image}
                                src={ImagePlus}
                                alt='image plus'
                                priority={true}
                                onClick={() => calculatePrice('plus', item.id)}
                             />
                          </div>
                          <div>
                             <p>${item.totalPrice()}</p>
                          </div>
                       </div>
                    </div>
                 ))
               : items.map((item) => (
                    <div key={item.id}>
                       <div className={classes.hk_cart_mobile}>
                          <div>
                             <Image
                                src={XImage}
                                alt='X'
                                priority={true}
                                onClick={() => deleteItem(item.id)}
                             />
                          </div>
                          <div>
                             <Image src={item.imageUrl} alt='item image' priority={true} />
                          </div>
                       </div>
                       <div className={classes.hk_cart_mobile_second}>
                          <div>
                             <p>dkdkkdkdkhgtrddkkdkdk jaamiamiam dmeidm{item.title}</p>
                          </div>
                          <div className={classes.price_and_amount_box}>
                             <div className={classes.item_price}>${item.price}</div>
                             <div className={classes.change_amount_box}>
                                <Image
                                   className={classes.hk_cart_item_to_buy_second_box_image}
                                   src={ImageMinus}
                                   alt='image minus'
                                   priority={true}
                                   onClick={() => calculatePrice('minus', item.id)}
                                />
                                <p>{item.amount}</p>
                                <Image
                                   className={classes.hk_cart_item_to_buy_second_box_image}
                                   src={ImagePlus}
                                   alt='image plus'
                                   priority={true}
                                   onClick={() => calculatePrice('plus', item.id)}
                                />
                             </div>
                          </div>
                       </div>
                       <div className={classes.hk_cart_mobile_last}>
                          <p>${item.totalPrice()}</p>
                       </div>
                    </div>
                 ))}
         </div>
         <div className={classes.hk_cart_div_underscore}></div>
         <div className={classes.hk_cart_div_all_price}>
            <p>
               <span>Total</span>${allPrice}
            </p>
         </div>
         <div className={classes.hk_cart_div_button_container}>
            <MainButton text={'Check out'} width={'200px'} height={'50px'} fontSize={'20px'} />
            <MainButton
               text={'Continue shopping'}
               width={'244px'}
               height={'50px'}
               fontSize={'20px'}
            />
         </div>
      </div>
   );
};

export default CartPage;
