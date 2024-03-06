import React, { FC, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'rc-checkbox';
import { Swiper, SwiperSlide } from 'swiper/react';

import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { BACKEND_IMAGES_URL } from '@/constants/config';
import { ProductView } from '@/types/product-view';
import { SubProduct } from '@/types/sub-product';
import { ProductProperty } from '@/types/product-property';
import MainButton from '@/components/Parts/MainButton';
import Bestsellers from '@/components/pages/Home/Bestsellers';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import NoImageAvailable from '@/assets/images/no_product_image.png';
import Image from 'next/image';
import 'swiper/css';
import classes from './ItemPage.module.scss';

const ItemPage: FC<{ productViewData: ProductView }> = ({ productViewData }) => {
   const { product, bestsellers, breadcrumbs } = productViewData;
   const [price, setPrice] = useState<number>(product.price);
   const [selectedImage, setSelectedImage] = useState<string | undefined>(
      product?.images && product.images[0],
   );

   const changePrice: (e: CheckboxChangeEvent, subProductPrice: number) => void = (
      e: CheckboxChangeEvent,
      subProductPrice: number,
   ): void => {
      setPrice((prevState: number) =>
         e.target.checked ? prevState + subProductPrice : prevState - subProductPrice,
      );
   };

   // @ts-ignore
   return (
      <>
         <section className={classes.hk_item_page_main_section}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className={classes.hk_item_page_main_section_main_box}>
               <div className={classes.hk_item_page_main_section_main_box_first_box}>
                  <div>
                     {selectedImage ? (
                        <img
                           src={`${BACKEND_IMAGES_URL}/${selectedImage}`}
                           alt={'Selected image'}
                        />
                     ) : (
                        <Image src={NoImageAvailable} alt={'no image available'} priority={true} />
                     )}
                  </div>
                  <div className={'swiper_container'}>
                     <Swiper
                        autoHeight={false}
                        spaceBetween={20}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                     >
                        {product?.images?.map((image: string, index: number) => (
                           <div key={`${index}_${image}`}>
                              <SwiperSlide
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => setSelectedImage(image)}
                              >
                                 {image ? (
                                    <img
                                       src={`${BACKEND_IMAGES_URL}/${image}`}
                                       alt={`product image`}
                                    />
                                 ) : (
                                    <Image
                                       src={NoImageAvailable}
                                       alt={'no image available'}
                                       priority={true}
                                    />
                                 )}
                              </SwiperSlide>
                           </div>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className={classes.hk_item_page_main_section_main_box_second_box}>
                  <div className={classes.hk_item_page_main_section_main_box_second_box_first_elem}>
                     <h2>Dynamic</h2>
                     <p
                        className={
                           classes.hk_item_page_main_section_main_box_second_box_first_elem_description
                        }
                     >
                        <DynamicMessage data={product} prop={'description'} />
                     </p>
                     <h3>Details</h3>
                     {product?.productProperties?.map(
                        (property: ProductProperty, index: number) => (
                           <p key={`${index}_${property.id}_${property.valEn}`}>
                              <span>
                                 <DynamicMessage data={property} prop={'propertyName'} />:
                              </span>
                              <DynamicMessage data={property} prop={'val'} />
                           </p>
                        ),
                     )}
                  </div>
                  {product?.subProducts?.map((product: SubProduct) => (
                     <div key={`${product.id}_${product.titleEn}`}>
                        <div
                           className={
                              classes.hk_item_page_main_section_main_box_second_box_product_container
                           }
                        >
                           <Checkbox
                              // @ts-ignore
                              onChange={(e: CheckboxChangeEvent) =>
                                 changePrice ? changePrice(e, product.price) : null
                              }
                           />
                           <div>
                              {product.image ? (
                                 <img
                                    src={`${BACKEND_IMAGES_URL}/${product.image}`}
                                    alt={`${product.image}`}
                                 />
                              ) : (
                                 <Image
                                    src={NoImageAvailable}
                                    alt={'no image available'}
                                    priority={true}
                                 />
                              )}
                           </div>
                           <p>
                              <DynamicMessage data={product} prop={'title'} />
                           </p>
                           <p>${product.price}</p>
                        </div>
                     </div>
                  ))}
                  <div className={classes.hk_item_page_main_section_main_box_second_box_last_box}>
                     <MainButton
                        width={'200px'}
                        height={'52px'}
                        fontSize={'20px'}
                        text={'Add to card'}
                     />
                     <p>${price}</p>
                  </div>
               </div>
            </div>
         </section>
         <section>
            <Bestsellers bestsellers={bestsellers} margin='55px auto 200px' />
         </section>
      </>
   );
};

export default ItemPage;
