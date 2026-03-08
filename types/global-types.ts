export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const;
export type ThemePreference = typeof THEME_PREFERENCES[number];
export type ResolvedTheme = 'light' | 'dark';

export const LOCALE_PREFERENCES = ['ru', 'en', 'system'] as const;
export type LocalePreference = typeof LOCALE_PREFERENCES[number];