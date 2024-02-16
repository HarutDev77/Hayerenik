import axiosRequest from '@/api/axiosRequest'
import { AxiosResponse } from 'axios'
import { ICategoryData, ICategoryForm } from '@/types/admin'
import { PAGINATION_LIMIT } from '@/constants'

export default class QueryApi {
   static async createCategoryPageData(url: string | ''): Promise<any> {
      const response = await axiosRequest.get(url)
      return response.data
   }

   static async saveCategory(
      categoryForm: ICategoryForm,
      id: number | undefined | string,
   ): Promise<boolean> {
      let url = 'admin/category'

      if (id) {
         url += `/${id}`
      }

      if (id){
         await axiosRequest.put(url, { ...categoryForm })
      } else {
         await axiosRequest.post(url, { ...categoryForm })
      }

      return true
   }

   static async saveImage(formData: FormData): Promise<any> {
      const response = await axiosRequest.post('file/upload-image', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })

      return response.data
   }
   static async saveImages(formData: FormData): Promise<any> {
      const response = await axiosRequest.post('file/upload-images', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      return response.data
   }

   static async deleteImage(imageSrc: string): Promise<any> {
      const response = await axiosRequest.delete(`file`, {
         data: {
            src: imageSrc,
         },
      })
      return response.data
   }

   static async getCategories(): Promise<ICategoryData[]> {
      const response = await axiosRequest.get('admin/category')

      return response.data.resData
   }

   static async deleteCategory(url: string): Promise<any> {
      const response = await axiosRequest.delete(url)

      return response.data
   }

   static async getProducts(
      page = 1,
      categoryId: number | null = null,
      searchValue: string | null = null,
   ): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.post('admin/product/all', {
         parentCategoryId: categoryId,
         limit: PAGINATION_LIMIT,
         search: searchValue,
         page,
      })
      return response.data
   }

   static async deleteProduct(url: string): Promise<any> {
      const response = await axiosRequest.delete(url)

      return response.data
   }
}
