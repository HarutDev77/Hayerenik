import { axiosFront } from '@/api/axiosFront';
import { CartProduct, CheckoutInfoData, Product } from '@/types/product';
import { Category, TopCategory } from '@/types/category';
import { ProductView } from '@/types/product-view';
import { Bestseller } from '@/types/bestseller';

export default class UserApi {
   static async searchProducts(
      searchTerm: string,
      page: number = 1,
      limit: number = 10,
   ): Promise<{ rows: Product[]; count: number }> {
      return (await axiosFront.get(`product/search/${searchTerm}?limit=${limit}&page=${page}`)) as {
         rows: Product[];
         count: number;
      };
   }

   static async getBestsellers(): Promise<Bestseller[]> {
      return (await axiosFront.get(`/product/bestsellers`)) as Bestseller[];
   }

   static async getCategories(): Promise<Category[]> {
      return (await axiosFront.get('category/tree')) as Category[];
   }

   static async getViewPageData(id: number): Promise<ProductView> {
      return (await axiosFront.get(`product/view/${id}`)) as ProductView;
   }

   static async getTopCategories(limit?: number): Promise<TopCategory[]> {
      return (await axiosFront.get(`category/top/${limit || ''}`)) as TopCategory[];
   }

   static async getProductsByIds(ids: number[]): Promise<{ count: number; rows: CartProduct[] }> {
      return (await axiosFront.post('product/by-ids', { limit: 1000, productsIds: ids })) as {
         count: number;
         rows: CartProduct[];
      };
   }

   static async goToCheckout(
      data: { productId: number; qty: number }[],
   ): Promise<CheckoutInfoData> {
      return await axiosFront.post('basket/to-checkout', { basketItems: data });
   }
}
