import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { Spin } from 'antd'
import QueryApi from '@/api/query.api'
import MainLayout from '@/layouts'
import { CategoryHeader, FilterLayout, ProductsList } from '@/components/pages/Product'
import { PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import { FilterData, Products, ProductsList as ProductsListType } from '@/types/main'
import { RootState } from '@/store/store'
import { setCategoryProducts, setProducts } from '@/slices/productsSlice'
import { LANGUAGES } from '@/enums/common'
import './CategoryProducts.scss'

const CategoryProducts: FC = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const filterData = useSelector((state: RootState) => state.filter.filterData)
   const [categoryProductsRes, setCategoryProductsRes] = useState<any>()
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const [anyFilterSet, setAnyFilterSet] = useState<boolean>(false)
   const isLanguageAm = router.locale === LANGUAGES.ARMENIAN

   useEffect(() => {
      if (!anyFilterSet) fetchCategoryData()
   }, [currentPage, router.query])

   useEffect(() => {
      if (anyFilterSet) {
         fetchFilteredDataWithFilters(filterData)
      } else if (categoryProductsRes) {
         dispatch(setProducts(categoryProductsRes.resData))
      } else {
         fetchCategoryData()
      }
   }, [currentPage, router.query, filterData, anyFilterSet])

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
            // noinspection TypeScriptValidateTypes
            dispatch(setCategoryProducts(productsRes.data))
            // noinspection TypeScriptValidateTypes
            dispatch(setProducts(productsRes.data.resData.products))
            setCategoryProductsRes(productsRes?.data)
         }
      } catch (error) {
         setCategoryProductsRes({} as ProductsListType)
      } finally {
         setIsLoading(false)
      }
   }

   const fetchFilteredDataWithFilters = async (filterData: FilterData) => {
      try {
         const filterRes = await QueryApi.filteredProductList(filterData)
         dispatch(setProducts(filterRes.data.resData))
      } catch (error) {
         dispatch(setProducts({} as Products))
      }
   }

   return (
      <MainLayout>
         {isLoading ? (
            <div className='spinnerContainer'>
               <Spin />
            </div>
         ) : (
            <>
               <CategoryHeader isLanguageAm={false} />
               <div className='categoryProductsContainer'>
                  <FilterLayout
                     categoryProducts={categoryProductsRes}
                     currentPage={currentPage}
                     setAnyFilterSet={setAnyFilterSet}
                  />
                  <ProductsList
                     currentPage={currentPage}
                     isLanguageAm={isLanguageAm}
                     isLoading={isLoading}
                     onPageChange={setCurrentPage}
                     setAnyFilterSet={setAnyFilterSet}
                  />
               </div>
            </>
         )}
      </MainLayout>
   )
}

export default CategoryProducts
