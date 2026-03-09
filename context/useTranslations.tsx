import { useTranslation } from 'react-i18next';
import {LocalePreference, ResolvedTheme, ThemePreference} from "@/types/global-types";
import * as Localization from "expo-localization";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {TranslationType} from "@/types/translation-type";

interface LocaleContextType {
    locale: LocalePreference;
    setLocale: (locale: LocalePreference) => void;
    tr: TranslationType;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const { i18n } = useTranslation();
    const tr = i18n.getResourceBundle(i18n.language, 'translation');
    const [locale, setLocale] = useState<LocalePreference>('system');

    useEffect(() => {
        const targetLang = locale === "system"
            ? (Localization.getLocales()[0]?.languageCode ?? 'en')
            : locale;

        i18n.changeLanguage(targetLang);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    return <LocaleContext.Provider value={{ locale, setLocale, tr }}>
        {children}
    </LocaleContext.Provider>
}

export function useTranslations() {
    const context = useContext(LocaleContext);
    if (!context) { throw Error('useTheme must be used within a ThemeProvider'); }
    return context;
}