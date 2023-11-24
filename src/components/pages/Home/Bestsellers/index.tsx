import classes from "./Bestsellers.module.scss"
import {BESTSELLERS_ITEMS} from "@/app/costants";
import Image from "next/image";
import MainButton from "@/components/Parts/MainButton";
const SectionBestsellers = () => {
    return (
        <section className={classes.hk_home_section_bestsellers}>
            <div>
                <h2 className={classes.hk_home_section_bestsellers_title}>Bestsellers</h2>
                <div className={classes.hk_home_section_bestsellers_items_container}>
                    {BESTSELLERS_ITEMS.map(item => {
                        return(
                            <div className={classes.hk_home_section_bestsellers_item_box} key={item.id}>
                                <div>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        priority={true}
                                    />
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{
                                        item.description.length < 72
                                            ? item.description
                                            : item.description.slice(0,73) + "..."
                                        }
                                    </p>
                                </div>
                                <div>
                                    <MainButton text={"Add to card"}/>
                                    <span>{"$" + item.price}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    );
};

export default SectionBestsellers;