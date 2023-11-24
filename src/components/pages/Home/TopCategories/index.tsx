import classes from "./TopCategories.module.scss";
import imageBooks from "@/assets/images/booksjpg.jpg";
import imageKub from "@/assets/images/kub.jpg";
import imageStationary from "@/assets/images/stationary.jpg"
import {useState} from "react";
import BigPuzzle from "@/components/pages/Home/TopCategories/BigPuzzle";
const SectionTopCategories = () => {

    const [showImage1,setShowImage1] = useState(false);
    const [showImage2,setShowImage2] = useState(false);
    const [showImage3,setShowImage3] = useState(false);

    const handleMouseEnter = (num: number) => {

        if(num === 1){
            setShowImage1(true);

        } else if(num === 2){
            setShowImage2(true);
        }else{
            setShowImage3(true);
        }
    }

    const handleMouseLeave = (num: number) => {
        if(num === 1){
            setShowImage1(false);

        } else if(num === 2){
            setShowImage2(false);
        }else{
            setShowImage3(false);
        }
    }

    return (
        <section className={classes.hk_home_section_top_categories}>
            <div>
                <h2>Top categories</h2>
            </div>
            <div className={classes.hk_home_section_top_categories_box}>
                <BigPuzzle
                    color={"red"}
                    src={imageBooks}
                    title={"Books"}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    isShow={showImage1}
                    id={1}
                />

                <BigPuzzle
                    color={"yellow"}
                    src={imageKub}
                    title={"Games"}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    isShow={showImage2}
                    id={2}
                />

                <BigPuzzle
                    color={"green"}
                    src={imageStationary}
                    title={"Stationary"}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    isShow={showImage3}
                    id={3}
                />
            </div>
        </section>
    );
};

export default SectionTopCategories;