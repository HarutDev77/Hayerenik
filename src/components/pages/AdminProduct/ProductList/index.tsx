import React, { useMemo } from 'react'
import { Button, Input, Pagination, Space, Spin, Table } from 'antd'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import QueryApi from '@/api/query.api'
import { ColumnsType } from 'antd/es/table'
import classes from './ProductList.module.scss'
import { Select } from 'antd'
import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MainButton from '@/components/Parts/MainButton'

const AdminProducts = () => {
   const router = useRouter()

   const { data, reFetch } = useQuery('getProducts', QueryApi.getProducts)

   const products: any = useMemo(() => data?.resData?.productData, [data])

   // const { mutate: deleteProperty } = useMutation({
   //    mutationFn: (id: number) => {
   //       return AdminApi.deleteProperty(id)
   //    },
   //    onSuccess: () => {
   //       reFetch()
   //    },
   // })

   const propertiesTable: ColumnsType<any> = [
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Preview',
         dataIndex: 'name',
         key: 'name',
         render: (_, record) => `${record.img ? record.img : ''}`,
      },
      {
         title: 'Product Name',
         dataIndex: 'titleEn',
         key: 'Product Name',
      },
      {
         title: 'Quantity',
         dataIndex: 'qty',
         key: 'Quantity',
      },
      {
         title: 'Price',
         dataIndex: 'price',
         key: 'price',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'Status',
      },
      {
         title: 'Bestseller',
         dataIndex: 'isBestseller',
         key: 'BestSeller',
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <div>
               <Link href={``}>
                  <EditOutlined style={{ marginRight: '5px', color: '#3533B0' }} />
               </Link>
               <DeleteOutlined style={{ marginRight: '5px' }} />
               {/*{isLoading && <Spin />}*/}
            </div>
         ),
      },
   ]
   const handleChange = (value: string) => {
      console.log(`selected ${value}`)
   }

   console.log(data)

   return (
      <section className={classes.hk_admin_product}>
         <h2 className={classes.hk_admin_product_title}>Products</h2>
         <div className={classes.hk_admin_product_input_box}>
            <Input placeholder='Type here' />
            <Select defaultValue='lucy' style={{ width: 120 }} onChange={handleChange} options={[{ value: 'jack', label: 'Jack' }]} />
         </div>
         <Table className={classes.hk_admin_product_table} columns={propertiesTable} dataSource={products || []} pagination={false} />
         <div className={classes.hk_admin_product_pagination}>
            <Pagination defaultCurrent={1} total={50} />
         </div>
         <MainButton
            text={'Add new product'}
            width={'285px'}
            height={'60px'}
            fontSize={'25px'}
            onClick={() => {
               router.push('/admin/product/create')
            }}
            type='primary'
         ></MainButton>
      </section>
   )
}

export default AdminProducts
