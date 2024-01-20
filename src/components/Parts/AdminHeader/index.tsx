import React from 'react'
import Image from 'next/image'
import HkLogo from '@/assets/images/hayerenikLogo.svg'
import Link from 'next/link'
import MainButton from '@/components/Parts/MainButton'
import { deleteAuthToken } from '@/api/auth'
import { useRouter } from 'next/router'
import classes from './AdminHeader.module.scss'

const AdminHeader = () => {
   const router = useRouter()
   const logOut = () => {
      deleteAuthToken()
      router.push('/admin/login')
   }

   return (
      <nav className={classes.hk_admin_navigate}>
         <div className={classes.hk_admin_navigate_logo_box}>
            <Link href={'/'}>
               <Image src={HkLogo} alt={'Hk Logo'} priority={true} />
            </Link>
         </div>
         <div className={classes.hk_admin_navigate_menu_box}>
            <ul>
               <li>
                  <Link href='/admin/orders'>Orders</Link>
               </li>
               <li>
                  <Link href='/admin/product'>Products</Link>
               </li>
               <li>
                  <Link href='/admin/category'>Categories</Link>
               </li>
               <li>
                  <Link href='/admin/property'>Properties</Link>
               </li>
            </ul>
         </div>
         <div onClick={logOut} className={classes.hk_admin_navigate_last_box}>
            <MainButton text='Log out' />
         </div>
      </nav>
   )
}

export default AdminHeader
