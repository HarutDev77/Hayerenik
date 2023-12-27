import type {AppProps} from 'next/app'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import '@/assets/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css'

import {defaultOptions} from "@/configs/reaqtQueryConfigs";
import {ToastContainer} from "react-toastify";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const queryClient = new QueryClient({
    defaultOptions: defaultOptions,
})
export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-right' />
             {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
    )
}