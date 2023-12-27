import React, {ReactElement} from 'react';
import {useRouter} from "next/router";
import {ALL_ITEMS} from "@/constants";
import MainLayout from "@/layouts";
import Image from "next/image";
import ArrowImage from "@/assets/images/icon_arrow.svg"
import classes from "./ItemPage.module.scss"


const ItemPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const item = ALL_ITEMS.filter(item => item.id === +id)

    return (

        <main className={classes.hk_item_page_main_section}>
            <div className={classes.hk_item_page_main_section_route}>
                <span>All</span>
                <Image
                    src={ArrowImage}
                    alt="Arrow Image"
                    priority={true}
                />
                <span>Books</span>
            </div>
        </main>
    );
};

ItemPage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}

export default ItemPage;