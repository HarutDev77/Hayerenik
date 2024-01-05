import React, { useState } from 'react'
import Image from 'next/image'
import ArrowImage from '@/assets/images/icon_arrow.svg'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'rc-checkbox'
import MainButton from '@/components/Parts/MainButton'
import Bestsellers from '@/components/pages/Home/Bestsellers'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import classes from './ItemPage.module.scss'
import { FRONTEND_URL } from '@/constants/config'

const ItemPage = ({ product }) => {
   const [price, setPrice] = useState(product.price)

   const changePrice = (e: CheckboxChangeEvent, subProductPrice: number) => {
      if (e.target.checked) {
         setPrice((prevState) => prevState + subProductPrice)
      } else {
         setPrice((prevState) => prevState - subProductPrice)
      }
   }

   if (!product) {
      return <p>Product not found</p>
   }

   return (
      <>
         <section className={classes.hk_item_page_main_section}>
            <div className={classes.hk_item_page_main_section_route}>
               <span>All</span>
               <Image src={ArrowImage} alt='Arrow Image' priority={true} />
               <span>Books</span>
            </div>
            <div className={classes.hk_item_page_main_section_main_box}>
               <div className={classes.hk_item_page_main_section_main_box_first_box}>
                  <div>
                     <Image src={product.imageUrl} alt={'product image'} />
                  </div>
                  <div className={'swiper_container'}>
                     <Swiper autoHeight={false} spaceBetween={20} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
                        {product.images.map((image, index) => (
                           <div key={index}>
                              <SwiperSlide className={classes.hk_item_page_main_section_main_box_first_box_swiper_container}>
                                 <Image src={image} alt={'product image'} />
                              </SwiperSlide>
                           </div>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className={classes.hk_item_page_main_section_main_box_second_box}>
                  <div className={classes.hk_item_page_main_section_main_box_second_box_first_elem}>
                     <h2>{product.title}</h2>
                     <p className={classes.hk_item_page_main_section_main_box_second_box_first_elem_description}>{product.description}</p>
                     <h3>Details</h3>
                     {product.properties.map((property, index) => (
                        <p key={index}>
                           <span>{property.name}:</span>
                           {property.value}
                        </p>
                     ))}
                  </div>
                  {product.subProducts.map((product) => (
                     <div key={product.id}>
                        <div className={classes.hk_item_page_main_section_main_box_second_box_product_container}>
                           <Checkbox onChange={(e) => changePrice(e, product.price)}></Checkbox>
                           <div>
                              <Image src={product.imageUrl} alt={'item image'} priority={true} />
                           </div>
                           <p>{product.title}</p>
                           <p>${product.price}</p>
                        </div>
                     </div>
                  ))}
                  <div className={classes.hk_item_page_main_section_main_box_second_box_last_box}>
                     <MainButton width={'200px'} height={'52px'} fontSize={'20px'} text={'Add to card'} />
                     <p>${price}</p>
                  </div>
               </div>
            </div>
         </section>
         <section>
            <Bestsellers margin='55px auto 200px' />
         </section>

         {/*<div style={{ width: '100px', height: '100px', position: 'relative' }}>*/}
         {/*   <Image src={`${FRONTEND_URL}/book.svg`} alt='aaa' layout='fill' objectFit='contain' />*/}
         {/*</div>*/}
      </>
   )
}

export default ItemPage
