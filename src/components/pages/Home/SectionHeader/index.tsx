import Image from 'next/image'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import HeaderImageMobile from '@/assets/images/headerImageMobile.svg'
import headerImage from '@/assets/images/headerbackgruondimage.svg'
import Cloud from '@/assets/images/cloud1.svg'
import { useEffect, useState } from 'react'
import classes from './SectionHeader.module.scss'

const SectionHeader = () => {
   const [screenPhoto, setScreenPhoto] = useState(headerImage)

   const router = useRouter()
   const { locale } = router

   useEffect(() => {
      function handleResize() {
         const screenWidth = window?.innerWidth

         if (screenWidth && screenWidth < 767) {
            setScreenPhoto(HeaderImageMobile)
         }
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return (
      <section className={classes.hk_home_section_header}>
         <div className={classes.hk_home_section_header_content}>
            <div>
               <h1 style={{ width: locale === 'am' ? '700px' : 'auto' }}>
                  <FormattedMessage id={'bestForChild'} />
               </h1>
               <p>
                  <FormattedMessage id={'hayerenikIs'} />
               </p>
               <div>
                  <button>
                     <FormattedMessage id={'exploreNow'} />
                  </button>
               </div>
            </div>
            <Image
               src={Cloud}
               alt='Cloud'
               priority={true}
               className={classes.hk_home_section_header_content_cloud_left}
            />
            <Image
               src={Cloud}
               alt='Cloud'
               priority={true}
               className={classes.hk_home_section_header_content_cloud_top}
            />
            <Image
               src={Cloud}
               alt='Cloud'
               priority={true}
               className={classes.hk_home_section_header_content_cloud_bottom}
            />
            <Image
               src={Cloud}
               alt='Cloud'
               priority={true}
               className={classes.hk_home_section_header_content_cloud_right_top}
            />
            <Image
               src={Cloud}
               alt='Cloud'
               priority={true}
               className={classes.hk_home_section_header_content_cloud_right}
            />
         </div>
         <div className={classes.hk_home_section_header_img_wrapper}>
            <Image
               src={screenPhoto as any}
               alt='Ararat image'
               className={classes.hk_home_section_header_img_wrapper_image}
               priority={true}
            />
         </div>
      </section>
   )
}

export default SectionHeader
