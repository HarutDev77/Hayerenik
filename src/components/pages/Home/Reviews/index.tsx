import React from 'react';
import Image from "next/image";
import {FormattedMessage} from "react-intl";

import {BUBBLES_LEFT, BUBBLES_RIGHT, REVIEWS_IMAGES} from "@/constants";
import startsImage from "@/assets/images/stars.svg";
import greenFishImg from "@/assets/images/grinFish.svg";
import yellowFishImg from "@/assets/images/yellowFishsvg.svg"
import classes from "./Reviews.module.scss";


const SectionReviews = () => {
    return (
        <section className={classes.hk_home_section_review}>
            {REVIEWS_IMAGES.map((img, index) => (
                <Image
                    key={index}
                    className={img.className.map(className => classes[className]).join(' ')}
                    src={img.img}
                    alt={"image Puzzles"}
                    priority={true}
                />
            ))}

            <div className={classes.hk_home_section_review_under_water_container_top}>
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p><FormattedMessage id={'review1'} /></p>
                </div>
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p><FormattedMessage id={'review2'} /></p>
                </div>
                <Image
                    src={greenFishImg}
                    alt={"fish image"}
                    priority={true}
                    className={classes.hk_home_section_review_green_fish}
                />
                {BUBBLES_RIGHT.map((bubble,index)=>(
                        <Image
                            key={index}
                            src={bubble.img}
                            alt="bubbles image"
                            priority={true}
                            className={bubble.className.map(className => classes[className]).join(' ')}
                        />
                    )
                )}
            </div>
            <div className={classes.hk_home_section_review_under_water_container_bottom}>
                <Image
                    src={yellowFishImg}
                    alt={"fish image"}
                    priority={true}
                    className={classes.hk_home_section_review_yellow_fish}
                />
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p><FormattedMessage id={'review3'} /></p>
                </div>
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p><FormattedMessage id={'review4'} /></p>
                </div>

                {BUBBLES_LEFT.map((bubble,index)=>(
                        <Image
                            key={index}
                            src={bubble.img}
                            alt="bubbles image"
                            priority={true}
                            className={bubble.className.map(className => classes[className]).join(' ')}
                        />
                    )
                )}
            </div>
        </section>
    );
};

export default SectionReviews;