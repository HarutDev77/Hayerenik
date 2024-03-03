import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Collapse, InputNumber } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FormattedMessage, useIntl } from 'react-intl'
import {
   Category,
   FilterData,
   Products,
   ProductsList,
   PropertyData,
   PropertyOption,
} from '@/types/main'
import { useRouter } from 'next/router'
import isEqual from 'lodash/isEqual'
import { setFilterData } from '@/slices/filterSlice'
import { LANGUAGES } from '@/enums/common'
import { RootState } from '@/store/store'
import { PlusIcon } from '@/components/atoms/icons/PlusIcon'
import { MinusIcon } from '@/components/atoms/icons/MinusIcon'
import { AGE_OPTIONS, PRODUCT_LIST_ITEMS_LIMIT } from '@/constants'
import '../styles/Filter.scss'
import { setProducts } from '@/slices/productsSlice'

export interface IFilterProps {
   categoryProducts: ProductsList
   selectedItemsCount: number
   currentPage: number
   clearAllFilters: () => void
   setAnyFilterSet: (anyFilterSet: boolean) => void
}

export const Filter: React.FC<IFilterProps> = ({
   categoryProducts,
   selectedItemsCount,
   clearAllFilters,
   setAnyFilterSet,
   currentPage,
}) => {
   const inputRefFrom = useRef<HTMLInputElement>(null)
   const inputRefTo = useRef<HTMLInputElement>(null)
   const intl = useIntl()
   const router = useRouter()
   const dispatch = useDispatch()

   const filterData = useSelector((state: RootState) => state.filter.filterData)
   const data = categoryProducts
   const { categoryId } = router.query
   const isLanguageAm = router.locale === LANGUAGES.ARMENIAN
   const [localFilterData, setLocalFilterData] = useState<FilterData>(filterData)

   useEffect(() => {
      fetchFilteredData()
   }, [currentPage, localFilterData])

   useEffect(() => {
      if (!isEqual(localFilterData, filterData)) {
         setLocalFilterData(filterData)
      }
   }, [filterData])

   const fetchFilteredData = async () => {
      if (categoryId) {
         const anyFilterSet =
            (localFilterData.priceRange && localFilterData.priceRange.from !== null) ||
            (localFilterData.priceRange && localFilterData.priceRange.to !== null) ||
            (localFilterData.age && localFilterData.age.length > 0) ||
            (localFilterData.subCategories && localFilterData.subCategories.length > 0) ||
            (localFilterData.propertyFilters && localFilterData.propertyFilters.length > 0)

         if (anyFilterSet) {
            try {
               const newFilterData: FilterData = {
                  categoryId: +categoryId,
                  limit: PRODUCT_LIST_ITEMS_LIMIT,
                  page: currentPage,
                  ...(localFilterData.priceRange &&
                  localFilterData.priceRange.from !== null &&
                  localFilterData.priceRange.to !== null &&
                  (localFilterData.priceRange.from !== 0 || localFilterData.priceRange.to !== 0)
                     ? {
                          priceRange: {
                             from:
                                localFilterData.priceRange.from !== null &&
                                localFilterData.priceRange.from !== undefined
                                   ? localFilterData.priceRange.from
                                   : undefined,
                             to:
                                localFilterData.priceRange.to !== null &&
                                localFilterData.priceRange.to !== undefined
                                   ? localFilterData.priceRange.to
                                   : undefined,
                          },
                       }
                     : {}),
                  age: localFilterData.age || [],
                  subCategories: localFilterData.subCategories || [],
                  propertyFilters: localFilterData.propertyFilters || [],
               }

               setAnyFilterSet(anyFilterSet)
               dispatch(setFilterData(newFilterData))
            } catch (error) {
               dispatch(setProducts({} as Products))
            }
         }
      }
   }

   const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
         e.preventDefault()

         if (inputRefFrom.current) {
            inputRefFrom.current.blur()
         }
         if (inputRefTo.current) {
            inputRefTo.current.blur()
         }
      }
   }

   const handlePriceBlur = (key: 'from' | 'to') => (event: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.trim()
      const numericValue = inputValue !== '' ? +inputValue : undefined

      setLocalFilterData((prevFilterData) => {
         const updatedPriceRange = {
            ...prevFilterData.priceRange,
            [key]: numericValue !== undefined && numericValue >= 0 ? numericValue : undefined,
         }

         const shouldSetPriceRange =
            updatedPriceRange.from !== undefined || updatedPriceRange.to !== undefined

         return {
            ...prevFilterData,
            priceRange: shouldSetPriceRange ? updatedPriceRange : undefined,
         }
      })
   }

   const handleCheckboxChange = (filterItem: 'subCategories' | 'age', value: number) => {
      setLocalFilterData((prevFilterData) => {
         const updatedFilterData = {
            ...prevFilterData,
            [filterItem]: Array.isArray(prevFilterData[filterItem])
               ? (prevFilterData[filterItem] as number[]).includes(value)
                  ? (prevFilterData[filterItem] as number[]).filter((item) => item !== value)
                  : [...(prevFilterData[filterItem] as number[]), value]
               : [value],
         }

         return updatedFilterData
      })
   }

   const handlePropertyValueChange =
      (propertyId: number, value: string | number) => (e: CheckboxChangeEvent) => {
         setLocalFilterData((prevFilterData) => {
            let updatedPropertyFilters = [...(prevFilterData.propertyFilters || [])]

            const filterIndex = updatedPropertyFilters.findIndex(
               (filter) => filter.propertyId === propertyId,
            )

            if (e.target.checked) {
               if (filterIndex !== -1) {
                  updatedPropertyFilters[filterIndex] = {
                     ...updatedPropertyFilters[filterIndex],
                     values: [...updatedPropertyFilters[filterIndex].values, value],
                  }
               } else {
                  updatedPropertyFilters.push({
                     propertyId: propertyId,
                     values: [value],
                  })
               }
            } else {
               if (filterIndex !== -1) {
                  updatedPropertyFilters[filterIndex] = {
                     ...updatedPropertyFilters[filterIndex],
                     values: updatedPropertyFilters[filterIndex].values.filter(
                        (val) => val !== value,
                     ),
                  }

                  if (updatedPropertyFilters[filterIndex].values.length === 0) {
                     updatedPropertyFilters = updatedPropertyFilters.filter(
                        (filter) => filter.propertyId !== propertyId,
                     )
                  }
               }
            }

            return {
               ...prevFilterData,
               propertyFilters: updatedPropertyFilters,
            }
         })
      }

   return (
      <div className='filterContainer'>
         <div className='filtersHeader'>
            <p>
               <FormattedMessage id='filters' />
               {`(${selectedItemsCount})`}
            </p>
            <div onClick={clearAllFilters}>
               <FormattedMessage id='clearFilters' />
            </div>
         </div>

         <Collapse
            expandIconPosition='end'
            expandIcon={({ isActive }) => (isActive ? <MinusIcon /> : <PlusIcon />)}
            ghost
         >
            <Collapse.Panel header={<FormattedMessage id='price' />} key='price'>
               <div className='priceRangeOption'>
                  <InputNumber
                     ref={inputRefFrom}
                     type='number'
                     placeholder={intl.formatMessage({
                        id: 'from',
                        defaultMessage: 'from',
                     })}
                     onBlur={handlePriceBlur('from')}
                     onKeyDown={handleEnterPress}
                     value={localFilterData.priceRange?.from}
                  />
                  {'-'}
                  <InputNumber
                     ref={inputRefTo}
                     type='number'
                     placeholder={intl.formatMessage({
                        id: 'to',
                        defaultMessage: 'to',
                     })}
                     onBlur={handlePriceBlur('to')}
                     onKeyDown={handleEnterPress}
                     value={localFilterData.priceRange?.to}
                  />
               </div>
            </Collapse.Panel>
            <Collapse.Panel header={<FormattedMessage id='age' />} key='age'>
               {AGE_OPTIONS.map((ageOption: number) => (
                  <Checkbox
                     key={ageOption}
                     onChange={() => handleCheckboxChange('age', ageOption)}
                     checked={localFilterData.age?.includes(ageOption)}
                  >
                     {ageOption}
                  </Checkbox>
               ))}
            </Collapse.Panel>
            {data?.resData?.subCategories && data?.resData?.subCategories?.length > 0 && (
               <Collapse.Panel header={<FormattedMessage id='productType' />} key='subcategories'>
                  {data.resData.subCategories.map((subcategory: Category) => (
                     <Checkbox
                        key={subcategory.id}
                        onChange={() => handleCheckboxChange('subCategories', subcategory.id)}
                        checked={localFilterData.subCategories?.includes(subcategory.id)}
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
                  {property?.propertyOptions?.map((option: PropertyOption) => {
                     const isChecked = localFilterData.propertyFilters?.some(
                        (pf) =>
                           pf.propertyId === property.id &&
                           pf.values.includes(
                              isLanguageAm && option.valueAm ? option.valueAm : option.valueEn,
                           ),
                     )
                     return (
                        <Checkbox
                           key={isLanguageAm && option.valueAm ? option.valueAm : option?.valueEn}
                           onChange={handlePropertyValueChange(
                              property.id,
                              isLanguageAm && option.valueAm ? option.valueAm : option.valueEn,
                           )}
                           checked={isChecked}
                        >
                           {isLanguageAm && option.valueAm ? option.valueAm : option.valueEn}
                        </Checkbox>
                     )
                  })}
               </Collapse.Panel>
            ))}
         </Collapse>
      </div>
   )
}
