import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import { Input } from 'antd'
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher'
import Logo from '@/assets/images/hayerenikLogo.svg'
import Search from '@/assets/images/search.svg'
import Cart from '@/assets/images/cart.svg'
import { useRouter } from 'next/router'
import UserApi from '@/api/user.api'
import Tree from '@/components/Parts/Tree'

import classes from './Header.module.scss'

const Header = () => {
   const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [isOpened, setIsOpened] = useState<boolean>(false)
   const [categories, setCategories] = useState<any>([])
   const modalRef = useRef<any>()

   const router = useRouter()

   const searchItem = () => {
      setShowSearchInput((prevState) => !prevState)

      if (showSearchInput && searchTerm) {
         setShowSearchInput(false)
         router.push(`/search-result?term=${searchTerm}`)
      }
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter' && searchTerm) {
         setTimeout(() => {
            setShowSearchInput(false)
         }, 300)

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && searchTerm){
            setTimeout(() => {
                setShowSearchInput(false)
            }, 300)

   const getCategories = async () => {
      const response = await UserApi.getCategories()
      console.log(response)
      setCategories(response)
   }

   useEffect(() => {
      ;(async () => {
         await getCategories()
      })()
   }, [])

   useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
         if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node) &&
            event.target.id !== 'list_all' &&
            event.target.id !== 'list_all_a'
         ) {
            setIsOpened(false)
         }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [modalRef])

   return (
      <>
         <header>
            <nav className={classes.hk_nav}>
               <div className={classes.hk_nav_first_box}>
                  <div>
                     <ul>
                        <li>
                           <Link href='/'>
                              <FormattedMessage id={'main'} />
                           </Link>
                        </li>
                        <li>
                           <Link href='#'>
                              <FormattedMessage id={'aboutUs'} />
                           </Link>
                        </li>
                        <li>
                           <Link href='#'>
                              <FormattedMessage id={'payDelivery'} />
                           </Link>
                        </li>
                        <li>
                           <Link href='/contacts'>
                              <FormattedMessage id={'contacts'} />
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div className={classes.hk_nav_first_box_lang_switcher_cont}>
                     <LanguageSwitcher />
                  </div>
               </div>
               <div className={classes.hk_nav_second_box}>
                  <div>
                     <Link href='/'>
                        <Image src={Logo} alt='hayerenik logo' priority={true} />
                     </Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                     <div className={classes.hk_nav_second_box_list_container}>
                        <ul>
                           <li id={'list_all'} onClick={() => setIsOpened(!isOpened)}>
                              <a id={'list_all_a'} href='#'>
                                 {<FormattedMessage id={'all'} />}
                              </a>
                           </li>
                           <li>
                              <a href='#'>Books</a>
                           </li>
                           <li>
                              <a href='#'>For school</a>
                           </li>
                           <li>
                              <a href='#'>Games</a>
                           </li>
                        </ul>
                     </div>
                     {isOpened && (
                        <div ref={modalRef} className={classes.categories_container}>
                           {categories.map((rootNode) => (
                              <Tree key={rootNode.id} node={rootNode} />
                           ))}
                        </div>
                     )}
                  </div>
                  <div className={classes.hk_nav_second_box_search_group_items}>
                     <div className={classes.hk_nav_search_box}>
                        <Image
                           className={classes.hk_nav_search_box_images}
                           src={Search}
                           alt='search'
                           priority={true}
                           onClick={searchItem}
                        />
                        <Link href={'/cart'}>
                           <Image
                              className={classes.hk_nav_search_box_images}
                              src={Cart}
                              alt='Cart'
                              priority={true}
                           />
                           <div className={classes.hk_nav_second_box_cart_count}>
                              <span>0</span>
                           </div>
                        </Link>

                        {showSearchInput ? (
                           <Input
                              onChange={({ target }) => setSearchTerm(target.value)}
                              onKeyDown={(e) => handleKeyDown(e)}
                              className={classes.hk_nav_second_box_search}
                              placeholder='Search'
                           />
                        ) : null}
                     </div>
                  </div>
               </div>
            </nav>
         </header>
      </>
   )
}

export default Header
