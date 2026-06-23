import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import jp from "./locales/jp/translation.json";
import pt from "./locales/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    jp: { translation: jp },
    pt: { translation: pt },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
