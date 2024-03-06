import React, { useState } from 'react'
import { Drawer } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Filter } from './Filter'
import { useMediaQuery } from 'react-responsive'
import { MOBILE_SCREEN_SIZE } from '@/constants'
import '../styles/FilterLayout.scss'
import { FilterData, ProductsList } from '@/types/main'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setFilterData } from '@/slices/filterSlice'

interface IFilterLayoutProps {
   categoryProducts: ProductsList
   setAnyFilterSet: (anyFilterSet: boolean) => void
   currentPage: number
}

export const FilterLayout: React.FC<IFilterLayoutProps> = ({ setAnyFilterSet, ...otherProps }) => {
   const dispatch = useDispatch()
   const [drawerVisible, setDrawerVisible] = useState(false)
   const isMobile = useMediaQuery({ maxWidth: MOBILE_SCREEN_SIZE })
   const filterData = useSelector((state: RootState) => state.filter.filterData)

   const toggleDrawer = () => {
      setDrawerVisible(!drawerVisible)
   }

   const countSelectedItems = (filterData: FilterData) => {
      let count = 0
      count += filterData.age ? filterData.age.length : 0
      count += filterData.subCategories ? filterData.subCategories.length : 0
      count += filterData.propertyFilters
         ? filterData.propertyFilters.reduce((total, filter) => total + filter.values.length, 0)
         : 0

      return count
   }
   const selectedItemsCount = countSelectedItems(filterData)

   const clearAllFilters = () => {
      dispatch(setFilterData({} as FilterData))
      setAnyFilterSet(false)
   }

   return isMobile ? (
      <>
         <span onClick={toggleDrawer} className='filterButton'>
            <FormattedMessage id={'filters'} />
            {`(${selectedItemsCount})`}
         </span>
         <Drawer
            title={
               <div className='filtersLayoutHeader'>
                  <p>
                     <FormattedMessage id='filters' />
                     {`(${selectedItemsCount})`}
                  </p>
                  <div onClick={clearAllFilters}>
                     <FormattedMessage id='clearFilters' />
                  </div>
               </div>
            }
            placement='left'
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={270}
         >
            <Filter
               selectedItemsCount={selectedItemsCount}
               clearAllFilters={clearAllFilters}
               setAnyFilterSet={setAnyFilterSet}
               {...otherProps}
            />
         </Drawer>
      </>
   ) : (
      <Filter
         selectedItemsCount={selectedItemsCount}
         clearAllFilters={clearAllFilters}
         setAnyFilterSet={setAnyFilterSet}
         {...otherProps}
      />
   )
}
