import { axiosFront } from '@/api/axiosFront';
import { Product } from '@/types/product';
import { Category, TopCategory } from '@/types/category';
import { ProductView } from '@/types/product-view';
import { Bestseller } from '@/types/bestseller';
import TopCategories from '@/components/pages/Home/TopCategories';

export default class UserApi {
   static async searchProducts(
      searchTerm: string,
      page: number = 1,
      limit: number = 10,
   ): Promise<{ rows: Product[]; count: number }> {
      return axiosFront.get(`product/search/${searchTerm}?limit=${limit}&page=${page}`);
   }

   static async getBestsellers(): Promise<Bestseller[]> {
      return axiosFront.get(`/product/bestsellers`);
   }

   static async getCategories(): Promise<Category[]> {
      return axiosFront.get('category/tree');
   }

   static async getViewPageData(id: number): Promise<ProductView> {
      return axiosFront.get(`product/view/${id}`);
   }

   static async getTopCategories(limit?: number): Promise<TopCategory[]> {
      return axiosFront.get(`category/top/${limit || ''}`);
   }
}
