import React, { useState } from 'react'
import { Drawer } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Filter, FilterProps } from './Filter'
import { useMediaQuery } from 'react-responsive'
import { MOBILE_SCREEN_SIZE } from '@/constants'
import '../styles/FilterLayout.scss'
import Link from 'next/link'

export const FilterLayout: React.FC<FilterProps> = (props) => {
   const [drawerVisible, setDrawerVisible] = useState(false)
   const isMobile = useMediaQuery({ maxWidth: MOBILE_SCREEN_SIZE })

   const toggleDrawer = () => {
      setDrawerVisible(!drawerVisible)
   }

   return isMobile ? (
      <>
         <Link href='#' onClick={toggleDrawer} className='filterButton'>
            <FormattedMessage id={'filters'} />
         </Link>
         <Drawer
            title={<FormattedMessage id={'filters'} />}
            placement='left'
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={260}
         >
            <Filter {...props} />
         </Drawer>
      </>
   ) : (
      <Filter {...props} />
   )
}
