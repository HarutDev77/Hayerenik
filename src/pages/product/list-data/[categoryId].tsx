import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import QueryApi from '@/api/query.api'
import { Products, ProductsList as ProductsListType } from '@/types/main'
import MainLayout from '@/layouts'
import { FilterLayout, ProductsList } from '@/components/pages/Product'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import { AxiosResponse } from 'axios'
import './CategoryProducts.scss'


const CategoryProducts: FC = () => {
  const router = useRouter()
  const [filteredData, setFilteredData] = useState<Products>()
  const [productsRes, setProductsRes] = useState<ProductsListType | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { categoryId } = router.query
        if (categoryId) {
          const categoryIdNum = +categoryId!
          setIsLoading(true)
          const productsRes: AxiosResponse<ProductsListType, any> =
            await QueryApi.getProductListData(categoryIdNum, currentPage, PRODUCT_LIST_ITEMS_LIMIT)
          setFilteredData(productsRes?.data?.resData?.products)
          setProductsRes(productsRes.data)
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryData()
  }, [currentPage, router.query])

  const handleFilterChange = async (filteredData: Products) => {
    setFilteredData(filteredData)
    setCurrentPage(1)
  }

  return (
    <MainLayout>
      <div className='categoryProductsContainer'>
        <FilterLayout
          data={productsRes}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
        />
        <ProductsList
          data={filteredData}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}

export default CategoryProducts
