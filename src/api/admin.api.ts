import axiosRequest from '@/api/axiosRequest'
import { AxiosResponse } from 'axios'

export default class AdminApi {
   static async getProperties(): Promise<any> {
      const response = await axiosRequest.get('admin/property')
      return response.data.resData
   }

   static async getPropertyById(id: number): Promise<any> {
      const response = await axiosRequest.get(`admin/property/edit-page-data/${id}`)
      return response.data.resData
   }

   static async createProperty(data: any): Promise<any> {
      return await axiosRequest.post('admin/property', data)
   }

   static async editProperty(data: any): Promise<any> {
      console.log(data)
      return await axiosRequest.put(`admin/property/${data.id}`, data.data)
   }

   static async deleteProperty(id: number): Promise<any> {
      return await axiosRequest.delete(`admin/property/${id}`)
   }

   // products

   static async manageProduct(data: any, id?: number | null): Promise<any> {
      const url = id ? `admin/product/${id}` : `admin/product`

      if (id){
         return await axiosRequest.put(url, data)
      } else {
         return await axiosRequest.post(url, data)
      }
   }

   static async getProductsDataForCreate(url: string | undefined): Promise<any> {
      const response = await axiosRequest.get(url as string)
      return response.data.resData
   }
   static async getProductsCategoryData(id: number): Promise<any> {
      const response = await axiosRequest.get(`admin/property/by-category-id/${id}`)
      return response.data.resData
   }
}
