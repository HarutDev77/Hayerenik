import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import classes from './ManageProduct.module.scss'
import { ModeEnum } from '@/enums/common'
import { Button, Form, Input, Select, Switch, Upload } from 'antd'
import AddImage from '@/assets/images/icon_image_plus_.svg'
import Image from 'next/image'
import { useMutation, useQuery } from 'react-query'
import AdminApi from '@/api/admin.api'

const ManageProduct = () => {
   const router = useRouter()
   const { id, mode } = router.query

   const normFile = (e: any) => {
      if (Array.isArray(e)) {
         return e
      }
      return e?.fileList
   }

   const { data } = useQuery('create-page-data', AdminApi.getProductsDataForCreate, {
      enabled: !!mode,
   })

   const dataForCreate: any = useMemo(() => data, [data])

   const { mutate: createProperty } = useMutation({
      mutationFn: (data) => {
         return AdminApi.createProduct(data)
      },
      onSuccess: () => {
         router.push('/admin/product')
      },
   })

   const onFinish = (values: any) => {
      console.log('Success:', values)
      createProperty({ ...values, price: +values.price, qty: +values.qty })
   }

   return (
      <section className={classes.hk_admin_product_manage}>
         <h2>{mode === ModeEnum.create ? 'Adding a new product' : 'Editing a product'}</h2>
         <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{}}
            onFinish={onFinish}
            autoComplete='off'
         >
            <div className={classes.hk_admin_product_manage_first_box}>
               <Form.Item
                  label='Title'
                  name='titleEn'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label='Parent category'
                  name='categoryId'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Select>
                     {dataForCreate?.categories?.map((el: any) => (
                        <Select.Option key={el.id} value={el.id}>
                           {el.titleEn}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
               <Form.Item name='isHidden' label='Hide product' valuePropName='switcher2'>
                  <Switch />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_second_box}>
               <Form.Item
                  label='Ապրանքի անունը'
                  name='titleAm'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item name='isBestseller' label='Bestseller' valuePropName='switcher3'>
                  <Switch />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_third_box}>
               <Form.Item
                  label='Price'
                  name='price'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input type='number' />
               </Form.Item>
               <Form.Item
                  label='Quantity'
                  name='qty'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label='Age'
                  name='age'
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_upload_section}>
               <h3>Add Photo</h3>
               <label htmlFor={'upload_input'}>
                  <Image src={AddImage} alt={'add image'} />
               </label>

               <input id='upload_input' style={{ display: 'none' }} type='file' multiple={true} />
            </div>
            <Form.Item label='Adding sub-product' name='subProductIds'>
               {dataForCreate?.products?.map((el: any) => (
                  <Select.Option key={el.id} value={el.id}>
                     {el.titleEn}
                  </Select.Option>
               ))}
               <Select />
            </Form.Item>

            <div>
               <Form.Item
                  label='Product short description *'
                  name='shortDescriptionEn'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input.TextArea />
               </Form.Item>
               <Form.Item
                  label='Ապրանքի համառոտ նկարագրություն *'
                  name='shortDescriptionAm'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input.TextArea />
               </Form.Item>
            </div>
            <div>
               <Form.Item
                  label='Additional description'
                  name='descriptionEn'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input.TextArea />
               </Form.Item>
               <Form.Item
                  label='Լրացուցիչ նկարագրություն'
                  name='descriptionAm'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input.TextArea />
               </Form.Item>
            </div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
            </Form.Item>
         </Form>
      </section>
   )
}

export default ManageProduct
