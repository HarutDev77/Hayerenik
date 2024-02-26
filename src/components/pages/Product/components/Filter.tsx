import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Collapse, InputNumber } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FormattedMessage, useIntl } from 'react-intl'
import {
   Category,
   FilterState,
   Products,
   ProductsList,
   PropertyData,
   PropertyOption,
} from '@/types/main'
import { useRouter } from 'next/router'
import { AGE_OPTIONS, PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { setFilterData } from '@/slices/filterSlice'
import '../styles/Filter.scss'
import { LANGUAGES } from '@/enums/common'

export interface FilterProps {
   data: ProductsList | null
   setAnyFilterSet: (anyFilterSet: boolean) => void
   onFilterChange: (filteredData: Products) => void
   currentPage: number
}

export const Filter: React.FC<FilterProps> = ({
   data,
   onFilterChange,
   setAnyFilterSet,
   currentPage,
}) => {
   const router = useRouter()
   const dispatch = useDispatch()
   const [fromPrice, setFromPrice] = useState<number | null>(null)
   const [toPrice, setToPrice] = useState<number | null>(null)
   const isLanguageAm = router.locale === LANGUAGES.ARMENIAN
   const intl = useIntl()
   const [formFilters, setFormFilters] = useState<FilterState>({
      fromPrice: null,
      toPrice: null,
      subcategories: [],
      age: [],
      propertyFilters: [],
   })

   useEffect(() => {
      fetchFilteredData()
   }, [currentPage, data, fromPrice, toPrice, formFilters])

   const fetchFilteredData = async () => {
      const { categoryId } = router.query
      if (categoryId) {
         const anyFilterSet =
            fromPrice !== null ||
            toPrice !== null ||
            formFilters.age.length > 0 ||
            formFilters.subcategories.length > 0 ||
            formFilters.propertyFilters.length > 0
         if (anyFilterSet) {
            try {
               const filterData = {
                  categoryId: +categoryId,
                  limit: PRODUCT_LIST_ITEMS_LIMIT,
                  page: currentPage,
                  priceRange:
                     fromPrice !== null && toPrice !== null && (fromPrice !== 0 || toPrice !== 0)
                        ? {
                             from: fromPrice !== null ? fromPrice : undefined,
                             to: toPrice !== null ? toPrice : undefined,
                          }
                        : undefined,
                  age: formFilters.age,
                  subCategories: formFilters.subcategories,
                  propertyFilters: formFilters.propertyFilters,
               }
               setAnyFilterSet(anyFilterSet)
               dispatch(setFilterData(filterData))
            } catch (error) {
               onFilterChange({} as Products)
            }
         } else {
            data?.resData?.products && onFilterChange(data.resData.products)
         }
      }
   }

   const handlePriceBlur = (key: 'from' | 'to') => (event: React.FocusEvent<HTMLInputElement>) => {
      const numericValue = +event.target.value
      if (!isNaN(numericValue)) {
         if (key === 'from') {
            setFromPrice(numericValue)
         } else {
            setToPrice(numericValue)
         }
      }
   }

   const handleCheckboxChange = (filterItem: 'subcategories' | 'age') => (value: number) => {
      setFormFilters((prevFilters) => {
         const updatedFilters = { ...prevFilters }

         if (updatedFilters[filterItem].includes(value)) {
            updatedFilters[filterItem] = updatedFilters[filterItem].filter(
               (item: number) => item !== value,
            )
         } else {
            updatedFilters[filterItem] = [...updatedFilters[filterItem], value]
         }

         return updatedFilters
      })
   }

   const handlePropertyValueChange =
      (propertyId: number, value: string | number) => (e: CheckboxChangeEvent) => {
         setFormFilters((prevFilters: any) => {
            const updatedFilters = { ...prevFilters }

            const filterIndex = updatedFilters?.propertyFilters?.findIndex(
               (filter: any) => filter.propertyId === propertyId,
            )

            if (filterIndex !== undefined && filterIndex !== -1) {
               const values = updatedFilters?.propertyFilters?.[filterIndex]?.values || []
               const updatedValues = e.target.checked
                  ? [...values, value]
                  : values.filter((val: any) => val !== value)

               const updatedValuesArray = Array.from(new Set(updatedValues))
               if (updatedValuesArray.length === 0) {
                  updatedFilters.propertyFilters = [
                     ...updatedFilters.propertyFilters.slice(0, filterIndex),
                     ...updatedFilters.propertyFilters.slice(filterIndex + 1),
                  ]
               } else {
                  updatedFilters.propertyFilters = [
                     ...updatedFilters.propertyFilters.slice(0, filterIndex),
                     { ...updatedFilters.propertyFilters[filterIndex], values: updatedValuesArray },
                     ...updatedFilters.propertyFilters.slice(filterIndex + 1),
                  ]
               }
            } else {
               updatedFilters.propertyFilters = [
                  ...updatedFilters.propertyFilters,
                  { propertyId, values: [value] },
               ]
            }

            return updatedFilters
         })
      }

   const CustomExpandIcon: React.FC<{ isActive: boolean | undefined }> = ({ isActive }) => (
      <span className={isActive ? 'minusIcon' : 'plusIcon'}>
         {isActive ? <MinusOutlined /> : <PlusOutlined />}
      </span>
   )

   return (
      <div className='filterContainer'>
         <div className='filtersHeader'>
            <FormattedMessage id='filters' />
         </div>
         <Collapse
            expandIconPosition='end'
            expandIcon={({ isActive }) => <CustomExpandIcon isActive={isActive} />}
            ghost
         >
            <Collapse.Panel header={<FormattedMessage id='price' />} key='price'>
               <div className='priceRangeOption'>
                  <InputNumber
                     type='number'
                     min={0}
                     placeholder={intl.formatMessage({ id: 'from', defaultMessage: 'from' })}
                     onBlur={handlePriceBlur('from')}
                  />
                  <InputNumber
                     type='number'
                     min={1}
                     placeholder={intl.formatMessage({ id: 'to', defaultMessage: 'to' })}
                     onBlur={handlePriceBlur('to')}
                  />
               </div>
            </Collapse.Panel>
            <Collapse.Panel header={<FormattedMessage id='age' />} key='age'>
               {AGE_OPTIONS.map((ageOption: number) => (
                  <Checkbox key={ageOption} onChange={() => handleCheckboxChange('age')(ageOption)}>
                     {ageOption}
                  </Checkbox>
               ))}
            </Collapse.Panel>
            {data?.resData?.subCategories && data?.resData?.subCategories?.length > 0 && (
               <Collapse.Panel header={<FormattedMessage id='productType' />} key='subcategories'>
                  {data.resData.subCategories.map((subcategory: Category) => (
                     <Checkbox
                        key={subcategory.id}
                        onChange={() => handleCheckboxChange('subcategories')(subcategory.id)}
                     >
                        {isLanguageAm && subcategory.titleAm
                           ? subcategory.titleAm
                           : subcategory.titleEn}
                     </Checkbox>
                  ))}
               </Collapse.Panel>
            )}
            {data?.resData?.properties?.map((property: PropertyData) => (
               <Collapse.Panel
                  header={
                     isLanguageAm && property.nameAm
                        ? property?.nameAm.toUpperCase()
                        : property?.nameEn.toUpperCase()
                  }
                  key={property.id}
               >
                  {property?.propertyOptions?.map((option: PropertyOption) => (
                     <Checkbox
                        key={isLanguageAm && option.valueAm ? option.valueAm : option?.valueEn}
                        onChange={handlePropertyValueChange(
                           property.id,
                           isLanguageAm && option.valueAm ? option.valueAm : option.valueEn,
                        )}
                     >
                        {isLanguageAm && option.valueAm ? option.valueAm : option.valueEn}
                     </Checkbox>
                  ))}
               </Collapse.Panel>
            ))}
         </Collapse>
      </div>
   )
}
