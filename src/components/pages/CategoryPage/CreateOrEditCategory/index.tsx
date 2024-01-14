import { Input, Spin, Switch } from 'antd'
import Image from 'next/image'
import AddImage from '@/assets/images/icon_image_plus_.svg'
import { FC, useState } from 'react'
import deleteButton from '@/assets/images/delete_foto.svg'
import Link from 'next/link'
import Plus from '@/assets/images/plusImg.svg'
import { FormControl, MenuItem, Select } from '@mui/material'
import MainButton from '@/components/Parts/MainButton'
import QueryApi from '@/api/query.api'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { FolderEnum } from '@/enums/common'
import { BACKEND_IMAGES_URL } from '@/constants/config'
import { ICategoryForm } from '@/types/admin'
import { toast } from 'react-toastify'
import classes from './CreateOrEditCategory.module.scss'

const CreateOrEditCategory: FC = () => {
   const [properties, setProperties] = useState([])
   const [selectedValue, setSelectedValue] = useState<string>('')
   const [propTags, setPropTags] = useState([])
   const [categoryForm, setCategoryForm] = useState<ICategoryForm>({
      parentId: null,
      titleEn: '',
      titleAm: null,
      metaTitle: null,
      metaDescription: null,
      isHidden: false,
      isTop: false,
      img: null,
      propertiesIds: [],
   })
   const [categories, setCategories] = useState([])
   const router = useRouter()

   const { mutate } = useMutation(
      (categoryForm: ICategoryForm) => {
         return QueryApi.saveCategory(categoryForm)
      },
      {
         onSuccess: (data) => {
            toast.success('Success! Category created')
            setCategoryForm({ parentId: null, titleEn: '', titleAm: null, metaTitle: null, metaDescription: null, isHidden: false, isTop: false, img: null, propertiesIds: [] })
            setSelectedValue('')
         },
      },
   )

   const { mutate: mutateImage, isLoading: loader } = useMutation(
      (formData) => {
         return QueryApi.saveImage(formData)
      },
      {
         onSuccess: (data) => {
            setCategoryForm({ ...categoryForm, img: data.resData.path })
         },
      },
   )

   const { id, mode } = router.query

   const { data, isLoading } = useQuery(
      'createCategoryPageData',
      () => {
         return QueryApi.createCategoryPageData()
      },
      {
         onSuccess: (data) => {
            setCategories(data.resData.categories)
            setProperties(data.resData.properties)
         },
      },
   )
   const onChange = () => {
      setCategoryForm({ ...categoryForm, isTop: !categoryForm.isTop })
   }

   const toggleParentCategory = () => {
      setCategoryForm({ ...categoryForm, isHidden: !categoryForm.isHidden })
   }

   const handleFileChange = (event) => {
      const file = event.target.files[0]

      const formData = new FormData()

      formData.append('image', file)
      formData.append('folder', FolderEnum.category)

      mutateImage(formData)
   }

   const changeTitle = (e) => {
      const { name, value } = e.target
      setCategoryForm({ ...categoryForm, [name]: value })
   }

   const handleChange = (event) => {
      setSelectedValue(event.target.value)
      setCategoryForm({ ...categoryForm, parentId: event.target.value })
   }

   const deleteProperty = (prop) => {
      const id = prop.id
      const newProperties = propTags.filter((property) => property.id !== id)
      setPropTags([...newProperties])

      const newPropertiesIds = categoryForm.propertiesIds.filter((property) => property !== id)

      setCategoryForm({ ...categoryForm, propertiesIds: [...newPropertiesIds] })
      setProperties([...properties, prop])
   }

   const addProperties = (prop) => {
      const id = prop.id
      setProperties(properties.filter((property) => property.id !== id))
      setCategoryForm({ ...categoryForm, propertiesIds: [...categoryForm.propertiesIds, id] })
      setPropTags([...propTags, prop])
   }

   const createCategory = () => {
      if (categoryForm.titleEn.trim()) {
         mutate(categoryForm)
      }
   }

   return (
      <section className={classes.hk_admin_category}>
         <h1>Adding a new category {mode}</h1>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>
                  Category name <span>*</span>
               </h3>
               <Input rules={[{ required: true, message: 'Please input your username!' }]} value={categoryForm.titleEn} name={'titleEn'} placeholder='Category name' onChange={(e) => changeTitle(e)} />
            </div>
            <div>
               <h3>Parent category</h3>
               <FormControl fullWidth>
                  <Select value={selectedValue} onChange={handleChange} className={classes.hk_admin_category_parent_category}>
                     {categories.map((prop) => (
                        <MenuItem key={prop.id} data-id={prop.id} value={prop.id}>
                           {prop.titleEn}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
            <div className={classes.hk_admin_category_name_box_last_box}>
               <h3>Hide category</h3>
               <Switch onChange={toggleParentCategory} />
            </div>
         </div>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Կատեգորիայի անունը</h3>
               <Input placeholder='Կատեգորիայի անունը' name={'titleAm'} value={categoryForm.titleAm} onChange={(e) => changeTitle(e)} />
            </div>
            <div className={classes.hk_admin_category_name_box_switch_top}>
               <h3>Top</h3>
               <Switch onChange={onChange} />
            </div>
         </div>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Meta Title</h3>
               <Input placeholder='Title' name={'metaTitle'} onChange={(e) => changeTitle(e)} />
            </div>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Meta description</h3>
               <Input name={'metaDescription'} onChange={(e) => changeTitle(e)} placeholder='Description' />
            </div>
         </div>
         {categoryForm.isTop && (
            <div className={classes.hk_admin_category_attach_file_box}>
               <h3>Photo</h3>
               <label htmlFor='hk_input_attach_file'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {loader ? (
                     <Spin />
                  ) : categoryForm.img ? (
                     <img src={`${BACKEND_IMAGES_URL}/${categoryForm.img}`} alt={'add image'} width={130} height={130} />
                  ) : (
                     <Image src={AddImage} alt={'add image'} />
                  )}
               </label>
               <input style={{ display: 'none' }} type='file' id='hk_input_attach_file' onChange={handleFileChange} />
               <div onClick={() => setCategoryForm({ ...categoryForm, img: null })}>
                  <Image src={deleteButton} alt={'delete button'} />
                  Delete
               </div>
            </div>
         )}
         <div className={classes.hk_admin_category_add_property_box}>
            <div className={classes.hk_admin_category_add_property_box_first_block}>
               <h3>Properties</h3>
               <Link href='#' target='_blank' rel='noopener noreferrer'>
                  Edit
               </Link>
            </div>
            <div className={classes.hk_admin_category_property}>
               {propTags.map((prop) => (
                  <p key={prop.id}>
                     {prop.nameEn}
                     <img onClick={() => deleteProperty(prop)} src='/x.svg' alt='x' />
                  </p>
               ))}
            </div>
            <div className={classes.hk_admin_category_add_property_box_add}>
               <Image src={Plus} alt={'plus image'} />
               <FormControl fullWidth>
                  <Select
                     value={selectedValue}
                     onChange={(e) => setSelectedValue(e.target.value)}
                     className={classes.hk_admin_category_custom_styles}
                     labelId='demo-simple-select-label'
                     id='demo-simple-select'
                  >
                     {properties.map((prop) => (
                        <MenuItem key={prop.id} value={prop.id} onClick={() => addProperties(prop)}>
                           {prop.nameEn}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
         </div>
         <div className={classes.hk_admin_category_last_box}>
            <MainButton onClick={createCategory} text={'Add new category'} width={'218px'} fontSize={'16px'} />
            <MainButton text={'Cancel'} width={'133px'} fontSize={'16px'} />
         </div>
      </section>
   )
}
export default CreateOrEditCategory
