import React, { FC } from 'react'
import { Row, Col, Pagination, Spin } from 'antd'
import Link from 'next/link'
import ProductItem from '@/components/Parts/ProductItem'
import { Products } from '@/types/main'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'

interface ProductsListProps {
  data: Products | undefined
  currentPage: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

export const ProductsList: FC<ProductsListProps> = ({ data, currentPage, isLoading, onPageChange }) => {
  console.log('🚀 ~ data:', data)
  if (!data || isLoading) {
    return <Spin />
  }
    const products = data?.rows
    console.log('🚀 ~ products:', products)
    const totalPages = Math.ceil(data?.count / PRODUCT_LIST_ITEMS_LIMIT)
    console.log('🚀 ~ totalPages:', totalPages)

  return (
    <>
      <Row gutter={[16, 16]}>
        {products.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link href={`/product/${item.id}`} passHref>
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
      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination current={currentPage} total={totalPages} onChange={onPageChange} />
        </div>
      )}
    </>
  )
}
