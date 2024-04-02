import React, { FC, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { RootState } from '@/store/store';
import 'swiper/css';
import classes from './ItemPage.module.scss';

const ItemPage: FC<{ productViewData: ProductView }> = ({ productViewData }) => {
   const { product, bestsellers, breadcrumbs } = productViewData;
   const [price, setPrice] = useState<number>(product.price);
   const [selectedImage, setSelectedImage] = useState<string | undefined>(
      product?.images && product.images[0],
   );
   const [choseIds, setChoseIds] = useState<number[]>([productViewData.product.id]);
   const selectedProducts = useSelector((state: RootState) => state.cart.selectedProducts);
   const dispatch = useDispatch();

   useEffect(() => {
      if (product?.images) {
         setSelectedImage(product.images[0]);
      }
   }, [product.images]);

   const changePrice: (e: CheckboxChangeEvent, subProductPrice: number, id: number) => void = (
      e: CheckboxChangeEvent,
      subProductPrice: number,
      id: number,
   ): void => {
      setPrice((prevState: number) =>
         e.target.checked ? prevState + subProductPrice : prevState - subProductPrice,
      );
      e.target.checked
         ? setChoseIds([...choseIds, id])
         : setChoseIds(choseIds.filter((item) => item !== id));
   };
   console.log(choseIds);
   const addProduct = () => {
      dispatch(addToCart(choseIds));
   };

   // @ts-ignore
   return (
      <>
         <section className={classes.hk_item_page_main_section}>
            <div className={classes.hk_item_page_breadcrumbs}>
               <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
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
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                     >
                        {product?.images?.map((image: string, index: number) => (
                           <div key={Math.random()}>
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
                     <h2>
                        <DynamicMessage data={product} prop={'title'} />
                     </h2>
                     <p
                        className={
                           classes.hk_item_page_main_section_main_box_second_box_first_elem_description
                        }
                     >
                        <DynamicMessage data={product} prop={'shortDescription'} />
                     </p>
                     <h3>Details</h3>
                     {product?.productProperties?.map(
                        (property: ProductProperty, index: number) => (
                           <p key={property.id}>
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
                              disabled={selectedProducts
                                 .map((item) => item.id)
                                 .includes(product.id)}
                              onChange={(e: CheckboxChangeEvent) =>
                                 changePrice(e, product.price, product.id)
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
                           <p className={classes.hk_item_subtitles_name}>
                              <DynamicMessage data={product} prop={'title'} />
                           </p>
                           <p className={classes.hk_item_subtitles_price}>${product.price}</p>
                           {selectedProducts.map((item) => item.id).includes(product.id) && (
                              <span style={{ color: 'green', fontWeight: 'bolder' }}>Added ✅</span>
                           )}
                        </div>
                     </div>
                  ))}
                  <div className={classes.hk_item_page_main_section_main_box_second_box_last_box}>
                     <MainButton
                        width={'200px'}
                        height={'52px'}
                        fontSize={'20px'}
                        text={
                           selectedProducts
                              .map((item) => item.id)
                              .includes(productViewData.product.id)
                              ? 'Added'
                              : 'Add to card'
                        }
                        onClick={addProduct}
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
