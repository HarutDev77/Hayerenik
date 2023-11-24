import React, {FC} from 'react';
import classes from "./BigPuzzle.module.scss";
import Image from "next/image";
interface IBigPuzzle {
    color: "red" | "yellow" | "green",
    src: string,
    title: string,
    handleMouseEnter: (num: number) => void
    handleMouseLeave: (num: number) => void
    isShow: boolean
}

const BigPuzzle: FC<IBigPuzzle> = (props: IBigPuzzle) => {
    return (
        <div
            id={"1"}
            onMouseEnter={()=>props.handleMouseEnter(1)}
            onMouseLeave={()=>props.handleMouseLeave(1)}
            className={classes.hk_home_section_top_categories_box_content_box}
                >
                {props.isShow ? null : <h3>{props.title}</h3>}

            <Image
                style={props.isShow ? {opacity: "1",transition: "0.2s" ,transitionDelay: "0.4s"} : {opacity: "0",transition: "0.4s"}}
                src={props.src}
                alt={props.title}
                priority={true}
            />

            <div
                style={props.isShow ? { top: "0",transition: "all 0.4s ease",} : {opacity: "1",transition: "0.4s"}}
                className={classes.hk_puzzle_1_red}>
            </div>
            <div className={classes.hk_puzzle_container}>
                <div
                    style={props.isShow ? { left: "0",transition: "all 0.4s ease", } : {opacity: "1",transition: "0.4s"}}
                    className={classes.hk_puzzle_2_red}>
                </div>
                <div
                    style={props.isShow ? { right: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                    className={classes.hk_puzzle_3_white}>
                </div>
            </div>
            <div
                style={props.isShow ? { bottom: "-64px",transition: "all 0.4s ease" } : {opacity: "1",transition: "0.4s"}}
                className={classes.hk_puzzle_4_white}>
            </div>
        </div>
    );
};

export default BigPuzzle;