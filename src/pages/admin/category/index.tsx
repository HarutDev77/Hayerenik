import React, { ReactElement, useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { useQuery } from 'react-query'
import QueryApi from '@/api/query.api'
import { Spin } from 'antd'
import { ICategoryData } from '@/types/admin'
import TreeView from '@/components/Parts/CategoriesTree'
import CategoriesTree from '@/components/Parts/CategoriesTree'

const Categories = () => {
   const { data, isLoading } = useQuery<ICategoryData[]>('getCategories', () => {
      return QueryApi.getCategories()
   })

   const categoryTreeData = data as ICategoryData[]

   if (isLoading) {
      return <Spin />
   }

   return <CategoriesTree data={categoryTreeData} />
}

Categories.getLayout = function getLayout(page: ReactElement) {
   return <AdminLayout>{page}</AdminLayout>
}
export default Categories