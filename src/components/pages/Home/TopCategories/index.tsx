import {useState} from "react";
import {FormattedMessage} from "react-intl";

import BigPuzzle from "@/components/pages/Home/TopCategories/BigPuzzle";
import {PUZZLES} from "@/constants";

import classes from "./TopCategories.module.scss";


const SectionTopCategories = () => {

    const [selectedImgId, setSelectedImgId] = useState<number>();

    const handleMouseEnter = (num: number) => {
        setSelectedImgId(num)
    }

    const handleMouseLeave = () => {
        setSelectedImgId(undefined)
    }

    return (
        <section className={classes.hk_home_section_top_categories}>
            <div>
                <h2><FormattedMessage id={'topCategories'} /></h2>
            </div>
            <div className={classes.hk_home_section_top_categories_box}>
                {PUZZLES.map(puzzle => (
                    <BigPuzzle
                        key={puzzle.id}
                        color={puzzle.color}
                        src={puzzle.src}
                        title={puzzle.title}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        isShow={selectedImgId === puzzle.id}
                        id={puzzle.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default SectionTopCategories;