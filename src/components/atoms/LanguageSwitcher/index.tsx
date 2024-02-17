import { useRouter } from 'next/router';
import Image from "next/image";
import enIcon from '@/assets/images/en.png';
import amIcon from '@/assets/images/am.png';
import classes from "./languageSwitcher.module.scss";


const LanguageSwitcher = () => {
    const router = useRouter();

    const changeLanguage = (locale: 'am' | 'en') => {
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div className={classes.languageSwitcher}>
            <Image
                src={router.locale === 'en' ? enIcon : amIcon}
                alt="Language icon"
                priority={true}
            />
            <button className={router.locale === 'en' ? `${classes.en_btn} ${classes.buttonSelected}` : classes.en_btn} onClick={() => changeLanguage('en')}>Eng</button>
            <button className={router.locale === 'am' ? classes.buttonSelected : ''} onClick={() => changeLanguage('am')}>Հայ</button>
        </div>
    );
};

export default LanguageSwitcher;