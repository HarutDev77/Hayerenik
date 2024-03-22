import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import TextArea from 'antd/lib/input/TextArea';
import MainButton from '@/components/Parts/MainButton';
import UserOrderInfo from '@/components/Parts/UserOrderInfo';
import ExpandedArrow from '@/assets/images/expanded-arrow.svg';
import HiddenArrow from '@/assets/images/hidden-arrow.svg';
import Image from 'next/image';
import classes from './Order.module.scss';
import UserApi from '@/api/user.api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CartProduct } from '@/types/product';

const OrderPage = () => {
   const [isMobile, setIsMobile] = useState<boolean>(false);
   const [isExpanded, setIsExpanded] = useState<boolean>(false);
   const [items, setItems] = useState<CartProduct[]>([]);

   const choseItems = useSelector((state: RootState) => state.cart.selectedProducts);

   useEffect(() => {
      function handleResize() {
         const screenWidth = window?.innerWidth;

         if (screenWidth && screenWidth < 990) {
            setIsMobile(true);
         } else {
            setIsMobile(false);
         }
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      const getProducts = async () => {
         const response = await UserApi.getProductsByIds(choseItems.map((item) => item.id));
         setItems(response.rows);
      };

      (async () => {
         if (choseItems.length) {
            await getProducts();
         }
      })();
   }, [choseItems]);

   return (
      <section className={classes.hk_user_order}>
         <h1>Check Out</h1>
         <div className={classes.hk_user_order_content}>
            <div className={classes.hk_user_order_delivery_form}>
               <div>
                  <h3>Contact</h3>
                  <Input placeholder={'e-mail*'} />
               </div>
               <div>
                  <h3>Delivery</h3>
                  <Input placeholder={'Country*'} />
               </div>
               <div className={classes.hk_user_order_user_name_box}>
                  <Input placeholder={'First name*'} />
                  <Input placeholder={'Last name*'} />
               </div>
               <div>
                  <Input placeholder={'Address*'} />
               </div>
               <div className={classes.hk_user_order_user_name_box}>
                  <Input placeholder={'Postal code*'} />
                  <Input placeholder={'City*'} />
               </div>
               <div className={classes.hk_user_order_nodes}>
                  <TextArea placeholder={'notes'} />
               </div>
               <div className={classes.hk_user_order_button_box}>
                  <MainButton width={'200px'} height={'52px'} text={'Pay now'} />
                  <MainButton width={'126px'} height={'52px'} text={'Cancel'} />
               </div>
            </div>

            {!isMobile ? (
               <UserOrderInfo isMobile={isMobile} chosenItems={items} />
            ) : (
               <>
                  <p
                     className={classes.hk_order_basket}
                     onClick={() => setIsExpanded((prev: boolean) => !prev)}
                  >
                     <Image src={isExpanded ? ExpandedArrow : HiddenArrow} alt={'expand arrow'} />
                     Hide order summary
                  </p>
                  <UserOrderInfo
                     chosenItems={items}
                     isMobile={isMobile}
                     style={{
                        height: isExpanded ? `${(items.length + 1) * 62 + 20}px` : 0,
                        overflow: isExpanded ? 'visible' : 'hidden',
                        transition: '0.7s',
                     }}
                  />
                  <div
                     // style={{ justifyContent: isMobile ? 'space-between' : 'flex-end' }}
                     // style={isMobile ? { justifyContent: 'space-between' } : { display: 'none' }}
                     className={classes.hk_user_order_total}
                  >
                     {isMobile ? (
                        <div className={classes.hk_user_order_button_box}>
                           <MainButton width={'125px'} height={'34px'} text={'Pay now'} />
                           <MainButton width={'125px'} height={'34px'} text={'Cancel'} />
                        </div>
                     ) : null}
                     <div>
                        <p>
                           <span>total</span>$
                           {items.reduce(
                              (accum, val) =>
                                 accum +
                                 choseItems.find((product) => product.id === val.id)?.amount *
                                    val.price,
                              0,
                           )}
                        </p>
                     </div>
                  </div>
               </>
            )}
         </div>
      </section>
   );
};

export default OrderPage;
