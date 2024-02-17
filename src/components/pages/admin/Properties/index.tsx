import { Button, Space, Table } from 'antd'
import classes from './Properties.module.scss'
import { useMutation, useQuery } from 'react-query'
import AdminApi from '@/api/admin.api'
import { useRouter } from 'next/router'
import { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'
import {PropertyTypeEnum} from "@/enums/common";
import {getEnumKeyByValue} from "@/helpers/utils";

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

   const propertiesTable: ColumnsType<any> = [
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
         render: (_, record) => `${getEnumKeyByValue(record.type, PropertyTypeEnum)}`
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
                  Edit
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
            columns={propertiesTable}
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
