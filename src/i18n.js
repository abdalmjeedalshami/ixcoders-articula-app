// i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: localStorage.getItem("i18nextLng") || "ar", // default or saved
    resources: {
      en: { translation: { greeting: "hello, welcome!" } },
      ar: { translation: { greeting: "مرحبا, اهلا وسهلا!" } },
    },
  });

// ✅ Set HTML attributes immediately so there's no flicker
const lng = i18n.language || "ar";
document.documentElement.lang = lng;
document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";

export default i18n;
