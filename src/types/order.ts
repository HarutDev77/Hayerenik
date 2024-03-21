export type OrderItem = {
   id: number;
   image: string;
   qty: number;
   price: number;
   totalPrice?: () => number;
   delivery?: number;
   titleAm?: string;
   titleEn: string;
};
