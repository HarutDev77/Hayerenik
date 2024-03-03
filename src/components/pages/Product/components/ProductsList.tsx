import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import { Row, Col, Pagination, Spin, Empty } from 'antd'
import ProductItem from '@/components/Parts/ProductItem'
import { ROUTES } from '@/enums/common'
import { RootState } from '@/store/store'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import '../styles/ProductsList.scss'

interface IProductsListProps {
   currentPage: number
   isLanguageAm: boolean
   isLoading: boolean
   onPageChange: (page: number) => void
}

export const ProductsList: FC<IProductsListProps> = ({
   currentPage,
   isLanguageAm,
   isLoading,
   onPageChange,
}) => {
   const categoryProducts = useSelector((state: RootState) => state.products.products)

   return (
      <div className='productListContainer'>
         {isLoading ? (
            <Spin />
         ) : categoryProducts?.rows?.length > 0 ? (
            <>
               <Row gutter={[16, 16]} align='middle' justify='center'>
                  {categoryProducts?.rows?.map((item) => (
                     <Col key={item.id} xs={12} sm={12} md={8} lg={6} xl={6}>
                        <Link href={`${ROUTES.PRODUCT}/${item.id}`} passHref>
                           <ProductItem
                              id={item.id}
                              imageUrl={'http://localhost:3000/assets/images/stationary.jpg'}
                              title={
                                 isLanguageAm && item.titleAm ? item.titleAm : item.titleEn || ''
                              }
                              description={
                                 isLanguageAm && item.descriptionAm
                                    ? item.descriptionAm
                                    : item.descriptionEn || ''
                              }
                              price={item.price}
                              className={'ProductItem'}
                           />
                        </Link>
                     </Col>
                  ))}
               </Row>
               <div className='paginationContainer'>
                  <Pagination
                     current={currentPage}
                     total={categoryProducts?.count}
                     defaultPageSize={PRODUCT_LIST_ITEMS_LIMIT}
                     onChange={(page: number) => onPageChange(page)}
                     hideOnSinglePage
                     responsive
                  />
               </div>
            </>
         ) : (
            <Empty
               description={
                  <div className='emptyContainer'>
                     <h1>
                        <FormattedMessage id='noResultsTitle' />
                     </h1>
                     <p>
                        <FormattedMessage id='noResultsDesc' />
                     </p>
                  </div>
               }
            />
         )}
      </div>
   )
}
