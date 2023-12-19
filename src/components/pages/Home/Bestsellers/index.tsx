import {BESTSELLERS_ITEMS} from "@/constants";
import ProductItem from "@/components/Parts/ProductItem";
import classes from "./Bestsellers.module.scss"
const SectionBestsellers = () => {
    return (
        <section className={classes.hk_home_section_bestsellers}>
            <div>
                <h2 className={classes.hk_home_section_bestsellers_title}>Bestsellers</h2>
                <div className={classes.hk_home_section_bestsellers_items_container}>
                    {BESTSELLERS_ITEMS.map(item =>
                        (
                            <ProductItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                            />
                        )
                    )}
                </div>

            </div>
        </section>
    );
};

export default SectionBestsellers;