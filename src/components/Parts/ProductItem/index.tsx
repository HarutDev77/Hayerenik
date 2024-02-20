import React, {FC} from 'react';
import Image from "next/image";
import MainButton from "@/components/Parts/MainButton";
import classes from "./ProductItem.module.scss";
import Link from "next/link";
import {BACKEND_IMAGES_URL} from "@/constants/config";

interface ProductItem {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    price: number

}

const ProductItem:FC<ProductItem> = ({id,imageUrl,title,description,price}) => {
    return (
        <Link rel='preload' style={{ textDecoration: 'none', color: 'black' }} href={`/product/${id}`} key={id}>
            <div className={classes.hk_product_item_box} key={id}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${BACKEND_IMAGES_URL}/${imageUrl}`} alt={`${title}`}/>
                </div>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div>
                    <MainButton text={"Add to card"}/>
                    <span>{"$" + price}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;