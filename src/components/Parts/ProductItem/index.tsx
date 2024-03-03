import React, { FC } from 'react'
import Image from 'next/image'
import MainButton from '@/components/Parts/MainButton'
import classes from './ProductItem.module.scss'
import Link from 'next/link'
import classNames from 'classnames';
import { BACKEND_IMAGES_URL } from '@/constants/config'
import { JSXElement } from '@babel/types'
import image from '@/assets/images/stationary.jpg'

interface ProductItem {
   id: number
   imageUrl: string
   title: string | unknown
   description: string | unknown
   price: number
   className?: string
}

const ProductItem: FC<ProductItem> = ({ id, imageUrl, title, description, price, className }) => {
   return (
      <Link
         rel='preload'
         style={{ textDecoration: 'none', color: 'black' }}
         href={`/product/${id}`}
         key={id}
      >
         <div className={classNames(classes.hk_product_item_box, className)} key={id}>
            <div>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <Image src={image} alt={`${title}`} />
            </div>
            <div>
               <h3>{title}</h3>
               <p>{description}</p>
            </div>
            <div>
               <MainButton text={'Add to card'} />
               <span>{'$' + price}</span>
            </div>
         </div>
      </Link>
   )
}

export default ProductItem
