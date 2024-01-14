import axiosRequest from '@/api/axiosRequest'
import { AxiosResponse } from 'axios'
import { ICategoryData, ICategoryForm } from '@/types/admin'

export default class QueryApi {
   static async createCategoryPageData(): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.get('admin/category/create-page-data')
      return response.data
   }

   static async saveCategory(categoryForm: ICategoryForm): Promise<boolean> {
      await axiosRequest.post('admin/category', { ...categoryForm })
      return true
   }

   static async saveImage(formData): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.post('file/upload-image', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })

      return response.data
   }

   static async getCategories(): Promise<ICategoryData[]> {
      const response = await axiosRequest.get('admin/category')
      return response.data.resData
   }

   static async deleteCategory(url): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.delete(url)

      return response.data
   }
}
