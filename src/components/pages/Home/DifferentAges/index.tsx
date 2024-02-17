import React from 'react';
import Image from "next/image";
import {FormattedMessage} from "react-intl";

import classes from './DifferentAges.module.scss';
import {AGES} from "@/constants";


const SectionDifferentAges = () => {
    return (
        <section className={classes.hk_home_section_different_ages}>
            <h3 className={classes.hk_home_section_different_ages_title}><FormattedMessage id={'differentAges'} /></h3>
            <div className={classes.hk_home_section_different_ages_container}>
                {
                    AGES.map((age,index)=>
                        (
                            <div className={classes.hk_home_section_different_ages_container_boxes} key={index}>
                                <h5 className={classes.hk_home_section_different_ages_container_boxes_titles}>{age.title}</h5>
                                <Image
                                    src={age.src}
                                    alt={"some image"}
                                    priority={true}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </section>
    );
};

export default SectionDifferentAges;