import React, {FC} from 'react';
import classes from "./BigPuzzle.module.scss";
import Image from "next/image";
interface IBigPuzzle {
    color: string,
    src: string,
    title: string,
    handleMouseEnter: (num: number) => void
    handleMouseLeave: () => void
    isShow: boolean,
    id: number
}

const BigPuzzle: FC<IBigPuzzle> = (props: IBigPuzzle) => {
    return (
        <div
            onMouseEnter={()=>props.handleMouseEnter(props.id)}
            onMouseLeave={()=>props.handleMouseLeave()}
            className={`${classes.hk_home_section_top_categories_box_content_box} ${ props.color === "yellow" ? classes.yellow_container : props.color === "green" ? classes.green_container : null }` }
                >
                {props.isShow ? null : <h3>{props.title}</h3>}

            <Image
                style={props.isShow ? {opacity: "1",transition: "0.2s" ,transitionDelay: "0.3s"} : {opacity: "0",transition: "0.3s"}}
                src={props.src}
                alt={props.title}
                priority={true}
                className={classes.hk_home_section_top_categories_box_content_box_images}
            />

            <div
                style={props.isShow ? { top: "0",transition: "all 0.3s ease",} : {opacity: "1",transition: "0.3s"}}
                className={`${classes.hk_puzzle_1_red} ${ props.color === "yellow" ? classes.hk_puzzle_1_yellow : props.color === "green" ? classes.hk_puzzle_1_green : null }` }
            >
            </div>
            <div className={classes.hk_puzzle_container}>
                <div
                    style={props.isShow ? { left: "0",transition: "all 0.3s ease", } : {opacity: "1",transition: "0.3s"}}
                    className={`${classes.hk_puzzle_2_red} ${ props.color === "yellow" ? classes.hk_puzzle_1_yellow : props.color === "green" ? classes.hk_puzzle_1_green : null }` }
                >
                </div>
                <div
                    style={props.isShow ? { right: "-64px",transition: "all 0.3s ease",opacity: "0" } : {opacity: "1",transition: "0.3s"}}
                    className={classes.hk_puzzle_3_white}>
                </div>
            </div>
            <div
                style={props.isShow ? { bottom: "-64px",transition: "all 0.3s ease",opacity: "0" } : {opacity: "1",transition: "0.3s"}}
                className={classes.hk_puzzle_4_white}>
            </div>
        </div>
    );
};

export default BigPuzzle;