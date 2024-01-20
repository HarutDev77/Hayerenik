import { Input, Select as AntSelect, Spin, Switch } from 'antd'
import Image from 'next/image'
import AddImage from '@/assets/images/icon_image_plus_.svg'
import { FC, useState } from 'react'
import deleteButton from '@/assets/images/delete_foto.svg'
import Link from 'next/link'
import Plus from '@/assets/images/plusImg.svg'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import MainButton from '@/components/Parts/MainButton'
import QueryApi from '@/api/query.api'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { FolderEnum, ModeEnum } from '@/enums/common'
import { BACKEND_IMAGES_URL } from '@/constants/config'
import { ICategoryForm } from '@/types/admin'
import classes from './ManageCategory.module.scss'

const ManageCategory: FC = () => {
   const [categories, setCategories] = useState([])
   const router = useRouter()
   const { id, mode } = router.query
   const [properties, setProperties] = useState([])
   const [selectedValue, setSelectedValue] = useState<number | null>(null)
   const [selectedValueProps, setSelectedValueProps] = useState<any>('')
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
   const [propTags, setPropTags] = useState([])
   const [showRequired, setShowRequired] = useState<boolean>(false)

   useQuery(
      'manageCategoryPageData',
      () => {
         return QueryApi.createCategoryPageData(mode === ModeEnum.create ? 'admin/category/create-page-data' : id ? `admin/category/edit-page-data/${id}` : '')
      },
      {
         onSuccess: (data) => {
            if (mode === ModeEnum.create) {
               setCategories(data.resData.categories)
               setProperties(data.resData.properties)
            } else {
               const selectedIds = [...data.resData.category.properties.map((item) => item.id)]
               setCategories(data.resData.categories.filter((category) => category.id !== data?.resData?.category.id))
               setProperties(data.resData.properties.filter((item) => !selectedIds.includes(item.id)))
               setCategoryForm({
                  parentId: data ? data.resData.category.parentId : null,
                  titleEn: data ? data.resData.category.titleEn : '',
                  titleAm: data ? data.resData.category.titleAm : null,
                  metaTitle: data ? data.resData.category.metaTitle : null,
                  metaDescription: data ? data.resData.category.metaDescription : null,
                  isHidden: data ? data.resData.category.isHidden : false,
                  isTop: data ? data.resData.category.isTop : false,
                  img: data ? data?.resData.category.img : null,
                  propertiesIds: data ? selectedIds : [],
               })
               setSelectedValue(data?.resData?.category?.parentId)
               setPropTags(data.resData.category.properties)
            }
         },
         enabled: !!id || mode === ModeEnum.create,
      },
   )

   const { mutate } = useMutation(
      (categoryForm: ICategoryForm) => {
         return QueryApi.saveCategory(categoryForm, id)
      },
      {
         onSuccess: () => {
            // toast.success(mode === ModeEnum.create ? 'Success! Category created' : 'Success! Category edited')
            setCategoryForm({ parentId: null, titleEn: '', titleAm: null, metaTitle: null, metaDescription: null, isHidden: false, isTop: false, img: null, propertiesIds: [] })
            setSelectedValue(null)
            router.push('/admin/category').catch(() => {})
         },
      },
   )

   const { mutate: mutateImage, isLoading: loader } = useMutation(
      (formData) => {
         return QueryApi.saveImage(formData)
      },
      {
         onSuccess: (data) => {
            setCategoryForm({ ...categoryForm, img: data['resData'].path })
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

      const formData = new FormData() as any

      formData.append('image', file)
      formData.append('folder', FolderEnum.category)

      mutateImage(formData)
   }

   const changeTitle = (e) => {
      const { name, value } = e.target
      setCategoryForm({ ...categoryForm, [name]: value })
      setShowRequired(false)
   }

   const handleChange = (event) => {
      setSelectedValue(event.target.value)
      setCategoryForm({ ...categoryForm, parentId: event.target.value })
   }

   const deleteProperty = (prop) => {
      const id = prop.id
      const newProperties = propTags.filter((property) => property.id !== id)
      setPropTags([...newProperties])

      const newPropertiesIds = Array.isArray(categoryForm) ? categoryForm.propertiesIds.filter((property) => property !== id) : []

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
      setShowRequired(true)
   }

   // noinspection TypeScriptValidateTypes
   return (
      <section className={classes.hk_admin_category}>
         <h1>{ModeEnum.create === mode ? 'Adding a new category' : 'Editing a category'}</h1>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>
                  Category name <span>*</span>
               </h3>
               <Input
                  style={showRequired ? { border: '2px solid red' } : {}}
                  rules={[{ required: true }]}
                  value={categoryForm.titleEn}
                  name={'titleEn'}
                  placeholder='Category name'
                  onChange={(e) => changeTitle(e)}
               />
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
               <Switch checked={categoryForm.isHidden} onChange={toggleParentCategory} />
            </div>
         </div>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Կատեգորիայի անունը</h3>
               <Input placeholder='Կատեգորիայի անունը' name={'titleAm'} value={categoryForm.titleAm} onChange={(e) => changeTitle(e)} />
            </div>
            <div className={classes.hk_admin_category_name_box_switch_top}>
               <h3>Top</h3>
               <Switch checked={categoryForm.isTop} onChange={onChange} />
            </div>
         </div>
         <div className={classes.hk_admin_category_name_box}>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Meta Title</h3>
               <Input placeholder='Title' name={'metaTitle'} value={categoryForm.metaTitle} onChange={(e) => changeTitle(e)} />
            </div>
            <div className={classes.hk_admin_category_name_box_input_container}>
               <h3>Meta description</h3>
               <Input name={'metaDescription'} value={categoryForm.metaDescription} onChange={(e) => changeTitle(e)} placeholder='Description' />
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
                     // eslint-disable-next-line @next/next/no-img-element
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
                     {prop['nameEn']}
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img onClick={() => deleteProperty(prop)} src='/x.svg' alt='x' />
                  </p>
               ))}
            </div>
            <div className={classes.hk_admin_category_add_property_box_add}>
               <Image src={Plus} alt={'plus image'} />
               <FormControl fullWidth>
                  <InputLabel id='select-label'>Select an Option</InputLabel>
                  <Select
                     value={selectedValueProps}
                     onChange={(e) => setSelectedValueProps(e.target.value)}
                     className={classes.hk_admin_category_custom_styles}
                     labelId='demo-simple-select-label'
                     id='demo-simple-select'
                  >
                     {properties.map((prop) => (
                        <MenuItem key={prop.id} value={prop.id} onClick={() => addProperties(prop)}>
                           {prop['nameEn']}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
         </div>
         <div className={classes.hk_admin_category_last_box}>
            {ModeEnum.create === mode ? (
               <MainButton onClick={createCategory} text={'Add new category'} width={'218px'} fontSize={'16px'} />
            ) : (
               <MainButton onClick={createCategory} text={'Save'} width={'118px'} fontSize={'16px'} />
            )}

            <Link href={'/admin/category'}>
               <MainButton text={'Cancel'} width={'133px'} fontSize={'16px'} />
            </Link>
            {/*<AntSelect defaultValue='lucy' style={{ width: 120 }} onChange={handleChange} options={[{ value: 'arman', label: 'test' }]} />*/}
         </div>
      </section>
   )
}
export default ManageCategory
