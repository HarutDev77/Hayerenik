import React, {ReactElement, useState} from 'react';
import {CHOSE_ITEMS} from "@/costants";
import ImageMinus from "@/assets/images/MinusImg.svg";
import ImagePlus from "@/assets/images/plusImg.svg";
import Image from "next/image";
import classes from "./Cart.module.scss";
import MainLayout from "@/layouts";

// interface IItem {
//     id: number,
//     price: number,
//     imageUrl: string,
//     title: string,
//     count: number
// }
const  Cart  = () => {

    const [items,setItems] = useState(CHOSE_ITEMS)

    return (
        <div>
            <div className={classes.hk_cart}>
                <h2>Cart</h2>
                {items.map(item=>(
                    <div
                        key={item.id}
                        className={classes.hk_cart_item_to_buy}
                    >
                        <div className={classes.hk_cart_item_to_buy_first_box}>
                            <div>X</div>
                            <div className={classes.hk_cart_item_to_buy_first_box_image}>
                                <Image
                                    src={item.imageUrl}
                                    alt="item image"
                                    priority={true}
                                />
                            </div>
                            <div>
                                <p>{item.title}</p>
                                <p>{item.price}</p>
                            </div>
                        </div>
                        <div className={classes.hk_cart_item_to_buy_second_box}>
                            <div>
                                <Image
                                    className={classes.hk_cart_item_to_buy_second_box_image}
                                    src={ImageMinus}
                                    alt="image minus"
                                    priority={true}
                                />
                                <p>{item.amount}</p>
                                <Image
                                    className={classes.hk_cart_item_to_buy_second_box_image}
                                    src={ImagePlus}
                                    alt="image plus"
                                    priority={true}
                                />
                            </div>
                            <div>
                                {item.totalPrice()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.hk_cart_div_underscore}></div>
        </div>

    );
};

Cart.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default Cart;