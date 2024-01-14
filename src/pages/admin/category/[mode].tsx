import React, { ReactElement } from 'react'
import CreateOrEditCategory from '@/components/pages/CategoryPage/CreateOrEditCategory'
import AdminLayout from '@/layouts/AdminLayout'
import { NextRequest, NextResponse } from 'next/server'
import { ModeEnum } from '@/enums/common'

// export const getServerSideProps = async (context: any) => {
//    const { mode, id = null } = context.query
//
//    if (![ModeEnum.edit, ModeEnum.create].includes(mode) || (mode === ModeEnum.edit && !id)) {
//       return { notFound: true }
//    }
//
//    return { props: { mode, id: id } }
// }

// export async function getServerSideProps(context: any) {
//    return WithAuth(context, true)
// }

const CategoryManagePage = () => {
   return <CreateOrEditCategory />
}

CategoryManagePage.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}
export default CategoryManagePage
