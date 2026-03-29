import { CarFieldKey } from "@/types/schemas/car-schema";
import { BodyType, ColorType, FuelType, TransmissionType } from "@/types/car-types";
import { LocalePreference, ThemePreference } from "@/types/global-types";

export interface TranslationType {
    headers: {
        index: string;
        settings: string;
        create: string;
        edit: string;
    };
    settings: {
        themeLabel: string;
        languageLabel: string;
        theme: Record<ThemePreference, string>;
        language: Record<LocalePreference, string>;
    };
    car: Record<CarFieldKey, string>,
    transmission: Record<TransmissionType, string>,
    fuelType: Record<FuelType, string>,
    bodyType: Record<BodyType, string>,
    color: Record<ColorType, string>,
    helpers: {
        kms: string,
    }
    buttons: {
        create: string;
        edit: string;
        delete: string;
        cancel: string;
        save: string;
    }
    errors: {
        required: string;
        invalidYear: string;
        positive: string;
        errorLabel: string;
        default: string;
        number: string;
        loadFailed: string;
    }
}