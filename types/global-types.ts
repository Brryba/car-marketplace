export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const;
export type ThemePreference = typeof THEME_PREFERENCES[number];
export type ResolvedTheme = 'light' | 'dark';

export const LOCALE_PREFERENCES = ['russian', 'english'] as const;
export type LocalePreference = typeof LOCALE_PREFERENCES[number];

export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'LPG'] as const;
export type FuelType = typeof FUEL_TYPES[number];

export const TRANSMISSIONS = ['Manual', 'Automatic', 'CVT', 'Robot'] as const;
export type TransmissionType = typeof TRANSMISSIONS[number];

export const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Minivan', 'Pickup'] as const;
export type BodyType = typeof BODY_TYPES[number];

export interface CarParam {
    label: string;
    value: string;
}