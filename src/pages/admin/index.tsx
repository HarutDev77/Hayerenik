import { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'

const Admin = () => {
   return <h2 style={{ textAlign: 'center' }}>Admin page</h2>
}

Admin.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default Admin
