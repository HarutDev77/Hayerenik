import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import EditOrdersPage from '@/components/pages/AdminOrdersPage/EditOrders'

const EditOrders = () => {
   return <EditOrdersPage />
}

EditOrders.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default EditOrders
