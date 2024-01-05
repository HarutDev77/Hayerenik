import ProductItem from '@/components/Parts/ProductItem'
import Link from 'next/link'
import { ALL_ITEMS } from '@/constants'
import { FC } from 'react'
import classes from './Bestsellers.module.scss'

interface ISectionBestsellers {
   margin?: string
}
const SectionBestsellers: FC<ISectionBestsellers> = ({ margin = '350px auto 45px' }) => {
   const BESTSELLERS_ITEMS = ALL_ITEMS.filter((item, index) => index < 5)

   return (
      <section style={{ margin }} className={classes.hk_home_section_bestsellers}>
         <div>
            <h2 className={classes.hk_home_section_bestsellers_title}>Bestsellers</h2>
            <div className={classes.hk_home_section_bestsellers_items_container}>
               {BESTSELLERS_ITEMS.map((item) => (
                  <Link rel='preload' style={{ textDecoration: 'none', color: 'black' }} key={item.id} href={`/product/${item.id}`}>
                     <ProductItem id={item.id} imageUrl={item.imageUrl} title={item.title} description={item.description} price={item.price} />
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}

export default SectionBestsellers
