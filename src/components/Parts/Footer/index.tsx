import Image from 'next/image';
import ImageClouds from '@/assets/images/clouds.png';
import hk_logo from '@/assets/images/hkFooterLogo.svg';
import instagramLogo from '@/assets/images/instagramLogo.svg';
import FBLogo from '@/assets/images/FBLogo.svg';
import CodeMilesLogo from '@/assets/images/CodeMiles.svg';
import moonImage from '@/assets/images/moon.svg';
import moonLight from '@/assets/images/moonLight.svg';
import classes from './Footer.module.scss';
import { FormattedMessage } from 'react-intl';
import { TopCategory } from '@/types/category';
import UserApi from '@/api/user.api';
import { useEffect, useState } from 'react';
import DynamicMessage from '@/components/atoms/DynamicMessage';

const Footer = () => {
   const [topCategories, setTopCategories] = useState<TopCategory[]>([]);
   const getTopCategories = async () => {
      const response = await UserApi.getTopCategories(5);
      setTopCategories(response);
   };

   useEffect(() => {
      (async () => {
         await getTopCategories();
      })();
   }, []);

   return (
      <section className={classes.hk_footer}>
         <Image
            src={ImageClouds}
            alt={'Image Clouds'}
            priority={true}
            className={classes.hk_footer_image_clouds}
         />
         <div className={classes.hk_footer_content_box}>
            <div className={classes.hk_footer_content_box_Logo_box}>
               <div>
                  <Image src={hk_logo} alt={'Hayerenik logo'} priority={true} />
               </div>
               <div>
                  <Image src={instagramLogo} alt={'Instagram'} priority={true} />
                  <Image src={FBLogo} alt={'Facebook'} priority={true} />
               </div>
            </div>
            <div>
               <span>
                  <a href='#'>support@hayerenik.com</a>
               </span>
               <span>
                  <FormattedMessage id={'monday'} /> - <FormattedMessage id={'friday'} />
               </span>
               <span>9am - 5pm Eastern</span>
               <span>+16655000444777</span>
               <span>
                  <FormattedMessage id={'theAddress'} />
               </span>
               <span>LA 13152</span>
            </div>
            <div>
               <h5>
                  <FormattedMessage id={'topCategories'} />
               </h5>
               {topCategories.map((topCategory: TopCategory) => (
                  <>
                     <p key={topCategory.id}>
                        <DynamicMessage data={topCategory} prop={'title'} />
                     </p>
                  </>
               ))}
            </div>
            <div>
               <h5>
                  <FormattedMessage id={'information'} />
               </h5>
               <p>
                  <FormattedMessage id={'aboutUs'} />
               </p>
               <p>
                  <FormattedMessage id={'contactUs'} />
               </p>
               <p>
                  <FormattedMessage id={'payDelivery'} />
               </p>
               <p>
                  <FormattedMessage id={'returnRefund'} />
               </p>
               <p>
                  <FormattedMessage id={'privacy'} />
               </p>
            </div>
            <div>
               <Image
                  src={moonImage}
                  alt={'Moon image'}
                  priority={true}
                  className={classes.hk_footer_content_box_moon_image}
               />
               <Image
                  src={moonLight}
                  alt={'Moon Light'}
                  priority={true}
                  className={classes.hk_footer_content_box_moonlight_image}
               />
            </div>
         </div>
         <div className={classes.hk_footer_hk_llc_box}>
            <h4>
               <FormattedMessage id={'copy'} /> {new Date().getFullYear()}
            </h4>
         </div>
         <div className={classes.hk_footer_Code_Miles_box}>
            <p>
               <FormattedMessage id={'createdBy'} />
            </p>
            <Image src={CodeMilesLogo} alt={'Code Miles'} priority={true} />
         </div>
      </section>
   );
};

export default Footer;
