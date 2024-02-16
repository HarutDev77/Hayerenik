import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import '@/assets/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import { defaultOptions } from '@/configs/reactQueryConfigs'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigProvider } from 'antd'

export type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

const queryClient = new QueryClient({
   defaultOptions: defaultOptions,
})
export default function App({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page)
   return (
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
   )
}
