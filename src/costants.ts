import pencil from "@/assets/images/pencil.svg";
import pens from "@/assets/images/pens.svg";
import book from '@/assets/images/book.svg';
import bookLion from '@/assets/images/bookLion.svg';
import pen from '@/assets/images/pen.svg';
import imagePuzzles from "@/assets/images/puzzles.svg";
import imageSea from "@/assets/images/sea_image.svg"
import waveTop from "@/assets/images/waveTop.svg";
import waveBottom from "@/assets/images/waveBottom.svg";
import boatImag from "@/assets/images/boat.svg";
import sandImg from "@/assets/images/sandImage.svg"
import anchor from "@/assets/images/anchor.svg";
import imageBooks from "@/assets/images/booksjpg.jpg";
import imageKub from "@/assets/images/kub.jpg";
import imageStationary from "@/assets/images/stationary.jpg";

export const BESTSELLERS_ITEMS = [
    {
        id: Math.random(),
        imageUrl: pencil,
        title: 'Pilot - Pen FriXion LX',
        description: "Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.",
        price: 355
    },
    {
        id: Math.random(),
        imageUrl: pens,
        title: 'Pilot - Pen FriXion LX',
        description: "Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.",
        price: 355
    },
    {
        id: Math.random(),
        imageUrl: book,
        title: 'Pilot - Pen FriXion LX',
        description: "Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.",
        price: 355
    },
    {
        id: Math.random(),
        imageUrl: bookLion,
        title: 'Pilot - Pen FriXion LX',
        description: "Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.",
        price: 355
    },
    {
        id: Math.random(),
        imageUrl: pen,
        title: 'Pilot - Pen FriXion LX',
        description: "Pilot Frixion LX with metal body and the erasable Frixion-ink. Comes with blue ink. Eraser tip under the top cap.",
        price: 355
    },
]

export const REVIEWS_IMAGES = [
    {
        img: imagePuzzles,
        className: 'hk_home_section_review_puzzles_img'
    },
    {
        img: imageSea,
        className: 'hk_home_section_review_sea_img'
    },
    {
        img: waveTop,
        className: 'hk_home_section_review_waveTop_img'
    },
    {
        img: waveBottom,
        className: 'hk_home_section_review_waveBottom_img'
    },
    {
        img: boatImag,
        className: 'hk_home_section_review_boat_img'
    },
    {
        img: anchor,
        className: 'hk_home_section_review_cable_img'
    },
    {
        img: sandImg,
        className: 'hk_home_section_review_sandImg_img'
    },
]

export const PUZZLES = [
    {
        id: 1,
        color: 'red',
        src: imageBooks,
        title: "Books"
    },
    {
        id: 2,
        color: 'yellow',
        src: imageKub,
        title: "Games"
    },
    {
        id: 3,
        color: 'green',
        src: imageStationary,
        title: "Stationary"
    }
]