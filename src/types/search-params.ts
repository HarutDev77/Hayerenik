import { Product } from '@/types/product';
import { PaginationInterface } from '@/interfaces/pagination-interface';

export type SearchParams = {
   productsData: PaginationInterface<Product>;
   term: string;
   page: number;
   limit: number;
};
