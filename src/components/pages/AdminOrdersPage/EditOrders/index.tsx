import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import QueryApi from '@/api/query.api'
import { message, Form, Input, Select, Spin } from 'antd'
import { CheckOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons'
import { OrderPaymentStatusEnum } from '@/enums/common'
import { getKeyByEnumValue, getObjectFromEnum } from '@/helpers/utils'
import { BACKEND_IMAGES_URL } from '@/constants/config'
import MainButton from '@/components/Parts/MainButton'
import Link from 'next/link'
import { toast } from 'react-toastify'
import classes from './EditOrders.module.scss'

const EditOrdersPage = () => {
   const [editData, setEditData] = useState()
   const [formData, setFormData] = useState({})
   const [changeUserInfo, setChangeUserInfo] = useState({
      firstName: true,
      lastName: true,
      email: true,
      deliveryAddress: true,
   })

   const [form] = Form.useForm()
   const router = useRouter()
   const { id } = router.query

   useQuery('getOrderEditData', () => QueryApi.getOrderEditData(+id), {
      onSuccess: (data: any) => {
         console.log(data)
         setEditData(data)

         setFormData({
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            deliveryStatus: data?.status,
            fullAddress: data?.deliveryAddress,
         })

         form.setFieldsValue({
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            deliveryStatus: getKeyByEnumValue(OrderPaymentStatusEnum, data?.status),
            fullAddress: data?.deliveryAddress,
         })
      },
      enabled: !!id,
   })

   const { mutate, isLoading } = useMutation({
      mutationFn: (key: any) => {
         return QueryApi.changeUserOrderData(key, formData[key].toString(), +id)
      },
      onSuccess: (data) => {
         toast.success('Info have changed')
         console.log(data)
      },
   })
   const handleCopy = (name: string) => {
      navigator.clipboard.writeText(formData[name])
      message.success('Copied')
   }

   const handleFormChange = (e: any) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const changeUserData = (key) => {
      mutate(key)
   }

   const orderPaymentStatus = []

   const paymentStatusObject = getObjectFromEnum(OrderPaymentStatusEnum) // get object from the Enum

   for (const keys in paymentStatusObject) {
      const value = paymentStatusObject[keys]
      orderPaymentStatus.push(
         <Select.Option style={{ textTransform: 'capitalize!important' }} key={keys}>
            {value}
         </Select.Option>,
      )
   }

   if (isLoading) {
      return (
         <div style={{ margin: '150px auto', width: '50px' }}>
            <Spin size={'large'} />
         </div>
      )
   }

   return (
      <section className={classes.admin_order_egit}>
         <h1>
            Order № <span>{id}</span>
         </h1>
         <Form form={form} layout='vertical'>
            <div className={classes.admin_order_egit_form}>
               <Form.Item
                  name='firstName'
                  label='First name'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input
                     disabled={changeUserInfo.firstName}
                     name='firstName'
                     onChange={handleFormChange}
                     addonAfter={
                        <>
                           {changeUserInfo.firstName ? (
                              <EditOutlined
                                 onClick={() =>
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       firstName: false,
                                    })
                                 }
                                 className={classes.admin_edit_icon}
                              />
                           ) : (
                              <CheckOutlined
                                 onClick={() => {
                                    changeUserData('firstName')
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       firstName: true,
                                    })
                                 }}
                                 className={classes.admin_edit_icon}
                              />
                           )}
                           <CopyOutlined
                              onClick={() => handleCopy('firstName')}
                              className={classes.admin_copy_icon}
                           />
                        </>
                     }
                  />
               </Form.Item>
               <Form.Item
                  name='lastName'
                  label='Lats name'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input
                     disabled={changeUserInfo.lastName}
                     name='lastName'
                     onChange={handleFormChange}
                     addonAfter={
                        <>
                           {changeUserInfo.lastName ? (
                              <EditOutlined
                                 onClick={() =>
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       lastName: false,
                                    })
                                 }
                                 className={classes.admin_edit_icon}
                              />
                           ) : (
                              <CheckOutlined
                                 onClick={() => {
                                    changeUserData('lastName')
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       lastName: true,
                                    })
                                 }}
                                 className={classes.admin_edit_icon}
                              />
                           )}
                           <CopyOutlined
                              onClick={() => handleCopy('lastName')}
                              className={classes.admin_copy_icon}
                           />
                        </>
                     }
                  />
               </Form.Item>
               <Form.Item
                  name='email'
                  label='E-mail'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input
                     disabled={changeUserInfo.email}
                     name='email'
                     onChange={handleFormChange}
                     addonAfter={
                        <>
                           {changeUserInfo.email ? (
                              <EditOutlined
                                 onClick={() =>
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       email: false,
                                    })
                                 }
                                 className={classes.admin_edit_icon}
                              />
                           ) : (
                              <CheckOutlined
                                 onClick={() => {
                                    changeUserData('email')
                                    setChangeUserInfo({
                                       ...changeUserInfo,
                                       email: true,
                                    })
                                 }}
                                 className={classes.admin_edit_icon}
                              />
                           )}
                           <CopyOutlined
                              onClick={() => handleCopy('email')}
                              className={classes.admin_copy_icon}
                           />
                        </>
                     }
                  />
               </Form.Item>
               <Form.Item
                  name='deliveryStatus'
                  label='Status'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Select
                     onChange={() => changeUserData('deliveryStatus')}
                     style={{ width: '200px', textTransform: 'capitalize' }}
                  >
                     {orderPaymentStatus}
                  </Select>
               </Form.Item>
            </div>
            <div className={classes.admin_order_egit_total_container}>
               <div>
                  <Form.Item
                     name='fullAddress'
                     label='Delivery Address'
                     rules={[{ required: true, message: 'Please input!' }]}
                  >
                     <Input
                        disabled={changeUserInfo.deliveryAddress}
                        name='fullAddress'
                        onChange={handleFormChange}
                        addonAfter={
                           <>
                              {changeUserInfo.deliveryAddress ? (
                                 <EditOutlined
                                    onClick={() =>
                                       setChangeUserInfo({
                                          ...changeUserInfo,
                                          deliveryAddress: false,
                                       })
                                    }
                                    className={classes.admin_edit_icon}
                                 />
                              ) : (
                                 <CheckOutlined
                                    onClick={() => {
                                       changeUserData('fullAddress')
                                       setChangeUserInfo({
                                          ...changeUserInfo,
                                          deliveryAddress: true,
                                       })
                                    }}
                                    className={classes.admin_edit_icon}
                                 />
                              )}
                              <CopyOutlined
                                 onClick={() => handleCopy('deliveryAddress')}
                                 className={classes.admin_copy_icon}
                              />
                           </>
                        }
                     />
                  </Form.Item>
               </div>
               <div className={classes.admin_order_egit_total_container_total_price}>
                  <div>
                     <h4>Total price</h4>
                     <p>$ {editData?.totalAmount}</p>
                  </div>
               </div>
            </div>
         </Form>

         <div className={classes.admin_order_egit_table}>
            {editData?.orderItems.map((item: any, i: number) => (
               <div key={i} className={classes.admin_order_egit_table_row}>
                  <div className={classes.admin_order_egit_table_row_first_box}>
                     <div className={classes.admin_order_egit_table_row_first_box_image}>
                        <img src={`${BACKEND_IMAGES_URL}/${item.image}`} alt='Product image' />
                     </div>
                     <div>
                        <p>{item.name}</p>
                        <p>$ {item.price}</p>
                     </div>
                  </div>
                  <div className={classes.admin_order_egit_table_row_second_box}>
                     <div>
                        <p>{item.amount}</p>
                     </div>
                     <div>
                        <p>${item.amount * item.price}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <Link href={'/admin/order'}>
            <MainButton
               className={classes.admin_order_egit_main_button}
               text='Go back to Orders'
               width={'220px'}
               height={'50px'}
            />
         </Link>
      </section>
   )
}

export default EditOrdersPage
