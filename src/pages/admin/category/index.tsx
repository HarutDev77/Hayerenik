import React, { ReactElement, useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { useQuery } from 'react-query'
import QueryApi from '@/api/query.api'
import { Spin } from 'antd'
import { ICategoryData } from '@/types/admin'
import CategoriesTree from '@/components/pages/CategoryPage/CategoriesTree'

const Categories = () => {
   const { data, isLoading } = useQuery<ICategoryData[]>('getCategories', () => {
      return QueryApi.getCategories()
   })
   console.log(data)
   const categoryTreeData = (data as ICategoryData[]) || []

   if (isLoading) {
      return <Spin />
   }

   return <CategoriesTree data={categoryTreeData} />
}

Categories.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}
export default Categories
