import React, { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { EditOutlined } from '@ant-design/icons'
import { Input, Pagination, Table } from 'antd'
import Search from '@/assets/images/search.svg'
import Image from 'next/image'
import { useMutation, useQuery } from 'react-query'
import QueryApi from '@/api/query.api'
import { PAGINATION_LIMIT } from '@/constants'
import { OrderDeliveryStatusEnum } from '@/enums/common'
import classes from './OrdersList.module.scss'

const OrdersList = () => {
   const [orderData, setOrderData] = useState()
   const [orderStatus, setOrderStatus] = useState(OrderDeliveryStatusEnum.new)
   const [searchTerm, setSearchTerm] = useState('')

   useQuery('getOrders', () => QueryApi.getOrders(), {
      onSuccess: (data) => {
         console.log(data.resData)
         setOrderData(data.resData)
      },
   })

   const { mutate: getOrders } = useMutation(
      (page: number = 1) => QueryApi.getOrders(page, orderStatus, searchTerm),
      {
         onSuccess: (data) => {
            setOrderData(data.resData)
         },
      },
   )

   const pageChange = (page) => {
      getOrders(page)
   }

   useEffect(() => {
      getOrders()
   }, [getOrders, orderStatus])

   useEffect(() => {
      const timerId = setTimeout(getOrders, 500)
      return () => clearTimeout(timerId)
   }, [getOrders, searchTerm])

   const ordersTable: ColumnsType<any> = [
      {
         title: '№',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Date/Time',
         dataIndex: 'date',
         key: 'date',
         render: (_, record) => {
            const parsedDate = dayjs(record.createdAt)
            return parsedDate.format('M/D/YYYY — h:mm A')
         },
      },
      {
         title: 'Amount',
         dataIndex: 'amount',
         key: 'amount',
      },
      {
         title: 'Full name',
         dataIndex: 'name',
         key: 'name',
         render: (_, record) => `${record.firstName} ${record.lastName}`,
      },
      {
         title: 'Sum',
         dataIndex: 'sum',
         key: 'sum',
         render: (_, record) => <div key={record.id}>${record.sum}</div>,
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <div key={record.id}>
               <Link href={`/admin/order/edit?id=${record.id}`}>
                  <EditOutlined style={{ marginRight: '5px', color: '#3533B0' }} />
               </Link>
               {/*<DeleteOutlined onClick={() => {}} style={{ marginRight: '5px' }} />*/}
            </div>
         ),
      },
   ]

   return (
      <section className={classes.admin_order_list}>
         <h1>Orders</h1>
         <div className={classes.admin_order_list_status_box}>
            <h3
               className={
                  orderStatus === OrderDeliveryStatusEnum.new &&
                  classes.admin_order_list_status_box_active
               }
               onClick={() => setOrderStatus(OrderDeliveryStatusEnum.new)}
            >
               New
            </h3>
            <h3
               className={
                  orderStatus === OrderDeliveryStatusEnum.ongoing &&
                  classes.admin_order_list_status_box_active
               }
               onClick={() => setOrderStatus(OrderDeliveryStatusEnum.ongoing)}
            >
               Ongoing
            </h3>
            <h3
               className={
                  orderStatus === OrderDeliveryStatusEnum.delivered &&
                  classes.admin_order_list_status_box_active
               }
               onClick={() => setOrderStatus(OrderDeliveryStatusEnum.delivered)}
            >
               Delivered
            </h3>
            <h3
               className={
                  orderStatus === OrderDeliveryStatusEnum.canceled &&
                  classes.admin_order_list_status_box_active
               }
               onClick={() => setOrderStatus(OrderDeliveryStatusEnum.canceled)}
            >
               Canceled
            </h3>
         </div>
         <div className={classes.admin_order_list_search_box}>
            <Input
               placeholder='Type here'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image src={Search} alt={'search icon'} />
         </div>
         <Table
            className={classes.admin_order_list_table}
            columns={ordersTable}
            dataSource={orderData?.rows.map((item) => ({ ...item, key: item.id }))}
            pagination={false}
         />
         <div>
            <Pagination
               onChange={(page) => pageChange(page)}
               defaultPageSize={PAGINATION_LIMIT}
               total={orderData?.count}
            />
         </div>
      </section>
   )
}

export default OrdersList
