import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

console.log(localStorage.getItem("language"));
i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: localStorage.getItem("language") || 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }

  });

export default i18n;