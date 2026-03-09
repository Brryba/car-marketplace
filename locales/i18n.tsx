import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import ru from "./ru"
import en from "./en"

const resources = {
    ru: { translation: ru },
    en: { translation: en },
};

const systemLang = Localization.getLocales()[0]?.languageCode ?? 'en';

i18n.use(initReactI18next)
    .init({
        resources,
        lng: systemLang,
        fallbackLng: 'en'
    });
