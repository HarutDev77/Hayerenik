import { useRouter } from 'next/router'
import { FC } from 'react'

interface IDynamicMessage {
   data: any
   prop: string
}

const DynamicMessage: FC<IDynamicMessage> = ({ data, prop }): string => {
   const { locale } = useRouter()

   return locale === 'am' && data[`${prop}Am`] !== undefined ? data[`${prop}Am`] : data[`${prop}En`]
}

export default DynamicMessage
