import { asyncStorageProvider } from "@/db/local/car-storage";
import {LocalePreference} from "@/types/global-types";

export const localeRepository = {
    async setLocale(locale: LocalePreference) {
        await asyncStorageProvider.set("locale", locale);
    },

    async getLocale(): Promise<LocalePreference | null> {
        return await asyncStorageProvider.get("locale");
    },
};