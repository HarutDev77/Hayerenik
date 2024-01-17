import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import PropertiesPage from '@/components/pages/admin/Properties'

const Property = () => <PropertiesPage />

Property.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default Property
