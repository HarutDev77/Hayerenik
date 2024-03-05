import pencil from '@/assets/images/pencil.svg'
import pens from '@/assets/images/pens.svg'
import book from '@/assets/images/book.svg'
import bookLion from '@/assets/images/bookLion.svg'
import pen from '@/assets/images/pen.svg'
import imagePuzzles from '@/assets/images/puzzles.svg'
import imageSea from '@/assets/images/sea_image.svg'
import waveTop from '@/assets/images/waveTop.svg'
import waveBottom from '@/assets/images/waveBottom.svg'
import boatImag from '@/assets/images/boat.svg'
import sandImg from '@/assets/images/sandImage.svg'
import anchor from '@/assets/images/anchor.svg'
import imageBooks from '@/assets/images/booksjpg.jpg'
import imageKub from '@/assets/images/kub.jpg'
import imageStationary from '@/assets/images/stationary.jpg'
import bigBubble from '@/assets/images/bigBubble.svg'
import middleBubble from '@/assets/images/middleBubble.svg'
import smallBubble from '@/assets/images/smallBubble.svg'
import redSquare from '@/assets/images/redSquare.svg'
import blueSquare from '@/assets/images/blueSquare.svg'
import circleImg from '@/assets/images/circleImg.svg'

export const CHOSE_ITEMS = [
   {
      id: Math.random(),
      imageUrl: bookLion,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 35,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: pen,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 35,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: pens,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 27,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: pen,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 11,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: pens,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 35,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: bookLion,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 31,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: pencil,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 26,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
   {
      id: Math.random(),
      imageUrl: book,
      title: 'Pilot - Pen FriXion LX',
      amount: 1,
      price: 42,
      totalPrice: function () {
         return this.amount * this.price
      },
   },
]

export const REVIEWS_IMAGES = [
   {
      img: imagePuzzles,
      className: ['hk_home_section_review_puzzles_img'],
   },
   // {
   //    img: imageSea,
   //    className: ['hk_home_section_review_sea_img'],
   // },
   // {
   //    img: waveTop,
   //    className: ['hk_home_section_review_waveTop_img'],
   // },
   // {
   //    img: waveBottom,
   //    className: ['hk_home_section_review_waveBottom_img'],
   // },
   {
      img: boatImag,
      className: ['hk_home_section_review_boat_img'],
   },
   {
      img: anchor,
      className: ['hk_home_section_review_cable_img'],
   },
   // {
   //    img: sandImg,
   //    className: ['hk_home_section_review_sandImg_img'],
   // },
]

export const BUBBLES_RIGHT = [
   {
      img: bigBubble,
      className: ['hk_home_section_review_bigBubbleImg_img'],
   },
   {
      img: middleBubble,
      className: ['hk_home_section_review_middleBubbleImg_img'],
   },
   {
      img: smallBubble,
      className: ['hk_home_section_review_smallBubbleImg_img'],
   },
]

export const BUBBLES_LEFT = [
   {
      img: bigBubble,
      className: [
         'hk_home_section_review_bigBubbleImg_img',
         'hk_home_section_review_bigBubbleImgLeft_img',
      ],
   },
   {
      img: middleBubble,
      className: [
         'hk_home_section_review_middleBubbleImg_img',
         'hk_home_section_review_middleBubbleImgLeft_img',
      ],
   },
   {
      img: smallBubble,
      className: [
         'hk_home_section_review_smallBubbleImg_img',
         'hk_home_section_review_smallBubbleImgLeft_img',
      ],
   },
]

export const PUZZLES = [
   {
      id: 1,
      color: 'red',
      src: imageBooks,
      title: 'Books',
   },
   {
      id: 2,
      color: 'yellow',
      src: imageKub,
      title: 'Games',
   },
   {
      id: 3,
      color: 'green',
      src: imageStationary,
      title: 'Stationary',
   },
]

export const AGES = [
   {
      title: '0+',
      src: redSquare,
   },
   {
      title: '1',
      src: circleImg,
   },
   {
      title: '2',
      src: blueSquare,
   },
   {
      title: '3',
      src: redSquare,
   },
   {
      title: '4',
      src: circleImg,
   },
   {
      title: '5',
      src: blueSquare,
   },
   {
      title: '6',
      src: redSquare,
   },
   {
      title: '7',
      src: circleImg,
   },
   {
      title: '8+',
      src: blueSquare,
   },
]

export interface IAllItems {
   id: number
   title: string
   description: string
   price: number
   imageUrl: string
   images?: string[]
   properties?: IProperty[]
   subProducts?: ISubProduct[]
}

export type IProperty = {
   name: string
   value: string
}

export type ISubProduct = {
   id: number
   title: string
   price: number
   imageUrl: string
}

export const ALL_ITEMS: IAllItems[] = [
   {
      id: 1,
      imageUrl: pencil,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 35,
      images: [pencil, pen, bookLion, pencil, bookLion, pens],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pencil,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pens,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: pen,
         },
      ],
   },
   {
      id: 2,
      imageUrl: pens,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 25,
      images: [pencil, pen, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pens,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: bookLion,
         },
      ],
   },
   {
      id: 3,
      imageUrl: book,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 17,
      images: [pencil, pen, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: bookLion,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: book,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: pen,
         },
      ],
   },
   {
      id: 4,
      imageUrl: bookLion,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 16,
      images: [pencil, pen, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: bookLion,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: book,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: pens,
         },
      ],
   },
   {
      id: 5,
      imageUrl: pen,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 21,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pencil,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: book,
         },
      ],
   },
   {
      id: 6,
      imageUrl: pencil,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 30,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pencil,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: pens,
         },
      ],
   },
   {
      id: 7,
      imageUrl: pens,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 14,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pens,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: book,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: bookLion,
         },
      ],
   },
   {
      id: 8,
      imageUrl: book,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 24,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: book,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: book,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: book,
         },
      ],
   },
   {
      id: 9,
      imageUrl: bookLion,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 27,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: bookLion,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: bookLion,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: book,
         },
      ],
   },
   {
      id: 10,
      imageUrl: pen,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 20,
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pencil,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: pens,
         },
      ],
   },
   {
      id: 11,
      imageUrl: pencil,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 18,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: 'Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pencil,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: book,
         },
      ],
   },
   {
      id: 12,
      imageUrl: pens,
      title: 'Pilot - Pen FriXion LX',
      description:
         'Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.',
      price: 16,
      images: [pencil, book, bookLion],
      properties: [
         {
            name: ' Extent',
            value: '24 pages',
         },
         {
            name: 'Dimensions',
            value: '150 x 150mm',
         },
         {
            name: 'Board ISBN',
            value: '9781805311980',
         },
         {
            name: 'Work Reference',
            value: '9248',
         },
         {
            name: 'Publication Date',
            value: 'September 2023',
         },
      ],
      subProducts: [
         {
            id: Math.random(),
            title: 'work book 1',
            price: 7,
            imageUrl: pens,
         },
         {
            id: Math.random(),
            title: 'work book 2',
            price: 5,
            imageUrl: pen,
         },
         {
            id: Math.random(),
            title: 'work book 3',
            price: 2,
            imageUrl: book,
         },
      ],
   },
]

export const PAGINATION_LIMIT = 10
export const PRODUCT_LIST_ITEMS_LIMIT = 12
export const INPUT_DEBOUNCE_DELAY = 500
export const AGE_OPTIONS = [1, 2, 3, 4, 5, 6]
export const MOBILE_SCREEN_SIZE = 768
