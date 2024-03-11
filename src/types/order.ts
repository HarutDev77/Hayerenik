export type OrderItem = {
   id: number;
   imageUrl: string;
   title: string;
   amount: number;
   price: number;
   totalPrice: () => number;
   delivery?: number;
};
