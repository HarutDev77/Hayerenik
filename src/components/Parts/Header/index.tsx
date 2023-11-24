import classes from "./Header.module.scss"
import Image from "next/image";
import Logo from "../../../assets/images/hayerenikLogo.svg";
import Search from "../../../assets/images/search.svg";
import Cart from "../../../assets/images/cart.svg";
import lang from "@/assets/images/icon _United States_.svg"

const Header = () => {
    return (
        <>
            <header>
                <nav className={classes.hk_nav}>
                    <div className={classes.hk_nav_first_box}>
                        <div>
                            <ul>
                                <li><a href="#">Main</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Payment and Delivery</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.hk_nav_second_box}>
                        <div>
                            <Image
                                src={Logo}
                                alt="hayerenik logo"
                                width={173}
                                height={70}
                            />
                        </div>
                        <div>
                            <ul>
                                <li><a href="#">ALL</a></li>
                                <li><a href="#">Books</a></li>
                                <li><a href="#">For school</a></li>
                                <li><a href="#">Games</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <Image
                                    src={lang}
                                    alt="search"
                                    width={30}
                                    height={30}
                                />
                            </div>
                           <div>
                               <Image
                                   src={Search}
                                   alt="search"
                                   width={24}
                                   height={30}
                               />
                               <Image
                                   src={Cart}
                                   alt="Cart"
                                   width={24}
                                   height={30}
                               />
                           </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;