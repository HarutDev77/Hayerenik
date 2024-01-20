import { useMemo, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import classes from './PropertyCreateUpdate.module.scss'
import { PROPERTY_TYPE_LIST } from '@/constants/selects'
import { useMutation, useQuery } from 'react-query'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import AdminApi from '@/api/admin.api'
import { useRouter } from 'next/router'
import { ModeEnum } from '@/enums/common'

const PropertyCreateUpdate = () => {
   const router = useRouter()
   const { mode, id } = router.query
   const [selectType, setSelectType] = useState()

   const { data: propertyData, isLoading } = useQuery(
      'getPropertyById',
      () => {
         return AdminApi.getPropertyById(Number(id))
      },
      {
         enabled: !!id,
      },
   )

   const proparty: any = useMemo(() => propertyData, [propertyData])

   const { mutate: createProperty } = useMutation({
      mutationFn: (data) => {
         return AdminApi.createProperty(data)
      },
      onSuccess: () => {
         router.push('/admin/properties')
      },
   })

   const { mutate: editProperty } = useMutation({
      mutationFn: (data: any) => {
         return AdminApi.editProperty(data)
      },
      onSuccess: () => {
         router.push('/admin/properties')
      },
   })

   const onFinish = (values: any) => {
      const formData: any = {
         nameEn: values.nameEn,
         nameAm: values.nameAm,
         type: values.type,
         list: values.list,
      }
      console.log(values)
      if (mode === ModeEnum.create) {
         createProperty(formData)
      } else {
         const data = {
            id: Number(id),
            data: formData,
         }
         editProperty(data)
      }
   }

   if (isLoading) {
      return <p>Loading...</p>
   }

   return (
      <div className={classes.property}>
         <h2 className={classes.property_header}>
            {mode === ModeEnum.edit ? 'Edit property' : 'Adding a new property'}
         </h2>
         <Form
            layout='vertical'
            name='basic'
            initialValues={
               mode === ModeEnum.edit
                  ? {
                       nameEn: proparty?.nameEn || '',
                       nameAm: proparty?.nameAm || '',
                       type: proparty?.type || '',
                    }
                  : {}
            }
            onFinish={onFinish}
            autoComplete='off'
         >
            <Space style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
               <Form.Item
                  label='Proparty name'
                  name='nameEn'
                  rules={[{ required: true, message: 'Please input name EN!' }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label='Հատկանիշի անունը'
                  name='nameAm'
                  rules={[{ required: true, message: 'Please input your name AM!' }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label='Select'
                  name='type'
                  rules={[{ required: true, message: 'Please input type!' }]}
               >
                  <Select
                     onChange={(value) => {
                        setSelectType(value)
                     }}
                     style={{ minWidth: '100px' }}
                     disabled={mode === ModeEnum.edit}
                  >
                     {PROPERTY_TYPE_LIST.map((el) => (
                        <Select.Option key={el.value} value={el.value}>
                           {el.label}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
            </Space>

            <Form.List name='list' initialValue={[{ nameEn: '', nameAm: '' }]}>
               {(fields, { add, remove }) => (
                  <>
                     {fields.map(({ key, name, ...restField }, index) => (
                        <Space
                           key={key}
                           style={{ display: 'flex', marginBottom: 8 }}
                           align='baseline'
                        >
                           <Form.Item
                              {...restField}
                              name={[name, 'valueEn']}
                              rules={[{ required: true, message: 'Missing first name' }]}
                           >
                              <Input placeholder='Proparty value' />
                           </Form.Item>
                           <Form.Item
                              {...restField}
                              name={[name, 'valueAm']}
                              rules={[{ required: true, message: 'Missing last name' }]}
                           >
                              <Input placeholder='Հատկանիշի անունը' />
                           </Form.Item>
                           {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                        </Space>
                     ))}

                     <Form.Item>
                        <Button
                           style={{ maxWidth: '480px' }}
                           type='dashed'
                           onClick={() => add()}
                           block
                           icon={<PlusOutlined />}
                        >
                           Add value
                        </Button>
                     </Form.Item>
                  </>
               )}
            </Form.List>

            <Form.Item>
               <Row gutter={8}>
                  <Col>
                     <Button type='primary' htmlType='submit'>
                        {mode === ModeEnum.edit ? 'Edit property' : 'Add property'}
                     </Button>
                  </Col>

                  {mode === ModeEnum.create && (
                     <Col>
                        <Button type='primary' htmlType='submit'>
                           Save & add a new property
                        </Button>
                     </Col>
                  )}

                  <Col>
                     <Button
                        onClick={() => {
                           router.push('/admin/properties')
                        }}
                        type='primary'
                        htmlType='submit'
                     >
                        Cancel
                     </Button>
                  </Col>
               </Row>
            </Form.Item>
         </Form>
      </div>
   )
}

export default PropertyCreateUpdate
