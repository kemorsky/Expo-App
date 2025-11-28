import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-US/translations.json";
import translationSv from "./locales/sv-SV/translations.json";

const resources = {
  "sv-SV": { translation: translationSv },
  "en-US": { translation: translationEn }
};

const initI18n = async () => {
    // let savedLanguage = await AsyncStorage.getItem("language");

    // if (!savedLanguage) {
    //     savedLanguage = Localization.getLocales();
    // }

    i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en-US", // TODO: set up depending on user's preferences
        fallbackLng: "en-US",
        interpolation: {
        escapeValue: false,
        },
    });
};

initI18n();

export default i18n;


