import React, {FC} from 'react';
import Image from "next/image";
import MainButton from "@/components/Parts/MainButton";
import classes from "./ProductItem.module.scss";

interface ProductItem {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    price: number

}

const ProductItem:FC<ProductItem> = ({id,imageUrl,title,description,price}) => {
    return (
        <div className={classes.hk_product_item_box} key={id}>
            <div>
                <Image
                    src={imageUrl}
                    alt={title}
                    priority={true}
                />
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
    );
};

export default ProductItem;