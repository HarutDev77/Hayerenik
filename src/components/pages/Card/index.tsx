import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import MainButton from '@/components/Parts/MainButton';
import ImageMinus from '@/assets/images/MinusImg.svg';
import ImagePlus from '@/assets/images/plusImg.svg';
import XImage from '@/assets/images/VectorX.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UserApi from '@/api/user.api';
import { CartProduct, CheckoutInfoProduct } from '@/types/product';
import { BACKEND_IMAGES_URL } from '@/constants/config';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { changeAmount, changeAmountByValue, deleteItemId } from '@/slices/cartSlice';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import classes from './Cart.module.scss';

const CartPage = () => {
   const [items, setItems] = useState<CartProduct[]>([]);
   const [allPrice, setAllPrice] = useState(0);
   const [screenSize, setScreenSize] = useState<number>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [itemBordersStates, setItemBordersStates] = useState<Record<number, boolean>>({});

   const choseItems = useSelector((state: RootState) => state.cart.selectedProducts);
   const dispatch = useDispatch();
   const router = useRouter();

   useEffect(() => {
      // const newItems = choseItems.reduce((accum, item) => {
      //    accum[item.id] = false;
      //
      //    return accum;
      // }, {});
      // setItemBordersStates(newItems);

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

   const calculatePrice = (change: 'increase' | 'decrease', id: number) => {
      dispatch(changeAmount({ id: id, change }));
   };

   const totalPrice = (price: number, qty: number): number => {
      return price * qty;
   };

   const calculateTotalPrice = useCallback(
      () => items.reduce((accum, item) => accum + totalPrice(item.price, item.qty), 0),
      [items],
   );

   const deleteItem = (id: number) => {
      setItems(items.filter((item) => item.id !== id));
      dispatch(deleteItemId({ id: id }));
   };

   const checkOut = () => {
      const newItems = choseItems.map((item) => ({ productId: item.id, qty: item.amount }));

      (async () => {
         const response = await UserApi.goToCheckout(newItems);

         if (response.needToRedirectToCheckout) {
            await router.push('/order');
         } else {
            setIsModalOpen(true);

            const unavailableIds = response.unavailableProducts.map(
               (unavailableProduct: CheckoutInfoProduct) => unavailableProduct.productId,
            );

            choseItems.forEach((item) => {
               if (unavailableIds.includes(item.id)) {
                  itemBordersStates[item.id] = true;
               }
            });

            setItemBordersStates(itemBordersStates);
            dispatch(
               changeAmountByValue(
                  choseItems.reduce((accum, item) => {
                     if (unavailableIds.includes(item.id)) {
                        accum = {
                           ...accum,
                           [item.id]: response.unavailableProducts.find(
                              (product) => product.productId === item.id,
                           ).availableQty,
                        };
                     }
                     return accum;
                  }, {}),
               ),
            );
         }
      })();
   };

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
            <Modal
               title='Basic Modal'
               open={isModalOpen}
               onOk={() => setIsModalOpen(false)}
               onCancel={() => setIsModalOpen(false)}
            >
               {' '}
               <FormattedMessage id={'basketWarningText'} />
            </Modal>
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
                             <Image
                                src={`${BACKEND_IMAGES_URL}/${item.image}`}
                                alt='item image'
                                width={45}
                                height={45}
                             />
                          </div>
                          <div>
                             <p>
                                <DynamicMessage prop={'title'} data={item} />
                             </p>
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
                                onClick={() => calculatePrice('decrease', item.id)}
                             />
                             <p
                                style={
                                   itemBordersStates[item.id]
                                      ? { border: '2px solid blue' }
                                      : { border: `2px solid #ffcd1bb3` }
                                }
                             >
                                {choseItems.find((product) => product?.id === item.id)?.amount}
                             </p>
                             <Image
                                className={classes.hk_cart_item_to_buy_second_box_image}
                                src={ImagePlus}
                                alt='image plus'
                                priority={true}
                                onClick={() => calculatePrice('increase', item.id)}
                             />
                          </div>
                          <div>
                             <p>
                                $
                                {totalPrice(
                                   item.price,
                                   choseItems.find((product) => product.id === item.id)?.amount,
                                )}
                             </p>
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
                             <Image
                                src={`${BACKEND_IMAGES_URL}/${item.image}`}
                                alt='item image'
                                width={45}
                                height={45}
                             />
                          </div>
                       </div>
                       <div className={classes.hk_cart_mobile_second}>
                          <div>
                             <p>
                                <DynamicMessage prop={'title'} data={item} />
                             </p>
                          </div>
                          <div className={classes.price_and_amount_box}>
                             <div className={classes.item_price}>${item.price}</div>
                             <div className={classes.change_amount_box}>
                                <Image
                                   className={classes.hk_cart_item_to_buy_second_box_image}
                                   src={ImageMinus}
                                   alt='image minus'
                                   priority={true}
                                   onClick={() => calculatePrice('decrease', item.id)}
                                />
                                <p>
                                   {choseItems.find((product) => product.id === item.id)?.amount}
                                </p>
                                <Image
                                   className={classes.hk_cart_item_to_buy_second_box_image}
                                   src={ImagePlus}
                                   alt='image plus'
                                   priority={true}
                                   onClick={() => calculatePrice('increase', item.id)}
                                />
                             </div>
                          </div>
                       </div>
                       <div className={classes.hk_cart_mobile_last}>
                          <p>
                             $
                             {totalPrice(
                                item.price,
                                choseItems.find((product) => product.id === item.id)?.amount,
                             )}
                          </p>
                       </div>
                    </div>
                 ))}
         </div>
         <div className={classes.hk_cart_div_underscore}></div>
         <div className={classes.hk_cart_div_all_price}>
            <p>
               <span>Total</span>$
               {items.reduce(
                  (accum, item) =>
                     accum +
                     item.price * choseItems.find((product) => product.id === item.id)?.amount,
                  0,
               )}
            </p>
         </div>
         <div className={classes.hk_cart_div_button_container}>
            <MainButton
               onClick={checkOut}
               text={'Check out'}
               width={'200px'}
               height={'50px'}
               fontSize={'20px'}
            />
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
