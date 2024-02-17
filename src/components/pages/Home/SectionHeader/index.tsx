import Image from "next/image";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import classes from "./SectionHeader.module.scss";
import headerImage from "@/assets/images/headerbackgruondimage.svg";
import Cloud from "@/assets/images/cloud1.svg";

const SectionHeader = () => {
    const router = useRouter();
    const { locale } = router;

    return (

        <section className={classes.hk_home_section_header}>
            <div className={classes.hk_home_section_header_content}>
                <div>
                    <h1 style={{ width: locale === 'am' ? '700px' : 'auto'  }}><FormattedMessage id={'bestForChild'} /></h1>
                    <p><FormattedMessage id={'hayerenikIs'} /></p>
                    <div>
                        <button><FormattedMessage id={'exploreNow'} /></button>
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