import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en-US/translations.json";
import translationSv from "./locales/sv-SV/translations.json";
import { getStoredLanguage } from './languageStorage';

const resources = {
  "sv-SV": { translation: translationSv },
  "en-US": { translation: translationEn }
};

export const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  return locales?.[0]?.languageTag ?? "en-US";
};

export async function initI18n() {
    const stored = await getStoredLanguage();
    const language = stored ?? getDeviceLanguage();

    await i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: language,
        fallbackLng: "en-US",
        interpolation: {
        escapeValue: false,
        },
    });
};

initI18n();

export default i18n;


