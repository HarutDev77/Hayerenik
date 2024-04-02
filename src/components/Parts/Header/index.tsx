import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { Input } from 'antd';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import Logo from '@/assets/images/hayerenikLogo.svg';
import Search from '@/assets/images/search.svg';
import Cart from '@/assets/images/cart.svg';
import { useRouter } from 'next/router';
import UserApi from '@/api/user.api';
import Tree from '@/components/Parts/Tree';
import DynamicMessage from '@/components/atoms/DynamicMessage';
import { Category, TopCategory } from '@/types/category';
import MenuIcon from '@/assets/images/MenuOutlined.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import classes from './Header.module.scss';

const Header = () => {
   const [topCategories, setTopCategories] = useState<TopCategory[]>([]);
   const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [isOpened, setIsOpened] = useState<boolean>(false);
   const [categories, setCategories] = useState<any>([]);
   const [isOpenedMobMenu, setIsOpenedMobMenu] = useState(false);
   const modalRef = useRef<any>();
   const modalRefMob = useRef<any>();

   const chosenItems = useSelector((state: RootState) => state.cart.selectedProducts);

   const router = useRouter();

   const searchItem = () => {
      setShowSearchInput((prevState) => !prevState);

      if (showSearchInput && searchTerm) {
         setShowSearchInput(false);
         router.push(`/search-result?term=${searchTerm}`);
      }
   };

   const handleKeyDown = (e: any) => {
      if (e.key === 'Enter' && searchTerm) {
         setTimeout(() => {
            setShowSearchInput(false);
         }, 300);

         router.push(`/search-result?term=${searchTerm}`);
      }
   };

   const getCategories = async () => {
      const response = await UserApi.getCategories();
      setCategories(response);
   };

   const getTopCategories = async () => {
      const response = await UserApi.getTopCategories(2);
      setTopCategories(response);
   };

   useEffect(() => {
      (async () => {
         await getCategories();
         await getTopCategories();
      })();
   }, []);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
         if (event.target.classList.contains('closeMenu')) {
            setTimeout(() => {
               setIsOpened(false);
               setIsOpenedMobMenu(false);
            }, 300);
         } else {
            if (
               modalRef.current &&
               !modalRef.current.contains(event.target as Node) &&
               event.target?.id !== 'list_all' &&
               event.target?.id !== 'list_all_a'
            ) {
               setIsOpened(false);
            }
            if (
               modalRefMob.current &&
               !modalRefMob.current.contains(event.target as Node) &&
               event.target.id !== 'list_all' &&
               event.target.id !== 'list_all_a' &&
               event.target.id !== 'burgerMenu'
            ) {
               setIsOpenedMobMenu(false);
            }
         }
      }
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [modalRef]);

   const goToCategory = (id) => {
      router.push(`/product/list-data/${id}`);
   };

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
                           {topCategories.map((topCategory: TopCategory) => (
                              <li onClick={() => goToCategory(topCategory.id)} key={topCategory.id}>
                                 <DynamicMessage data={topCategory} prop={'title'} />
                              </li>
                           ))}
                        </ul>
                     </div>
                     {isOpened && (
                        <div ref={modalRef} className={classes.categories_container}>
                           {categories.map((rootNode: Category) => (
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
                              <span>{chosenItems.length}</span>
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
               <div className={classes.hk_mobile_menu}>
                  <div>
                     <Image
                        style={{ cursor: 'pointer' }}
                        id={'burgerMenu'}
                        width={20}
                        height={20}
                        src={MenuIcon}
                        alt={'Burger menu'}
                        onClick={() => setIsOpenedMobMenu((prevState) => !prevState)}
                     />
                     {isOpenedMobMenu && (
                        <div ref={modalRefMob} className={classes.mob_menu}>
                           <LanguageSwitcher />
                           <ul>
                              <li id={'list_all'} onClick={() => setIsOpened(!isOpened)}>
                                 <a id={'list_all_a'} href='#'>
                                    {<FormattedMessage id={'all'} />}
                                 </a>
                              </li>
                              {isOpened && (
                                 <div ref={modalRef} className={classes.categories_container}>
                                    {categories.map((rootNode) => (
                                       <Tree key={rootNode.id} node={rootNode} />
                                    ))}
                                 </div>
                              )}
                              {topCategories.map((topCategory: TopCategory) => (
                                 <li
                                    className='closeMenu'
                                    onClick={() => goToCategory(topCategory.id)}
                                    key={topCategory.id}
                                 >
                                    <DynamicMessage data={topCategory} prop={'title'} />
                                 </li>
                              ))}
                              <li>
                                 <Link href='#'>
                                    <FormattedMessage id={'aboutUs'} />
                                 </Link>
                              </li>
                              <li onClick={() => setIsOpenedMobMenu((prevState) => !prevState)}>
                                 <Link href='/contacts'>
                                    <FormattedMessage id={'contacts'} />
                                 </Link>
                              </li>
                              <li>
                                 <Link href='#'>
                                    <FormattedMessage id={'payDelivery'} />
                                 </Link>
                              </li>
                              <li>Privacy policy</li>
                              <li>Return/refund policy</li>
                           </ul>
                        </div>
                     )}
                  </div>
                  <div>
                     <Link href='/'>
                        <Image width={100} height={40} src={Logo} alt={'Logo'} />
                     </Link>
                  </div>
                  <div className={classes.mob_menu_search_box}>
                     <Image
                        width={17}
                        height={20}
                        src={Search}
                        alt={'Search'}
                        onClick={searchItem}
                     />
                     <Link href={'/cart'}>
                        <Image width={17} height={20} src={Cart} alt={'Card'} />
                     </Link>
                     <div className={classes.hk_card_count}>{chosenItems.length}</div>
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
            </nav>
         </header>
      </>
   );
};

export default Header;
