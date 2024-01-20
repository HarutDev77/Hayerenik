import React from 'react'
import { useRouter } from 'next/router'
import classes from './ManageProduct.module.scss'
import { ModeEnum } from '@/enums/common'
import { Button, Form, Input, Select, Switch, Upload } from 'antd'
import AddImage from '@/assets/images/icon_image_plus_.svg'
import Image from 'next/image'

const ManageProduct = () => {
   const router = useRouter()
   const { id, mode } = router.query

   const onFinish = (values: any) => {
      console.log('Success:', values)
   }

   const normFile = (e: any) => {
      if (Array.isArray(e)) {
         return e
      }
      return e?.fileList
   }

   return (
      <section className={classes.hk_admin_product_manage}>
         <h2>{mode === ModeEnum.create ? 'Adding a new product' : 'Editing a product'}</h2>
         <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{}} onFinish={onFinish} autoComplete='off'>
            <div className={classes.hk_admin_product_manage_first_box}>
               <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
               </Form.Item>
               <Form.Item label='Parent category' name='select' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Select />
               </Form.Item>
               <Form.Item name='switcher2' label='Hide product' valuePropName='switcher2'>
                  <Switch />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_second_box}>
               <Form.Item label='Ապրանքի անունը' name='titleAm' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
               </Form.Item>
               <Form.Item name='switcher3' label='Bestseller' valuePropName='switcher3'>
                  <Switch />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_third_box}>
               <Form.Item label='Price' name='Price' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
               </Form.Item>
               <Form.Item label='Quantity' name='Quantity' rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
               </Form.Item>
               <Form.Item label='Age' name='Age' rules={[{ required: true, message: 'Please input your username!' }]}>
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
            <Form.Item label='Adding sub-product' name='select2'>
               <Select />
            </Form.Item>

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
