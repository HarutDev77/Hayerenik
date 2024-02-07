import { Button, Space, Table } from 'antd'
import classes from './Properties.module.scss'
import { useMutation, useQuery } from 'react-query'
import AdminApi from '@/api/admin.api'
import { useRouter } from 'next/router'
import { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'

const PropertiesPage = () => {
   const router = useRouter()
   const { data, refetch } = useQuery('getProperties', AdminApi.getProperties)

   const properties: any = useMemo(() => data?.rows || [], [data])

   const { mutate: deleteProperty } = useMutation({
      mutationFn: (id: number) => {
         return AdminApi.deleteProperty(id)
      },
      onSuccess: () => {
         refetch()
      },
   })

   interface TabelDataType {
      id: number
      name: string
      type: string
   }

   const propertiesTabel: ColumnsType<any> = [
      {
         title: '№',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Property name',
         dataIndex: 'name',
         key: 'name',
         render: (_, record) => `${record.nameEn} / ${record.nameAm}`,
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type',
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size='middle'>
               <Button
                  onClick={() => {
                     router.push(`/admin/properties/edit?id=${record.id}`)
                  }}
                  type='primary'
                  ghost
               >
                  Edite
               </Button>
               <Button
                  onClick={() => {
                     deleteProperty(record.id)
                  }}
                  type='primary'
                  danger
                  ghost
               >
                  Delete
               </Button>
            </Space>
         ),
      },
   ]

   console.log(data)

   return (
      <div className={classes.properties}>
         <h2 className={classes.properties_header}>Properties</h2>
         <Table
            className={classes.properties_tabel}
            columns={propertiesTabel}
            dataSource={properties}
            pagination={{ position: ['bottomLeft'] }}
         />
         <Button
            onClick={() => {
               router.push('/admin/properties/create')
            }}
            type='primary'
         >
            Add new property
         </Button>
      </div>
   )
}

export default PropertiesPage
