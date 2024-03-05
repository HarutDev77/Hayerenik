import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import { BUBBLES_LEFT, BUBBLES_RIGHT, REVIEWS_IMAGES } from '@/constants'
import startsImage from '@/assets/images/stars.svg'
import greenFishImg from '@/assets/images/grinFish.svg'
import yellowFishImg from '@/assets/images/yellowFishsvg.svg'
import WaveMobile from '@/assets/images/mobileWave.svg'
import SeaImage from '@/assets/images/sea_image.svg'
import WaveTop from '@/assets/images/waveTop.svg'
import WaveBottom from '@/assets/images/waveBottom.svg'
import Send from '@/assets/images/sandImage.svg'
import { useRouter } from 'next/router'
import classes from './Reviews.module.scss'

const SectionReviews = () => {
   const [screenPhoto, setScreenPhoto] = useState(SeaImage)
   const { locale } = useRouter()

   useEffect(() => {
      function handleResize() {
         const screenWidth = window?.innerWidth

         if (screenWidth && screenWidth < 767) {
            setScreenPhoto(WaveMobile)
         }
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return (
      <section className={classes.hk_home_section_review}>
         <h2>Reviews</h2>

         {REVIEWS_IMAGES.map((img, index) => (
            <Image
               key={index}
               className={img.className.map((className) => classes[className]).join(' ')}
               src={img.img}
               alt={'image Puzzles'}
               priority={true}
            />
         ))}
         <Image
            key={100}
            className={classes.hk_home_section_review_sea_img}
            src={screenPhoto as any}
            alt='sea image'
            priority={true}
         />
         <Image
            key={102}
            className={classes.hk_home_section_review_waveTop_img}
            src={WaveTop}
            alt='wave image'
            priority={true}
         />
         <Image
            key={101}
            className={classes.hk_home_section_review_waveBottom_img}
            src={WaveBottom}
            alt='wave image'
            priority={true}
         />
         <Image
            key={100}
            className={classes.hk_home_section_review_sandImg_img}
            src={Send}
            alt='sand image'
            priority={true}
         />

         <div className={classes.hk_home_section_review_under_water_container_top}>
            <div>
               <Image src={startsImage} alt='stars image' priority={true} />
               <p style={locale === 'am' ? { fontSize: '13px' } : {}}>
                  <FormattedMessage id={'review1'} />
               </p>
            </div>
            <div>
               <Image src={startsImage} alt='stars image' priority={true} />
               <p style={locale === 'am' ? { fontSize: '13px' } : {}}>
                  <FormattedMessage id={'review2'} />
               </p>
            </div>
            <div className={classes.hk_green_fish_container}>
               <Image
                  src={greenFishImg}
                  alt={'fish image'}
                  priority={true}
                  className={classes.hk_home_section_review_green_fish}
               />
               {BUBBLES_RIGHT.map((bubble, index) => (
                  <Image
                     key={index}
                     src={bubble.img}
                     alt='bubbles image'
                     priority={true}
                     className={bubble.className.map((className) => classes[className]).join(' ')}
                  />
               ))}
            </div>
         </div>
         <div className={classes.hk_home_section_review_under_water_container_bottom}>
            <div>
               <Image src={startsImage} alt='stars image' priority={true} />
               <p style={locale === 'am' ? { fontSize: '13px' } : {}}>
                  <FormattedMessage id={'review3'} />
               </p>
            </div>
            <div>
               <Image src={startsImage} alt='stars image' priority={true} />
               <p style={locale === 'am' ? { fontSize: '13px' } : {}}>
                  <FormattedMessage id={'review4'} />
               </p>
            </div>
            <div className={classes.hk_green_yellow_fish_container}>
               <Image
                  src={yellowFishImg}
                  alt={'fish image'}
                  priority={true}
                  className={classes.hk_home_section_review_yellow_fish}
               />
               {BUBBLES_LEFT.map((bubble, index) => (
                  <Image
                     key={index}
                     src={bubble.img}
                     alt='bubbles image'
                     priority={true}
                     className={bubble.className.map((className) => classes[className]).join(' ')}
                  />
               ))}
            </div>
         </div>
      </section>
   )
}

export default SectionReviews
