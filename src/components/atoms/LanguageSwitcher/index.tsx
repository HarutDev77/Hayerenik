import { useRouter } from 'next/router';
import classes from "./languageSwitcher.module.scss";

const LanguageSwitcher = () => {
    const router = useRouter();

    const changeLanguage = (locale) => {
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>En</button>
            <button onClick={() => changeLanguage('am')}>Am</button>
        </div>
    );
};

export default LanguageSwitcher;