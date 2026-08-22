import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.js";
import en from "./en.js";

const idiomaGuardado = localStorage.getItem("idioma");

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: idiomaGuardado || "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18n.language;

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
