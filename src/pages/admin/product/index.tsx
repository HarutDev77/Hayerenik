import React, { ReactElement } from 'react'
import AdminProducts from '@/components/pages/AdminProduct/ProductList'
import AdminLayout from '@/layouts/AdminLayout'

const Products = () => {
   return <AdminProducts />
}

Products.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default Products
