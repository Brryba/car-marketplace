import { useTranslation } from 'react-i18next';
import {LocalePreference} from "@/types/global-types";
import * as Localization from "expo-localization";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {TranslationType} from "@/types/translation-type";
import {useLocaleStorage} from "@/hooks/local-storage/useLocaleStorage";

interface LocaleContextType {
    locale: LocalePreference;
    setLocale: (locale: LocalePreference) => void;
    tr: TranslationType;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const { saveLocale, readLocale } = useLocaleStorage();
    const { i18n } = useTranslation();
    const tr = i18n.getResourceBundle(i18n.language, 'translation');
    const [locale, setLocale] = useState<LocalePreference>('system');

    useEffect(() => {
        const setUpLocale = async () => {
            const stored = await readLocale();
            if (stored) setLocale(stored as LocalePreference);
        }

        setUpLocale();
    }, []);

    useEffect(() => {
        const targetLang = locale === "system"
            ? (Localization.getLocales()[0]?.languageCode ?? 'en')
            : locale;

        i18n.changeLanguage(targetLang);
    }, [locale]);

    const handleLocaleChange = (newLocale: LocalePreference) => {
        setLocale(newLocale);
        saveLocale(newLocale);
    }

    return <LocaleContext.Provider value={{ locale, setLocale: handleLocaleChange, tr }}>
        {children}
    </LocaleContext.Provider>
}

export function useTranslations() {
    const context = useContext(LocaleContext);
    if (!context) { throw Error('useTheme must be used within a ThemeProvider'); }
    return context;
}