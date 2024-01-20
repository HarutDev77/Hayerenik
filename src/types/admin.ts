export interface ILoginData {
   email: string
   password: string
}

export interface ICategoryForm {
   parentId?: number | null
   titleEn: string
   titleAm?: string | null
   metaTitle?: string | null
   metaDescription?: string | null
   isHidden?: boolean
   isTop?: boolean
   img?: string | null
   propertiesIds?: number[]
}
export interface ICategoryData {
   id: number
   titleEn: string
   titleAm: string
   subCategories: ICategoryData[]
}
