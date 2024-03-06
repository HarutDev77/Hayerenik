export enum ModeEnum {
   edit = 'edit',
   create = 'create',
}

export enum FolderEnum {
   category = 'category',
   product = 'product',
}

export enum PropertyTypeEnum {
   numeric = 1,
   text = 2,
   list = 3,
}

export enum OrderPaymentStatusEnum {
   pending = 0,
   failed = 1,
   success = 2,
}

export enum OrderDeliveryStatusEnum {
   new = 0,
   ongoing = 1,
   delivered = 2,
   canceled = 3,
}
export enum ROUTES {
   HOME = '/',
   ALL = '/all', // Change with existing route
   CART = '/cart',
   PRODUCT = '/product',
   LIST_DATA = '/list-data',
   CONTACTS = '/contacts',
}

export enum LANGUAGES {
   ENGLISH = 'en',
   ARMENIAN = 'am',
}

export enum SiteLanguageEnum {
   en = 'en',
   am = 'am',
}
