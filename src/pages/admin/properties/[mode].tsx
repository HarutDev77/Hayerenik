import PropertyCreateUpdate from '@/components/pages/admin/PropertyCreateUpdate'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const PropertyManagePage = () => {
   return <PropertyCreateUpdate />
}

PropertyManagePage.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default PropertyManagePage
