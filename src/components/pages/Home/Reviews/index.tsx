import React from 'react';
import Image from "next/image";
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
                    <p>
                        {
                            `I can't say enough good things about this children's goods company. Their range of educational
                            games is fantastic, and my kids are always excited to learn while playing. The books they offer
                            are not only entertaining but also educational, making it easy to keep my children engaged in
                            reading. A wonderful resource for parents and a delight for kids!`
                        }
                    </p>
                </div>
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p>
                        {
                            `I've been shopping with this company for a while now, and I'm consistently impressed with their
                            commitment to quality and education. Their selection of stationery items is perfect for school
                            projects and creative activities. The customer service is exceptional, making every shopping
                            experience a pleasure. I'm grateful to have such a reliable source for my children's learning
                            and play needs.`
                        }
                    </p>
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
                    <p>
                        {
                            `As a teacher, I rely on this company for quality educational materials. Their selection of
                            books, stationery, and intellectual games is unparalleled. The kids in my classroom absolutely
                            love the games, and the stationery items are perfect for keeping them organized. I appreciate
                            the quick and efficient service, making it easy for me to provide engaging learning experiences
                            for my students.`
                        }
                    </p>
                </div>
                <div>
                    <Image
                        src={startsImage}
                        alt="stars image"
                        priority={true}
                    />
                    <p>
                        {
                            `"Fantastic for parents and educators! I've found the best children's books and educational games here. They make learning enjoyable, and my children are always excited to explore their products. The stationery collection is also a hit in our house for schoolwork and art projects. I appreciate the company's dedication to providing educational resources that engage and inspire kids.`
                        }

                    </p>
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