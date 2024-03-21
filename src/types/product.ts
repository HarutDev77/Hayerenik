import { ProductProperty } from '@/types/product-property';
import { SubProduct } from '@/types/sub-product';

export type Product = {
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
};

export interface CartProduct {
   id: number;
   image: string;
   price: number;
   qty: number;
   titleAm?: string;
   titleEn: string;
}

export type CheckoutInfoData = {
   unavailableProducts: CheckoutInfoProduct[];
   needToRedirectToCheckout: Boolean;
};

export type CheckoutInfoProduct = {
   productId: number;
   productTitleEn: string;
   productTitleAm?: string;
   requestedQty: number;
   availableQty: number;
};
