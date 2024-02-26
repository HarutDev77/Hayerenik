import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { Spin } from 'antd'
import QueryApi from '@/api/query.api'
import MainLayout from '@/layouts'
import { FilterLayout, ProductsList } from '@/components/pages/Product'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import { LANGUAGES } from '@/enums/common'
import { FilterData, Products, ProductsList as ProductsListType } from '@/types/main'
import { RootState } from '@/store/store'
import './CategoryProducts.scss'

const CategoryProducts: FC = () => {
   const router = useRouter()
   const [filteredData, setFilteredData] = useState<Products>()
   const [productsRes, setProductsRes] = useState<ProductsListType | null>(null)
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const [anyFilterSet, setAnyFilterSet] = useState<boolean>(false)
   const filterData = useSelector((state: RootState) => state.filter.filterData)
   const isLanguageAm = router.locale === LANGUAGES.ARMENIAN

   useEffect(() => {
      console.log("🚀 ~ useEffect ~ anyFilterSet:", anyFilterSet)
      anyFilterSet ? fetchFilteredDataWithFilters(filterData) : fetchCategoryData()
   }, [currentPage, router.query, anyFilterSet, filterData])

   const fetchCategoryData = async () => {
      try {
         const { categoryId } = router.query
         if (categoryId) {
            const categoryIdNum = +categoryId!
            setIsLoading(true)
            const productsRes: AxiosResponse<ProductsListType, any> =
               await QueryApi.getProductListData(
                  categoryIdNum,
                  currentPage,
                  PRODUCT_LIST_ITEMS_LIMIT,
               )
            setFilteredData(productsRes?.data?.resData?.products)
            setProductsRes(productsRes.data)
         }
      } catch (error) {
         setFilteredData({} as Products)
      } finally {
         setIsLoading(false)
      }
   }

   const fetchFilteredDataWithFilters = async (filterData: FilterData) => {
      try {
         console.log('   const fetchFilteredDataWithFilte) filterData', filterData)
         const filterRes = await QueryApi.filteredProductList(filterData)
         console.log('filterResfilterResfilterResfilterRes', filterRes)
         setFilteredData(filterRes.data.resData)
      } catch (error) {
         handleFilterChange({} as Products)
      }
   }

   const handleFilterChange = async (filteredData: Products) => {
      setFilteredData(filteredData)
   }

   return (
      <MainLayout>
         <>
            <p className='categoryHeader'>
               {isLanguageAm
                  ? productsRes?.resData?.breadcrumbs?.[0].titleAm
                  : productsRes?.resData?.breadcrumbs?.[0].titleEn
               }
            </p>
            <div className='categoryProductsContainer'>
               {isLoading ? (
                  <Spin />
               ) : (
                  <>
                     <FilterLayout
                        data={productsRes}
                        currentPage={currentPage}
                        setAnyFilterSet={setAnyFilterSet}
                        onFilterChange={handleFilterChange}
                     />
                     <ProductsList
                        data={filteredData}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        isLoading={isLoading}
                     />
                  </>
               )}
            </div>
         </>
      </MainLayout>
   )
}

export default CategoryProducts
