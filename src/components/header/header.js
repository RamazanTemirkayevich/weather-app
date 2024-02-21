import './header.scss'
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

function Header() {
    const { i18n } = useTranslation();
    const [opacity, setOpacity] = useState(false);
    const [isActive, setActive] = useState(false);
    const [language, setLanguage] = useState(
        localStorage.getItem("language")
    );  

    const changeLanguage = useCallback(
        (lang) => {
            localStorage.setItem("language", lang);
            i18n.changeLanguage(lang);
        },
        [i18n]
    );

    const changeHandler = (e) => {
        changeLanguage(e.target.id);
        setLanguage(e.target.id.toUpperCase());
        setOpacity(false);
        setActive(!isActive);
    };

    const openList = (e) => {
        setOpacity(e => !e)
        setActive(!isActive)
    }

    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="top-menu">
                <div className="top__menu-language" onClick={openList}>
                    <div className="top__menu-language__web">
                        <img src="./icons/web.svg" width="20px" height="20px" alt="" />
                    </div>
                    <span className="default">{language === null ? "EN" : language}</span>
                    <div className="top__menu-language__arrow">
                        <img src="./icons/arrow.svg" alt="" className={`${isActive ? "rotated" : ""}`}/>
                    </div>
                </div>
                {opacity === true ? (
                    <ul className="top__menu-list">
                        <li id="EN" onClick={changeHandler}>
                            {t("lang.en")}
                        </li>
                        <li id="UA" onClick={changeHandler}>
                            {t("lang.ua")}
                        </li>
                        <li id="RU" onClick={changeHandler}>
                            {t("lang.ru")}
                        </li>
                    </ul>
                ) : null}
            </div>
        </section>
    );
}

export default Header;