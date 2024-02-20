import ProductItem from '@/components/Parts/ProductItem'
import Link from 'next/link'
import { ALL_ITEMS } from '@/constants'
import { FC } from 'react'
import classes from './Bestsellers.module.scss'
import {FormattedMessage} from "react-intl";

interface ISectionBestsellers {
   margin?: string
}
const SectionBestsellers: FC<ISectionBestsellers> = ({ bestsellers, margin = '350px auto 45px' }) => {
   return (
      <section style={{ margin }} className={classes.hk_home_section_bestsellers}>
         <div>
            <h2 className={classes.hk_home_section_bestsellers_title}><FormattedMessage id={'bestsellers'} /></h2>
            <div className={classes.hk_home_section_bestsellers_items_container}>
               {bestsellers?.map((item) => (
                 <ProductItem key={item.id} id={item.id} imageUrl={item.image} title={item.title} description={item.description} price={item.price} />
               ))}
            </div>
         </div>
      </section>
   )
}

export default SectionBestsellers
