import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import OrdersList from '@/components/pages/AdminOrdersPage/OrdersList'

const Orders = () => {
   return <OrdersList />
}

Orders.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default Orders
