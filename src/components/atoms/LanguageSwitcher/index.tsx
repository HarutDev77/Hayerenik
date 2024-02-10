import { useRouter } from 'next/router';
import classes from "./languageSwitcher.module.scss";

const LanguageSwitcher = () => {
    const router = useRouter();

    const changeLanguage = (locale) => {
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div className={classes.languageSwitcher}>
            <button className={router.locale === 'en' ? classes.buttonSelected : ''} onClick={() => changeLanguage('en')}>En</button>
            <button className={router.locale === 'am' ? classes.buttonSelected : ''} onClick={() => changeLanguage('am')}>Am</button>
        </div>
    );
};

export default LanguageSwitcher;