import axiosRequest from '@/api/axiosRequest'
import { AxiosResponse } from 'axios'
import { ICategoryData, ICategoryForm } from '@/types/admin'

export default class QueryApi {
   static async createCategoryPageData(url: string | ''): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.get(url)
      return response.data
   }

   static async saveCategory(categoryForm: ICategoryForm, id: number | undefined | string): Promise<boolean> {
      let method = 'post'
      let url = 'admin/category'

      if (id) {
         method = 'put'
         url += `/${id}`
      }

      await axiosRequest[method](url, { ...categoryForm })
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

   static async getProducts(): Promise<AxiosResponse<any>> {
      const response = await axiosRequest.post('admin/product/all', {
         body: {
            categoryId: null,
         },
      })
      return response.data
   }
}
