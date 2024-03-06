export interface CategoryForm {
   parentId?: number | null;
   titleEn: string;
   titleAm?: string | null;
   metaTitle?: string | null;
   metaDescription?: string | null;
   isHidden?: boolean;
   isTop?: boolean;
   img?: string | null;
   propertiesIds?: number[];
}
