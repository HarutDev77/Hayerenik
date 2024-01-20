import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import ManageCategory from '@/components/pages/CategoryPage/ManageCategory'

const CategoryManagePage = () => {
   return <ManageCategory />
}

CategoryManagePage.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}
export default CategoryManagePage
