export type Category = {
   id: number;
   titleEn: string;
   titleAm: string;
   subCategories: Category[];
};

export type TopCategory = Omit<Category, 'subCategories'> & { img: string };
