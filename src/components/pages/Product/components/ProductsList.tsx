import React, { FC } from 'react'
import { Row, Col, Pagination, Spin, Empty } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProductItem from '@/components/Parts/ProductItem'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import { Products } from '@/types/main'
import { LANGUAGES, ROUTES } from '@/enums/common'
import '../styles/ProductsList.scss'

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
   const router = useRouter()
   const isLanguageAm = router.locale === LANGUAGES.ARMENIAN
   const products = data?.rows
   if (products && !(products.length > 0)) {
      return <Empty />
   }
   if (isLoading) {
      return <Spin />
   }

   return (
      <div className='productListContainer'>
         <Row gutter={[16, 16]} align='middle' justify='center'>
            {products?.map((item) => (
               <Col flex='none' key={item.id} xs={24} sm={12}>
                  <Link href={`${ROUTES.PRODUCT}/${item.id}`} passHref>
                     <ProductItem
                        id={item.id}
                        imageUrl={item.imageUrl || ''}
                        title={isLanguageAm && item.titleAm ? item.titleAm : item.titleEn || ''}
                        description={
                           isLanguageAm && item.descriptionAm
                              ? item.descriptionAm
                              : item.descriptionEn || ''
                        }
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
               defaultPageSize={PRODUCT_LIST_ITEMS_LIMIT}
               onChange={(page: number) => onPageChange(page)}
               hideOnSinglePage
               responsive
            />
         </div>
      </div>
   )
}
