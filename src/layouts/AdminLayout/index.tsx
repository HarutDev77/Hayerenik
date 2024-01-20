import React, { FC, useEffect } from 'react'
import Footer from '@/components/Parts/Footer'
import AdminHeader from '@/components/Parts/AdminHeader'
import { getAuthToken } from '@/api/auth'
import { useRouter } from 'next/router'

interface LayoutProp {
   children: React.ReactNode
}

const AdminLayout: FC<LayoutProp> = ({ children }) => {
   const router = useRouter()
   const token = getAuthToken()

   useEffect(() => {
      if (!token) {
         router.push('/admin/login')
      }
   }, [router, token])

   return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
         <AdminHeader />
         <main>{children}</main>
         <Footer />
      </div>
   )
}

export default AdminLayout
