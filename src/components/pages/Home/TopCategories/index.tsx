import classes from "./TopCategories.module.scss";
import imageBooks from "../../../../../public/booksjpg.jpg";
import imageKub from "@/assets/images/kub.jpg";
import imageStationary from "@/assets/images/stationary.jpg"
import Image from "next/image";
import {useState} from "react";
import BigPuzzle from "@/components/pages/Home/TopCategories/BigPuzzle";
const SectionTopCategories = () => {

    const [showImage1,setShowImage1] = useState(false);
    const [showImage2,setShowImage2] = useState(false);
    const [showImage3,setShowImage3] = useState(false);

    const handleMouseEnter = (num) => {

        if(num === 1){
            setShowImage1(true);

        } else if(num === 2){
            setShowImage2(true);
        }else{
            setShowImage3(true);
        }
    }

    const handleMouseLeave = (num) => {
        if(num === 1){
            setShowImage1(false);

        } else if(num === 2){
            setShowImage2(false);
        }else{
            setShowImage3(false);
        }
    }

    // type DelayFunction = () => object;
    // const delay1s: DelayFunction = async ()  =>  {
    //     await setTimeout(() => {
    //         return {opacity: "1",transition: "0.6s"}
    //     },600)
    // }

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
                />
                {/*<div*/}
                {/*    id={"1"}*/}
                {/*    onMouseEnter={()=>handleMouseEnter(1)}*/}
                {/*    onMouseLeave={()=>handleMouseLeave(1)}*/}
                {/*    className={classes.hk_home_section_top_categories_box_content_box}*/}
                {/*>*/}
                {/*    {showImage1 ? null : <h3>Books</h3>}*/}

                {/*             <Image*/}
                {/*                 style={showImage1 ? {opacity: "1",transition: "0.2s" ,transitionDelay: "0.4s"} : {opacity: "0",transition: "0.4s"}}*/}
                {/*                src={imageBooks}*/}
                {/*                alt="books image"*/}
                {/*                priority={true}*/}
                {/*            />*/}

                {/*    <div*/}
                {/*        style={showImage1 ? { top: "0",transition: "all 0.4s ease",} : {opacity: "1",transition: "0.4s"}}*/}
                {/*        className={classes.hk_puzzle_1_red}>*/}
                {/*    </div>*/}
                {/*    <div className={classes.hk_puzzle_container}>*/}
                {/*        <div*/}
                {/*            style={showImage1 ? { left: "0",transition: "all 0.4s ease", } : {opacity: "1",transition: "0.4s"}}*/}
                {/*            className={classes.hk_puzzle_2_red}>*/}
                {/*        </div>*/}
                {/*        <div*/}
                {/*            style={showImage1 ? { right: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}*/}
                {/*            className={classes.hk_puzzle_3_white}>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        style={showImage1 ? { bottom: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}*/}
                {/*        className={classes.hk_puzzle_4_white}>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div
                    id={"2"}
                    onMouseEnter={()=>handleMouseEnter(2)}
                    onMouseLeave={()=>handleMouseLeave(2)}
                    className={`${classes.hk_home_section_top_categories_box_content_box} ${classes.yellow_container}`}
                >

                    {showImage2 ? null : <h3>Games</h3>}

                            <Image
                                style={showImage2 ? { opacity: "1",transition: "0.2s",transitionDelay: "0.4s" } : {opacity: "0",transition: "0.4s",}}
                                src={imageKub}
                                alt="Stationary image"
                                priority={true}
                            />

                    <div
                        style={showImage2 ? { top: "0",transition: "all 0.4s ease",} : {opacity: "1",transition: "0.4s"}}
                        className={`${classes.hk_puzzle_1_red} ${classes.hk_puzzle_1_yellow}`}></div>
                    <div

                        className={classes.hk_puzzle_container}>
                        <div
                            style={showImage2 ? { left: "0",transition: "all 0.4s ease", } : {opacity: "1",transition: "0.4s"}}
                            className={`${classes.hk_puzzle_2_red} ${classes.hk_puzzle_1_yellow}`}>
                        </div>
                        <div
                            style={showImage2 ? { right: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                            className={classes.hk_puzzle_3_white}>
                        </div>
                    </div>
                    <div
                        style={showImage2 ? { bottom: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                        className={classes.hk_puzzle_4_white}>
                    </div>
                </div>
                <div
                    id={"3"}
                    onMouseEnter={()=>handleMouseEnter(3)}
                    onMouseLeave={()=>handleMouseLeave(3)}
                    className={`${classes.hk_home_section_top_categories_box_content_box} ${classes.green_container}`}
                >
                    { showImage3 ? null : <h3>Stationary</h3> }

                             <Image
                                 style={showImage3 ? { opacity: "1",transition:"0.2s", transitionDelay: "0.4s" } : {opacity: "0",transition: "0.4s"}}
                                 src={imageStationary}
                                alt="kub image"
                                priority={true}
                            />
                    <div
                        style={showImage3 ? { top: "0",transition: "all 0.4s ease",} : {opacity: "1",transition: "0.4s"}}
                        className={`${classes.hk_puzzle_1_red} ${classes.hk_puzzle_1_green}`}>
                    </div>
                    <div
                        className={classes.hk_puzzle_container}>
                        <div
                            style={showImage3 ? { left: "0",transition: "all 0.4s ease", } : {opacity: "1",transition: "0.4s"}}
                            className={`${classes.hk_puzzle_2_red} ${classes.hk_puzzle_1_green}`}>
                        </div>
                        <div
                            style={showImage3 ? { right: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                            className={classes.hk_puzzle_3_white}>
                        </div>
                    </div>
                    <div
                        style={showImage3 ? { bottom: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                        className={classes.hk_puzzle_4_white}>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SectionTopCategories;