import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { LANGUAGES, ROUTES } from '@/enums/common'
import { RightArrow } from '@/components/atoms/icons/RightArrow'
import '../styles/CategoryBreadcrumbs.scss'
import { RootState } from '@/store/store'

interface ICategoryBreadcrumbs {
   isArmenian: boolean
}

export const CategoryBreadcrumbs: FC<ICategoryBreadcrumbs> = ({ isArmenian }) => {
   const intl = useIntl()
   const categoryProducts = useSelector((state: RootState) => state.products.categoryProducts)
   const breadcrumbsData = categoryProducts?.resData?.breadcrumbs

   const basePath = isArmenian
      ? `/${LANGUAGES.ARMENIAN}/${ROUTES.PRODUCT}/${ROUTES.LIST_DATA}`
      : `/${LANGUAGES.ENGLISH}/${ROUTES.PRODUCT}/${ROUTES.LIST_DATA}`

   return (
      <div className={'breadcrumbContainer'}>
         <Link href={ROUTES.ALL}>{intl.formatMessage({ id: 'all', defaultMessage: 'All' })}</Link>
         <RightArrow />
         {breadcrumbsData?.length &&
            breadcrumbsData?.map((item, index) => (
               <span key={item.id}>
                  {index > 0 && <RightArrow />}
                  <Link
                     href={`${basePath}/${breadcrumbsData
                        .slice(0, index + 1)
                        .map((b) => b.id)
                        .join('/')}`}
                     className={index === breadcrumbsData?.length - 1 ? 'lastItem' : ''}
                  >
                     {isArmenian ? item.titleAm : item.titleEn}
                  </Link>
               </span>
            ))}
      </div>
   )
}
