import {CarEntity, CarFormData} from "@/types/schemas/car-schema";
import {carRepository} from "@/db/local/car-repository";
import uuid from "react-native-uuid";
import {themeRepository} from "@/db/local/theme-repository";
import {ThemePreference} from "@/types/global-types";

export function useThemeStorage() {
    const saveTheme = async (theme: ThemePreference) => {
        await themeRepository.setTheme(theme);
    }

    const getTheme = async () => {
        return await themeRepository.getTheme();
    }

    return { saveTheme, getTheme };
}