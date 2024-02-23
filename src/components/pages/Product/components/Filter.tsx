import React, { useEffect, useState } from 'react'
import { Checkbox, Collapse, Input } from 'antd'
import { AxiosResponse } from 'axios'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import router from 'next/router'
import {
   FilterData,
   FilteredData,
   Products,
   ProductsList,
   PropertyData,
   PropertyFilter,
} from '@/types/main'
import QueryApi from '@/api/query.api'
import { useDebounce } from '@/hooks'
import { AGE_OPTIONS, INPUT_DEBOUNCE_DELAY, PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import '../styles/Filter.scss'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

export interface FilterProps {
   data: ProductsList | null
   onFilterChange: (filteredData: Products) => void
   currentPage: number
}

export const Filter: React.FC<FilterProps> = ({ data, onFilterChange, currentPage }) => {
   const [formFilters, setFormFilters] = useState<any>({})
   const [fromPrice, setFromPrice] = useState<number | undefined>()
   const [toPrice, setToPrice] = useState<number | undefined>()
   const debouncedFromPrice = useDebounce(fromPrice, INPUT_DEBOUNCE_DELAY)
   const debouncedToPrice = useDebounce(toPrice, INPUT_DEBOUNCE_DELAY)

   const handlePriceChange = (key: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)
      if (key === 'from') {
         setFromPrice(value)
      } else {
         setToPrice(value)
      }
   }

   const handleCheckboxChange = (filterItem: string) => (e: CheckboxChangeEvent) => {
      const updatedFilters: any = { ...formFilters }
      updatedFilters[filterItem] = e.target.checked
      setFormFilters(updatedFilters)
   }
   const getSelectedAges = (): number[] => {
      return AGE_OPTIONS.filter(age => formFilters[`Age-${age}`]);
   };
   const getSelectedSubcategories = (): number[] => {
      return data?.resData?.subCategories
         ?.filter(subcategory => formFilters[subcategory.titleEn])
         .map(subcategory => subcategory.id) || [];
   };

   const getSelectedPropertyFilters = (): PropertyFilter[] => {
      const propertyFilters: PropertyFilter[] = []

      data?.resData?.properties.forEach((property: PropertyData) => {
         if (formFilters[property.nameEn]) {
            const selectedOptions: (number | string)[] = formFilters[property.nameEn]

            const selectedProperty: PropertyFilter = {
               propertyId: property.id,
               values: selectedOptions,
            }

            propertyFilters.push(selectedProperty)
         }
      })

      return propertyFilters
   }

   const fetchFilteredData = async () => {
      const { categoryId } = router.query

      try {
         const filterData: FilterData = {
            categoryId: +categoryId!,
            limit: PRODUCT_LIST_ITEMS_LIMIT,
            page: currentPage,
            priceRange: { from: debouncedFromPrice, to: debouncedToPrice },
            age: getSelectedAges(),
            subCategories: getSelectedSubcategories(),
            propertyFilters: getSelectedPropertyFilters(),
         }

         const filterRes: AxiosResponse<FilteredData, any> =
            await QueryApi.filteredProductList(filterData)

         onFilterChange(filterRes.data.resData)
      } catch (error) {
         console.error('Error filtering data:', error)
      }
   }

   useEffect(() => {
      const isFilterSet =
         debouncedFromPrice !== undefined ||
         debouncedToPrice !== undefined ||
         Object.values(formFilters).some((filter) => filter !== undefined && filter !== false)
      isFilterSet && fetchFilteredData()
   }, [currentPage, data, debouncedFromPrice, debouncedToPrice, formFilters])

   const CustomExpandIcon: React.FC<{ isActive: boolean | undefined }> = ({ isActive }) => (
      <span className={isActive ? 'minusIcon' : 'plusIcon'}>
         {isActive ? <MinusOutlined /> : <PlusOutlined />}
      </span>
   )
   return (
      <div className='filterContainer'>
         <div className='filtersHeader'>Filters</div>
         <Collapse
            expandIconPosition='end'
            expandIcon={({ isActive }) => <CustomExpandIcon isActive={isActive} />}
            ghost
         >
            <Collapse.Panel header='PRICE' key='price'>
               <div className='priceRangeOption'>
                  <Input
                     type='number'
                     placeholder='From'
                     onChange={handlePriceChange('from')}
                     className='priceInput'
                  />
                  <Input
                     type='number'
                     placeholder='To'
                     onChange={handlePriceChange('to')}
                     className='priceInput'
                  />
               </div>
            </Collapse.Panel>
            <Collapse.Panel header='AGE' key='age'>
               {AGE_OPTIONS.map((age) => (
                  <Checkbox key={age} onChange={handleCheckboxChange(`Age-${age}`)}>
                     {age}
                  </Checkbox>
               ))}
            </Collapse.Panel>
            {data?.resData?.subCategories && data?.resData?.subCategories?.length > 0 && (
               <Collapse.Panel header='SUBCATEGORIES' key='subcategories'>
                  {data.resData.subCategories.map((subcategory) => (
                     <Checkbox
                        key={subcategory.id}
                        onChange={handleCheckboxChange(subcategory.titleEn)}
                     >
                        {subcategory.titleEn}
                     </Checkbox>
                  ))}
               </Collapse.Panel>
            )}
            {data?.resData?.properties.map((property) => (
               <Collapse.Panel header={property.nameEn.toUpperCase()} key={property.id}>
                  <Checkbox onChange={handleCheckboxChange(property.nameEn)}>
                     {property.nameEn}
                  </Checkbox>
               </Collapse.Panel>
            ))}
         </Collapse>
      </div>
   )
}
