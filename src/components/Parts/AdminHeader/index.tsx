import React from 'react';
import Image from "next/image";
import HkLogo from "@/assets/images/hayerenikLogo.svg";
import classes from "./AdminHeader.module.scss";
import Link from "next/link";

const AdminHeader = () => {
    return (
        <nav className={classes.hk_admin_navigate}>
            <div className={classes.hk_admin_navigate_logo_box}>
                <Link href={'/'}>
                    <Image
                        src={HkLogo}
                        alt={"Hk Logo"}
                        priority={true}
                    />
                </Link>
            </div>
            <div className={classes.hk_admin_navigate_menu_box}>
                <ul>
                    <li>Orders</li>
                    <li>Products</li>
                    <li>Categories</li>
                    <li>Properties</li>
                </ul>
            </div>
            <div className={classes.hk_admin_navigate_last_box}></div>
        </nav>
    );
};

export default AdminHeader;