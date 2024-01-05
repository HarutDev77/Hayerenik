import React from 'react'
import { ModeEnum } from '@/enums/common'

export const getServerSideProps = async (context: any) => {
   const { mode, id = null } = context.query

   if (![ModeEnum.edit, ModeEnum.create].includes(mode) || (mode === ModeEnum.edit && !id)) {
      return { notFound: true }
   }

   return { props: { mode, id: id } }
}

const PropertyManagePage = ({ mode, id }) => {
   // const router = useRouter()
   // const { mode, id } = router
   // // router.push({
   //    pathname: '/admin/[mode]]',
   //    query: {
   //       id: '',
   //       mode: 'edit',
   //    },
   // })

   console.log(mode, id)
   return <></>
}

export default PropertyManagePage
