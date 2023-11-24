import type {AppProps} from 'next/app'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import '@/assets/styles/global.scss';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return <>{getLayout(<Component {...pageProps} />)}</>
}