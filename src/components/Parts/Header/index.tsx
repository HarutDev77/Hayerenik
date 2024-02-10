import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FormattedMessage} from "react-intl";
import {Input} from "antd";

import LanguageSwitcher from "@/components/atoms/LanguageSwitcher";
import Logo from "@/assets/images/hayerenikLogo.svg";
import Search from "@/assets/images/search.svg";
import Cart from "@/assets/images/cart.svg";
import lang from "@/assets/images/icon _United States_.svg";
import classes from "./Header.module.scss";


const Header = () => {

    const [showInput,setShowInput] = useState(false)

    const searchItem = () => {
        setShowInput((prevState)=>!prevState)
    }

    return (
        <>
            <header>
                <nav className={classes.hk_nav}>
                    <div className={classes.hk_nav_first_box}>
                        <div>
                            <ul>
                                <li><Link href="/"><FormattedMessage id={'main'} /></Link></li>
                                <li><Link href="#"><FormattedMessage id={'aboutUs'} /></Link></li>
                                <li><Link href="#"><FormattedMessage id={'payDelivery'} /></Link></li>
                                <li><Link href="/contacts"><FormattedMessage id={'contacts'} /></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.hk_nav_second_box}>
                        <div>
                            <Link href="/">
                                <Image
                                    src={Logo}
                                    alt="hayerenik logo"
                                    width={173}
                                    height={70}
                                />
                            </Link>
                        </div>
                        <div>
                            <ul>
                                <li><a href="#"><FormattedMessage id={'all'} /></a></li>
                                <li><a href="#">Books</a></li>
                                <li><a href="#">For school</a></li>
                                <li><a href="#">Games</a></li>
                                <li><Link href="/contacts"><FormattedMessage id={'contacts'} /></Link></li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <LanguageSwitcher />
                            </div>
                           <div>
                               <Image
                                   src={Search}
                                   alt="search"
                                   width={24}
                                   height={30}
                                   onClick={searchItem}
                               />
                               <Link href={"/cart"}>
                                   <Image
                                       src={Cart}
                                       alt="Cart"
                                       width={24}
                                       height={30}
                                   />
                                   <div className={classes.hk_nav_second_box_cart_count}><span>0</span></div>
                               </Link>

                               {
                                   showInput
                                       ? <Input className={classes.hk_nav_second_box_search} placeholder="Search"/>
                                       : null
                               }
                           </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;