import ProductItem from "@/components/Parts/ProductItem";
import classes from "./Bestsellers.module.scss"
import Link from "next/link";
import {ALL_ITEMS} from "@/constants";
const SectionBestsellers = () => {

    const BESTSELLERS_ITEMS = ALL_ITEMS.filter((item,index)=>index < 5);


    return (
        <section className={classes.hk_home_section_bestsellers}>
            <div>
                <h2 className={classes.hk_home_section_bestsellers_title}>Bestsellers</h2>
                <div className={classes.hk_home_section_bestsellers_items_container}>
                    {BESTSELLERS_ITEMS.map(item =>
                        (
                            <Link style={{textDecoration: "none", color: "black"}} key={item.id} href={`/items/${item.id}`}>
                                <ProductItem
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                />
                            </Link>
                        )
                    )}
                </div>

            </div>
        </section>
    );
};

export default SectionBestsellers;