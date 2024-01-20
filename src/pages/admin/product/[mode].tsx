import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import ManageProduct from '@/components/pages/AdminProduct/ManageProduct'

const ProductManagePage = () => {
   return <ManageProduct />
}

ProductManagePage.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}
export default ProductManagePage
