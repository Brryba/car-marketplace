import { asyncStorageProvider } from "@/db/local/car-storage";
import {ThemePreference} from "@/types/global-types";

export const themeRepository = {
    async setTheme(theme: ThemePreference) {
        await asyncStorageProvider.set("theme", theme);
    },

    async getTheme(): Promise<ThemePreference | null> {
        return await asyncStorageProvider.get("theme");
    },
};