import React, { ReactElement } from 'react';
import Head from 'next/head';
import MainLayout from '@/layouts';
import { ProductView } from '@/types/product-view';
import ItemPage from '@/components/pages/ItemPage';
import UserApi from '@/api/user.api';
import { SiteLanguageEnum } from '@/enums/common';

export const getServerSideProps = async (context: any) => {
   const { id } = context.query;
   const locale = context.locale || context.defaultLocale;

   try {
      const productViewData = await UserApi.getViewPageData(id);

      return { props: { productViewData, locale } };
   } catch (e: any) {
      return { notFound: true };
   }
};

const Product = (props: { productViewData: ProductView; locale: string }) => {
   const { product } = props.productViewData;

   return (
      <>
         <Head>
            <title>
               {props.locale === SiteLanguageEnum.am && product.titleAm
                  ? product.titleAm
                  : product.titleEn}
            </title>
            <meta name='description' content={product.metaDescription} />
            <meta name='title' content={product.metaTitle} />
         </Head>
         <ItemPage productViewData={props.productViewData} />;
      </>
   );
};

Product.getLayout = function getLayout(page: ReactElement): React.JSX.Element {
   return <MainLayout>{page}</MainLayout>;
};

export default Product;
