import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { CategoryBreadcrumbs } from '@/components/pages/Product/components/CategoryBreadcrumbs'
import SelectedOptions from './SelectedOptions'
import '../styles/CategoryHeader.scss'

interface ICategoryHeader {
   isLanguageAm: boolean
}

export const CategoryHeader: FC<ICategoryHeader> = ({ isLanguageAm }) => {
   const categoryProducts = useSelector((state: RootState) => state.products.categoryProducts)
   const breadcrumbsData = categoryProducts?.resData?.breadcrumbs
   const headerTitle =
      breadcrumbsData?.length && isLanguageAm
         ? breadcrumbsData?.[breadcrumbsData?.length - 1]?.titleAm
         : breadcrumbsData?.[breadcrumbsData?.length - 1]?.titleEn

   return (
      <div className='categoryHeaderContainer'>
         <p>{headerTitle}</p>
         <CategoryBreadcrumbs isArmenian={isLanguageAm} />
         <SelectedOptions isArmenian={isLanguageAm} />
      </div>
   )
}
