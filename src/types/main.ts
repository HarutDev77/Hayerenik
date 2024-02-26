export interface Breadcrumb {
   id: number
   titleEn: string
   titleAm: string
}

export interface Product {
   id: number
   categoryId: number
   price: number
   qty: number
   titleEn: string
   titleAm?: string
   descriptionEn?: string
   descriptionAm?: string
   shortDescriptionEn: string
   shortDescriptionAm?: string
   metaTitle?: string
   metaDescription?: string
   imageUrl?: string
   isHidden: boolean
   isTop: boolean
   isBestseller: boolean
   age: number
   createdAt?: Date
   updatedAt?: Date
}

export interface Category {
   id: number
   titleEn: string
   titleAm?: string
   parentId?: number
   metaTitle?: string
   metaDescription?: string
   isHidden: boolean
   isTop: boolean
   img?: string
}

export enum PropertyTypeEnum {
   numeric = 1,
   text = 2,
   list = 3,
}

export interface Products {
   count: number
   rows: Product[]
}

export interface ProductsList {
   status: number
   resData: {
      breadcrumbs: Breadcrumb[]
      subCategories: Category[]
      properties: PropertyData[]
      products: Products
   }
   message: string
}

export interface PriceRange {
   from?: number
   to?: number
}

export interface PropertyOption {
   valueEn: string
   valueAm?: string | null
}

export interface PropertyData {
   id: number
   nameEn: string
   nameAm?: string
   type: number
   propertyOptions: PropertyOption[]
}

export interface PropertyFilter {
   propertyId: number
   values: (number | string)[]
}

export interface FilterData {
   categoryId: number
   limit: number
   page: number
   priceRange?: PriceRange
   age?: number[]
   subCategories?: number[]
   propertyFilters?: PropertyFilter[]
}
export interface FilterState {
   fromPrice: number | null
   toPrice: number | null
   subcategories: number[]
   age: number[]
   propertyFilters: PropertyFilter[]
}

export interface FilteredData {
   status: number
   resData: {
      rows: Product[]
      count: number
   }
   message: string
}


