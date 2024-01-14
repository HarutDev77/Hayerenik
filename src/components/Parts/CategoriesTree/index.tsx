import React, { useState } from 'react'
import Image from 'next/image'
import Plus from '@/assets/images/plusImg.svg'
import Minus from '@/assets/images/MinusImg.svg'
import Circle from '@/assets/images/circle.svg'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import classes from './CategoriesTree.module.scss'
import MainButton from '@/components/Parts/MainButton'
import { ICategoryData } from '@/types/admin'
import Link from 'next/link'
import { Modal, Spin } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import QueryApi from '@/api/query.api'

const TreeNode = ({ node }) => {
   const [isExpanded, setIsExpanded] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const queryClient = useQueryClient()

   const { mutate, isLoading } = useMutation(
      (url: string) => {
         return QueryApi.deleteCategory(url)
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries('getCategories')
         },
      },
   )

   const handleToggle = () => {
      setIsExpanded(!isExpanded)
   }
   const handleOk = (id) => {
      mutate(`admin/category/${id}`)
      setIsModalOpen(false)
   }

   const handleCancel = () => {
      setIsModalOpen(false)
   }
   const deleteCategory = () => {
      setIsModalOpen(true)
   }

   return (
      <div className={classes.tree_node}>
         <div onClick={handleToggle} className={classes.node_toggle}>
            {node.subCategories.length > 0 ? isExpanded ? <Image src={Minus} alt={'minus'} /> : <Image src={Plus} alt={'plus'} /> : <Image src={Circle} alt={'circle'} />}
            <span>{node.titleEn}</span>
            <div>
               <EditOutlined style={{ marginRight: '5px', color: '#3533B0' }} />
               <DeleteOutlined onClick={deleteCategory} />
               {isLoading && <Spin />}
            </div>
         </div>
         {isExpanded && (
            <ul className={classes.child_nodes}>
               {node.subCategories.map((childNode: ICategoryData) => (
                  <li key={childNode.id}>
                     <TreeNode node={childNode} />
                  </li>
               ))}
            </ul>
         )}
         <Modal open={isModalOpen} onOk={() => handleOk(node.id)} onCancel={handleCancel}>
            <p>Are you sure to delete category {node.titleEn}</p>
         </Modal>
      </div>
   )
}

const TreeView = ({ data }) => {
   const [isOpened, setIsOpened] = useState(true)

   const handleToggleAll = () => {
      setIsOpened(!isOpened)
   }

   return (
      <section className={classes.hk_admin_categories}>
         <h1 className={classes.hk_admin_categories_title}>Categories</h1>
         <h3 onClick={handleToggleAll}>
            {data.length === 0 ? <Image src={Circle} alt={'circle'} /> : isOpened ? <Image src={Minus} alt={'minus'} /> : <Image src={Plus} alt={'plus'} />}
            All
         </h3>
         {isOpened ? data.map((rootNode) => <TreeNode key={rootNode.id} node={rootNode} />) : <></>}
         <div>
            <Link href={'/admin/category/create'}>
               <MainButton text={'Add new category'} fontSize={'16px'} width={'218px'} height={'50px'} className={classes.hk_admin_categories_main_button} />
            </Link>
         </div>
      </section>
   )
}

export default TreeView
