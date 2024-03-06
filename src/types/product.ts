import { ProductProperty } from '@/types/product-property';
import { SubProduct } from '@/types/sub-product';

export interface Product {
   id: number;
   categoryId: number;
   price: number;
   qty: number;
   titleEn: string;
   titleAm?: string;
   descriptionEn?: string;
   descriptionAm?: string;
   shortDescriptionEn: string;
   shortDescriptionAm?: string;
   metaTitle?: string;
   metaDescription?: string;
   isHidden: boolean;
   isTop: boolean;
   isBestseller: boolean;
   age: number;
   images?: string[];
   subProducts?: SubProduct[];
   productProperties?: ProductProperty[];
}
