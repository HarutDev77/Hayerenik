import Image from "next/image";
import classes from "./SectionHeader.module.scss";
import headerImage from "@/assets/images/headerbackgruondimage.svg";
import Cloud from "@/assets/images/cloud1.svg";

const SectionHeader = () => {
    return (

        <section className={classes.hk_home_section_header}>
            <div className={classes.hk_home_section_header_content}>
                <div>
                    <h1>Best for our children</h1>
                    <p>
                        HAYERENIK is your one-stop shop for children aged 2 to 10. We offer a curated selection of books,
                        bags, games, handmade toys, art supplies, and more.
                    </p>
                    <div>
                        <button>Explore now</button>
                    </div>
                </div>
                <Image
                    src={Cloud}
                    alt="Cloud"
                    priority={true}
                    className={classes.hk_home_section_header_content_cloud_left}
                />
                <Image
                    src={Cloud}
                    alt="Cloud"
                    priority={true}
                    className={classes.hk_home_section_header_content_cloud_top}
                />
                <Image
                    src={Cloud}
                    alt="Cloud"
                    priority={true}
                    className={classes.hk_home_section_header_content_cloud_bottom}
                />
                <Image
                    src={Cloud}
                    alt="Cloud"
                    priority={true}
                    className={classes.hk_home_section_header_content_cloud_right_top}
                />
                <Image
                    src={Cloud}
                    alt="Cloud"
                    priority={true}
                    className={classes.hk_home_section_header_content_cloud_right}
                />
            </div>
            <div className={classes.hk_home_section_header_img_wrapper}>
                <Image
                    src={headerImage}
                    alt="Ararat image"
                    className={classes.hk_home_section_header_img_wrapper_image}
                    priority={true}
                />
            </div>

        </section>

    )
}

export default SectionHeader;