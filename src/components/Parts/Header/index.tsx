import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FormattedMessage} from "react-intl";
import {Input} from "antd";

import LanguageSwitcher from "@/components/atoms/LanguageSwitcher";
import Logo from "@/assets/images/hayerenikLogo.svg";
import Search from "@/assets/images/search.svg";
import Cart from "@/assets/images/cart.svg";
import classes from "./Header.module.scss";
import {useRouter} from "next/router";


const Header = () => {
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter()

    const searchItem = () => {
        setShowSearchInput((prevState) => !prevState)

        if (showSearchInput && searchTerm){
            setShowSearchInput(false)
            router.push(`/search-result?term=${searchTerm}`)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm){
            setTimeout(() => {
                setShowSearchInput(false)
            }, 300)

            router.push(`/search-result?term=${searchTerm}`)
        }
    }

    return (
        <>
            <header>
                <nav className={classes.hk_nav}>
                    <div className={classes.hk_nav_first_box}>
                        <div>
                            <ul>
                                <li><Link href="/"><FormattedMessage id={'main'}/></Link></li>
                                <li><Link href="#"><FormattedMessage id={'aboutUs'}/></Link></li>
                                <li><Link href="#"><FormattedMessage id={'payDelivery'}/></Link></li>
                                <li><Link href="/contacts"><FormattedMessage id={'contacts'}/></Link></li>
                            </ul>
                        </div>
                        <div className={classes.hk_nav_first_box_lang_switcher_cont}>
                            <LanguageSwitcher/>
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
                                <li><a href="#"><FormattedMessage id={'all'}/></a></li>
                                <li><a href="#">Books</a></li>
                                <li><a href="#">For school</a></li>
                                <li><a href="#">Games</a></li>
                            </ul>
                        </div>
                        <div className={classes.hk_nav_second_box_search_group_items}>
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
                                    showSearchInput
                                        ? <Input
                                            onChange={({target}) => setSearchTerm(target.value)}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            className={classes.hk_nav_second_box_search}
                                            placeholder="Search"
                                        />
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