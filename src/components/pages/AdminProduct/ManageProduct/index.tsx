import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FolderEnum, ModeEnum, PropertyTypeEnum } from '@/enums/common'
import { Button, Form, Input, Select, Spin, Switch } from 'antd'
import AddImage from '@/assets/images/icon_image_plus_.svg'
import Image from 'next/image'
import { useMutation, useQuery } from 'react-query'
import AdminApi from '@/api/admin.api'
import QueryApi from '@/api/query.api'
import { BACKEND_IMAGES_URL } from '@/constants/config'
import deleteButton from '@/assets/images/delete_foto.svg'
import classes from './ManageProduct.module.scss'

const ManageProduct = () => {
   const [categoryData, setCategoryData] = useState<any[]>([])
   const [categoryDataById, setCategoryDataById] = useState<any[]>([])
   const [properties, setProperties] = useState<any[]>([])
   const [subProducts, setSubProducts] = useState<any[]>([])
   const [subProductsData, setSubProductsData] = useState<any[]>([])
   const [subProductsId, setSubProductsId] = useState<any[]>([])
   const [saveImages, setSaveImages] = useState<string[]>([])
   const router = useRouter()
   const { id, mode } = router.query
   const [form] = Form.useForm()

   const { data } = useQuery(
      `manage-page-data_${id ? 'update' : 'create'}`,
      () =>
         AdminApi.getProductsDataForCreate(
            mode === ModeEnum.create
               ? 'admin/product/create-page-data'
               : id && `admin/product/edit-page-data/${id}`,
         ),
      {
         onSuccess: (data) => {
            if (mode === ModeEnum.create) {
               setSubProductsData(data.products)
            } else {
               data?.product.categoryId && getCategoryData(data?.product.categoryId)
               setSubProductsData(
                  data.products.filter(
                     (item: any) => !data.product.subProducts.some((product: any) => product.id === item.id),
                  ),
               )
               setSubProducts(
                  data.products.filter((item: any) =>
                     data.product.subProducts.some((product: any) => product.id === item.id),
                  ),
               )

               const propertyNames: any = {}
               data?.product?.productProperties?.forEach((productProperty: any) => {
                  if (productProperty.valEn) {
                     propertyNames['valEn' + productProperty.propertyId] = productProperty.valEn
                  }

                  if (productProperty.valAm) {
                     propertyNames['valAm' + productProperty.propertyId] = productProperty.valEn
                  }
               })

               setProperties(data?.product?.productProperties)

               setSaveImages(data.product.images.map((image: { src: string }) => image.src))

               form.setFieldsValue({
                  titleEn: data?.product.titleEn,
                  categoryId: data?.product.categoryId,
                  titleAm: data?.product.titleAm,
                  price: data?.product.price,
                  qty: data?.product.qty,
                  age: data?.product.age,
                  shortDescriptionEn: data?.product.shortDescriptionEn,
                  shortDescriptionAm: data?.product.shortDescriptionAm,
                  descriptionEn: data?.product.descriptionEn,
                  descriptionAm: data?.product.descriptionAm,
                  metaTitle: data?.product.metaTitle,
                  metaDescription: data?.product.metaDescription,
                  ...propertyNames,
               })
            }

            setCategoryData(data.categories)
         },
         enabled: !!id || mode === ModeEnum.create,
      },
   )

   const { mutate: getCategoryInfo } = useMutation({
      mutationFn: (id: number) => {
         return AdminApi.getProductsCategoryData(id)
      },
      onSuccess: (data) => {
         setCategoryDataById(data)
      },
   })

   const getCategoryData = (value: number) => {
      getCategoryInfo(value)
   }

   // const dataForCreate: any = useMemo(() => data, [data])

   const { mutate: manageProduct } = useMutation({
      mutationFn: (data) => {
         return AdminApi.manageProduct(data, id ? +id : null)
      },
      onSuccess: () => {
         router.push('/admin/product')
      },
   })

   const onFinish = (values: any) => {
      manageProduct({
         ...values,
         price: +values.price,
         qty: +values.qty,
         age: +values.age,
         productProperties: properties,
         subProductIds: subProductsId,
         images: saveImages,
      })
   }

   const changePropDataNum = (event: any, id: any) => {
      if (event.target && !event.target.value.trim()) {
         return
      }
      if (
         properties.length &&
         properties.some((prop: any) =>
            event.target ? prop?.propertyId === id : prop?.propertyId === id.propId,
         )
      ) {
         const newProperties = properties.map((prop: any) => {
            if (event.target ? prop.propertyId === id : prop.propertyId === id.propId) {
               return { ...prop, valEn: event.target ? event.target.value : id.children }
            }
            return prop
         })
         setProperties(newProperties)
      } else {
         setProperties([
            ...properties,
            {
               propertyId: event.target ? id : id.propId,
               valEn: event.target ? event.target.value : id.children,
            },
         ])
      }
   }

   const changePropText = (event: any, id: any) => {
      const { name, value } = event.target
      // if (!value.trim()) {
      //    return
      // }
      if (properties.some((prop: any) => prop?.propertyId === id)) {
         const newProperties = properties.map((prop: any) => {
            if (prop.propertyId === id) {
               return { ...prop, [name]: value }
            }
            return prop
         })
         setProperties(newProperties)
      } else {
         setProperties([...properties, { propertyId: id, [name]: value }])
      }
   }

   const addSubProduct = (value: string, e: any) => {
      const newSubProductsData = subProductsData.filter((product: any) => product.id !== +value)
      setSubProductsId([...subProductsId, +value])
      setSubProductsData(newSubProductsData)
      setSubProducts([...subProducts, { id: +value, titleEn: e.children }])
   }
   const deleteSubProduct = (id: number) => {
      const elementById = subProducts.find((item) => item.id === id)
      setSubProductsData([...subProductsData, elementById])
      const newSubProducts = subProducts.filter((product) => product.id !== id)
      setSubProducts(newSubProducts)
      const newArray = subProductsId.filter((item) => item !== id)
      setSubProductsId(newArray)
   }

   const { mutate: mutateImages, isLoading: loader } = useMutation(
      (formData: FormData) => {
         return QueryApi.saveImages(formData)
      },
      {
         onSuccess: (data) => {
            setSaveImages([...saveImages, ...data.resData.map((image: { src: string }) => image.src)])
         },
      },
   )

   const { mutate: deleteImage, isLoading: loaderImage } = useMutation(
      (imageSrc: string) => {
         return QueryApi.deleteImage(imageSrc)
      },
      {
         onSuccess: (data) => {
            setSaveImages(saveImages.filter((image) => image !== data.resData))
         },
      },
   )

   const changeImages = (e: any) => {
      const files = e.target.files

      const formData: FormData = new FormData() as FormData

      for (const file of files) {
         formData.append('images', file)
      }

      formData.append('folder', FolderEnum.product)

      mutateImages(formData)
   }
   if (loader) {
      return (
         <div style={{ width: '100px', margin: '120px auto' }}>
            <Spin size={'large'} />
         </div>
      )
   }

   const deleteProductImage = (src: string) => {
      if (mode === ModeEnum.create) {
         deleteImage(src)
      } else {
         setSaveImages(saveImages.filter((image: string) => image !== src))
      }
   }

   return (
      <section className={classes.hk_admin_product_manage}>
         <h2>{mode === ModeEnum.create ? 'Adding a new product' : 'Editing a product'}</h2>
         <Form
            form={form}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700 }}
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
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
                  <Select onChange={(value) => getCategoryData(value)}>
                     {categoryData.map((el: any) => (
                        <Select.Option key={el.id} value={el.id}>
                           {el.titleEn}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
               <Form.Item name='isHidden' label='Hide product' valuePropName='switcher2'>
                  <Switch checked={mode === ModeEnum.create ? null : data?.product.isHidden} />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_second_box}>
               <Form.Item label='Ապրանքի անունը' name='titleAm'>
                  <Input />
               </Form.Item>
               <Form.Item name='isBestseller' label='Bestseller' valuePropName='switcher3'>
                  <Switch
                     // onClick={(e) => !e.target.checked}
                     checked={mode === ModeEnum.create ? null : data?.product.isBestseller}
                  />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_third_box}>
               <Form.Item
                  label='Price'
                  name='price'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input type='number' />
               </Form.Item>
               <Form.Item
                  label='Quantity'
                  name='qty'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input type='number' />
               </Form.Item>
               <Form.Item
                  label='Age'
                  name='age'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input type='number' />
               </Form.Item>
            </div>
            <div className={classes.hk_admin_product_manage_upload_section}>
               <div>
                  <h3>Add Photo</h3>
                  <label htmlFor={'upload_input'}>
                     <Image src={AddImage} alt={'add image'} />
                  </label>
               </div>
               <div className={classes.hk_admin_product_manage_upload_section_images_container}>
                  {saveImages.map((image) => (
                     <div key={image}>
                        <img
                           width={150}
                           src={`${BACKEND_IMAGES_URL}/${image}`}
                           alt='Uploads image'
                        />
                        <div onClick={() => deleteProductImage(image)}>
                           <Image src={deleteButton} alt={'delete button'} />
                        </div>
                     </div>
                  ))}
               </div>
               <input
                  onChange={(e) => changeImages(e)}
                  id='upload_input'
                  style={{ display: 'none' }}
                  type='file'
                  multiple={true}
               />
            </div>
            <div className={classes.hk_admin_product_manage_properties_box}>
               {categoryDataById.length
                  ? categoryDataById.map(
                       (property) =>
                          (property.type === PropertyTypeEnum.numeric && (
                             <div
                                className={classes.hk_admin_product_manage_properties_box_child}
                                key={property.id}
                             >
                                <h3>
                                   {property.nameEn} {property.nameEn && ` / ${property.nameAm}`}
                                </h3>
                                <Form.Item label='Number' name={'valEn' + property.id}>
                                   <Input
                                      type='number'
                                      onBlur={(event) => changePropDataNum(event, property.id)}
                                   />
                                </Form.Item>
                             </div>
                          )) ||
                          (property.type === PropertyTypeEnum.text && (
                             <div
                                className={classes.hk_admin_product_manage_properties_box_child}
                                key={property.id}
                             >
                                <div
                                   className={classes.hk_admin_product_manage_properties_box_child}
                                >
                                   <h3>
                                      {property.nameEn} {property.nameEn && ` / ${property.nameAm}`}
                                   </h3>

                                   <Form.Item label='English' name={'valEn' + property.id}>
                                      <Input
                                         name='valEn'
                                         onBlur={(event) => changePropText(event, property.id)}
                                      />
                                   </Form.Item>
                                   <Form.Item name={'valAm' + property.id} label='Հայերեն'>
                                      <Input
                                         name='valAm'
                                         onBlur={(event) => changePropText(event, property.id)}
                                      />
                                   </Form.Item>
                                </div>
                             </div>
                          )) ||
                          (property.type === PropertyTypeEnum.list && (
                             <div
                                className={classes.hk_admin_product_manage_properties_box_child}
                                key={property.id}
                             >
                                <h3>
                                   {property.nameEn} {property.nameEn && ` / ${property.nameAm}`}
                                </h3>
                                <Form.Item label='Choose' name={'valEn' + property.id}>
                                   <Select
                                      onChange={(value, e) => changePropDataNum(value, e)}
                                      style={{ width: '150px', marginLeft: '10px' }}
                                   >
                                      {property.propertyOptions.map((el: any) => (
                                         <Select.Option
                                            propId={property.id}
                                            key={el.id}
                                            value={el.id}
                                         >
                                            {el.valueEn}
                                         </Select.Option>
                                      ))}
                                   </Select>
                                </Form.Item>
                             </div>
                          )),
                    )
                  : null}
               {subProducts.length
                  ? subProducts.map((product) => (
                       <div key={product.id}>
                          {product.titleEn}{' '}
                          <span onClick={() => deleteSubProduct(product.id)}>X</span>
                       </div>
                    ))
                  : null}
               <Form.Item label='Adding sub-product' name='subProductIds'>
                  <Select onChange={(value, e) => addSubProduct(value, e)}>
                     {subProductsData.map((el: any) => (
                        <Select.Option value={el.id} key={el.id}>
                           {el.titleEn}
                        </Select.Option>
                     ))}
                     <Select.Option key={Math.random()} value=''>
                        {null}
                     </Select.Option>
                  </Select>
               </Form.Item>
            </div>

            <div>
               <Form.Item
                  label='Product short description'
                  name='shortDescriptionEn'
                  rules={[{ required: true, message: 'Please input!' }]}
               >
                  <Input.TextArea />
               </Form.Item>
               <Form.Item label='Ապրանքի համառոտ նկարագրություն' name='shortDescriptionAm'>
                  <Input.TextArea />
               </Form.Item>
            </div>
            <div>
               <Form.Item label='Additional description' name='descriptionEn'>
                  <Input.TextArea />
               </Form.Item>
               <Form.Item label='Լրացուցիչ նկարագրություն' name='descriptionAm'>
                  <Input.TextArea />
               </Form.Item>
            </div>
            <div>
               <Form.Item label='Meta Title' name='metaTitle'>
                  <Input />
               </Form.Item>
               <Form.Item label='Meta description' name='metaDescription'>
                  <Input />
               </Form.Item>
            </div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
               <Button type='primary' htmlType='submit'>
                  {mode === ModeEnum.create ? 'Submit' : 'Save'}
               </Button>
            </Form.Item>
         </Form>
      </section>
   )
}

export default ManageProduct
