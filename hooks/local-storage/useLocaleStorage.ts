import {LocalePreference} from "@/types/global-types";
import {localeRepository} from "@/db/local/locale-repository";

export function useLocaleStorage() {
    const saveLocale = async (locale: LocalePreference) => {
        await localeRepository.setLocale(locale);
    }

    const getLocale = async () => {
        return await localeRepository.getLocale();
    }

    return { saveLocale, readLocale: getLocale };
}