import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Input, Modal, Pagination, Table, Select } from 'antd'
import QueryApi from '@/api/query.api'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MainButton from '@/components/Parts/MainButton'
import AdminApi from '@/api/admin.api'
import classes from './ProductList.module.scss'
import { debounce } from '@/helpers/utils'
import { PAGINATION_LIMIT } from '@/constants'

const AdminProducts = () => {
   const [productData, setProductData] = useState()
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedItem, setSelectedItem] = useState({})
   const [categories, setCategories] = useState([])
   const [parentCategoryId, setParentCategoryId] = useState<number | null>(null)
   const [searchTerm, setSearchTerm] = useState<string | null>(null)

   const router = useRouter()
   const queryClient = useQueryClient()

   useQuery(
      'getCategories',
      () => AdminApi.getProductsDataForCreate('admin/product/create-page-data'),
      {
         onSuccess: (data) => {
            setCategories(data.categories)
         },
      },
   )

   useQuery('getProducts', () => QueryApi.getProducts(), {
      onSuccess: (data) => {
         setProductData(data.resData)
      },
   })

   const { mutate: getProducts } = useMutation(
      (page: number = 1) => QueryApi.getProducts(page, parentCategoryId, searchTerm),
      {
         onSuccess: (data) => {
            setProductData(data.resData)
         },
      },
   )

   const { mutate: deleteProduct } = useMutation({
      mutationFn: (url: string) => {
         return QueryApi.deleteProduct(url)
      },
      onSuccess: () => {
         queryClient.invalidateQueries('getProducts')
      },
   })
   const handleCategoryChange = (value: string) => setParentCategoryId(+value)
   const changeSearch = (e) => setSearchTerm(e.target.value)
   const handleCancel = () => setIsModalOpen(false)
   const handleOk = (url) => {
      deleteProduct(url)
      setIsModalOpen(false)
   }

   const openModal = () => {
      setIsModalOpen(true)
   }

   useEffect(() => {
      getProducts()
   }, [getProducts, searchTerm, parentCategoryId])

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
            <div key={record.id}>
               <Link href={`/admin/product/edit?id=${record.id}`}>
                  <EditOutlined style={{ marginRight: '5px', color: '#3533B0' }} />
               </Link>
               <DeleteOutlined
                  onClick={() => {
                     setSelectedItem(record)
                     openModal()
                  }}
                  style={{ marginRight: '5px' }}
               />
            </div>
         ),
      },
   ]

   return (
      <section className={classes.hk_admin_product}>
         <h2 className={classes.hk_admin_product_title}>Products</h2>
         <div className={classes.hk_admin_product_input_box}>
            <Input
               placeholder='Type here'
               value={searchTerm}
               onChange={debounce((e) => changeSearch(e))}
            />
            <Select
               defaultValue='Choose category'
               style={{ width: '45%' }}
               onChange={handleCategoryChange}
            >
               {categories.map((category) => (
                  <Select.Option key={category.id}>{category.titleEn}</Select.Option>
               ))}
               <Select.Option>Category not selected</Select.Option>
            </Select>
         </div>
         <Table
            className={classes.hk_admin_product_table}
            columns={propertiesTable}
            dataSource={
               (productData &&
                  productData?.productData.map((item) => ({ ...item, key: item.id }))) ||
               []
            }
            pagination={false}
         />
         <div className={classes.hk_admin_product_pagination}>
            <Pagination
               onChange={(page) => getProducts(page)}
               defaultPageSize={PAGINATION_LIMIT}
               total={productData?.count || 0}
            />
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
         <Modal
            open={isModalOpen}
            onOk={() => handleOk(`admin/product/${selectedItem.id}`)}
            onCancel={handleCancel}
         >
            <p>
               Are you sure to delete product{' '}
               <span style={{ color: 'blue' }}>{selectedItem.titleEn}</span>
            </p>
         </Modal>
      </section>
   )
}

export default AdminProducts
