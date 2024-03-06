export interface Bestseller {
   id: number;
   price: number;
   qty: number;
   titleEn: string;
   titleAm?: string;
   shortDescriptionEn: string;
   shortDescriptionAm?: string;
   image?: string;
}
