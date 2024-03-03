import React, { FC } from 'react'
import { Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterData } from '@/slices/filterSlice'
import { RootState } from '@/store/store'
import { CloseCircleOutlined } from '@ant-design/icons'
import '../styles/SelectedOptions.scss'

interface ISelectedOptions {
   isArmenian: boolean
}

export const SelectedOptions: FC<ISelectedOptions> = ({ isArmenian }) => {
   const dispatch = useDispatch()
   const filterData = useSelector((state: RootState) => state.filter.filterData)
   const { resData } = useSelector((state: RootState) => state.products.categoryProducts)

   const removeSubcategory = (subId: number) => {
      const updatedSubcategories = filterData?.subCategories?.filter((id) => id !== subId)
      dispatch(setFilterData({ ...filterData, subCategories: updatedSubcategories }))
   }

   const removeAge = (age: number) => {
      const updatedAges = filterData?.age?.filter((a) => a !== age)
      dispatch(setFilterData({ ...filterData, age: updatedAges }))
   }

   const removePropertyFilter = (propertyId: number, optionValueEn: string | number) => {
      const updatedPropertyFilters = filterData?.propertyFilters?.filter(
         (pf) => !(pf.propertyId === propertyId && pf.values.includes(optionValueEn)),
      )
      dispatch(setFilterData({ ...filterData, propertyFilters: updatedPropertyFilters }))
   }

   const subcategoryTags =
      filterData?.subCategories?.map((subcategoryId) => {
         const subcategory = resData?.subCategories?.find((sc) => sc.id === subcategoryId)
         return (
            subcategory && (
               <Tag
                  closable
                  onClose={() => removeSubcategory(subcategoryId)}
                  key={subcategory.id}
                  closeIcon={<CloseCircleOutlined />}
               >
                  {isArmenian ? subcategory.titleAm : subcategory.titleEn}
               </Tag>
            )
         )
      }) || []

   const ageTags =
      filterData?.age?.map((age) => (
         <Tag
            closable
            onClose={() => removeAge(age)}
            key={`age-${age}`}
            closeIcon={<CloseCircleOutlined />}
         >
            Age - {age}
         </Tag>
      )) || []

   const propertyFilterTags =
      filterData?.propertyFilters?.flatMap((pf) => {
         const property = resData.properties.find((p) => p.id === pf.propertyId)
         return (
            property &&
            pf.values.map((value) => (
               <Tag
                  closable
                  onClose={() => removePropertyFilter(pf.propertyId, value)}
                  key={`${pf.propertyId}-${value}`}
                  closeIcon={<CloseCircleOutlined />}
               >
                  {isArmenian ? property.nameAm : property.nameEn} - {value}
               </Tag>
            ))
         )
      }) || []

   return <div>{subcategoryTags.concat(ageTags, propertyFilterTags)}</div>
}

export default SelectedOptions
