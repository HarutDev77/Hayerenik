import React, { FC } from 'react'
import { Row, Col, Pagination, Spin } from 'antd'
import Link from 'next/link'
import ProductItem from '@/components/Parts/ProductItem'
import { Products } from '@/types/main'
import '../styles/ProductsList.scss'
import { ROUTES } from '@/enums/common'

interface ProductsListProps {
   data: Products | undefined
   currentPage: number
   isLoading: boolean
   onPageChange: (page: number) => void
}

export const ProductsList: FC<ProductsListProps> = ({
   data,
   currentPage,
   isLoading,
   onPageChange,
}) => {
   if (!data) {
      return <></>
   }
   if (isLoading) {
      return <Spin />
   }
   const products = data?.rows

   return (
      <div className='productListContainer'>
         <Row gutter={[16, 16]} align='middle' justify='center'>
            {products.map((item) => (
               <Col flex='none' key={item.id} xs={24} sm={12}>
                  <Link href={`${ROUTES.PRODUCT}/${item.id}`} passHref>
                     <ProductItem
                        id={item.id}
                        imageUrl={item.imageUrl || ''}
                        title={item.titleEn || ''}
                        description={item.descriptionEn || ''}
                        price={item.price}
                     />
                  </Link>
               </Col>
            ))}
         </Row>
         <div className='paginationContainer'>
            <Pagination
               current={currentPage}
               total={data?.count}
               onChange={(page: number) => onPageChange(page)}
               hideOnSinglePage
               responsive
            />
         </div>
      </div>
   )
}
