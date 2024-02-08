import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react'
import '@/assets/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import { defaultOptions } from '@/configs/reaqtQueryConfigs'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigProvider } from 'antd'
import { FormattedMessage, IntlProvider } from 'react-intl';

import enTranslations from '@/translations/en.json';
import amTranslations from '@/translations/am.json';

export type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

const queryClient = new QueryClient({
   defaultOptions: defaultOptions,
})

const translations = {
   en: enTranslations,
   am: amTranslations,
   // Add more languages as needed
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page)
   const router = useRouter();
   const { locale = 'en' } = router;
   const messages = translations[locale];

   return (
       <IntlProvider locale={locale} messages={messages}>
         <ConfigProvider
            theme={{
               components: {
                  Switch: {
                     handleSize: 31,
                     handleBg: '#D3D3D3',
                     trackHeight: 35,
                     trackMinWidth: 70,
                  },
               },
            }}
         >
            <QueryClientProvider client={queryClient}>
               <ToastContainer position='top-right' theme='colored' pauseOnFocusLoss />
               {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
         </ConfigProvider>
       </IntlProvider>
   )
}
