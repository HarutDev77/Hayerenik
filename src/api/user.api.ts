import { axiosFront } from '@/api/axiosFront'
import { AxiosResponse } from 'axios'
import { ICategoryData } from '@/types/admin'
import axiosRequest from '@/api/axiosRequest'

export default class UserApi {
   static async searchProducts(
      searchTerm: string,
      page: number = 1,
      limit: number = 10,
   ): Promise<AxiosResponse<{ rows: any[]; count: number }>> {
      return axiosFront.get(`product/search/${searchTerm}?limit=${limit}&page=${page}`)
   }

   static async getBestsellers(): Promise<AxiosResponse<any>> {
      return axiosFront.get(`/product/bestsellers`)
   }

   static async getCategories(): Promise<AxiosResponse<any>> {
      return axiosFront.get('category/tree')
   }
}
