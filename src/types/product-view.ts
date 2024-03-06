import { Breadcrumb } from '@/types/breadcrumb';
import { Product } from '@/types/product';
import { Bestseller } from '@/types/bestseller';

export type ProductView = {
   product: Product;
   bestsellers: Bestseller[];
   breadcrumbs: Breadcrumb[];
};
