import React, { ReactElement } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
const CreateProperty = () => {
   return <div></div>
}

CreateProperty.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}

export default CreateProperty
