import React, { useCallback, useEffect, useState } from 'react'
import { CHOSE_ITEMS } from '@/constants'
import ImageMinus from '@/assets/images/MinusImg.svg'
import ImagePlus from '@/assets/images/plusImg.svg'
import Image from 'next/image'
import XImage from '@/assets/images/VectorX.svg'
import classes from './Cart.module.scss'
import MainButton from '@/components/Parts/MainButton'

// interface ICartItem {
//     id: number,
//     price: number,
//     imageUrl: string,
//     title: string,
//     amount: number,
//     totalPrice: ()=> number
// }

const CartPage = () => {
   const [items, setItems] = useState(CHOSE_ITEMS)
   const [allPrice, setAllPrice] = useState(0)

   const calculatePrice = (changeAmount, id) => {
      if (changeAmount === 'plus') {
         const newItems = items.map((item) => {
            if (item.id === id) {
               item.amount += 1
            }
            return item
         })
         setItems(newItems)
      } else {
         const newItems = items.map((item) => {
            if (item.id === id && item.amount >= 2) {
               item.amount -= 1
            }
            return item
         })
         setItems(newItems)
      }
   }

   const calculateTotalPrice = useCallback(
      () => items.reduce((accum, item) => accum + item.totalPrice(), 0),
      [items],
   )

   const deleteItem = (id) => setItems(items.filter((item) => item.id !== id))

   useEffect(() => {
      setAllPrice(calculateTotalPrice())
   }, [calculateTotalPrice])

   return (
      <div>
         <div className={classes.hk_cart}>
            <h2>Cart</h2>
            {items.map((item) => (
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
   )
}

export default CartPage
