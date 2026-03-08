import type { TranslationType } from '@/types/translation-type';
import { useTranslation } from 'react-i18next';

export function useTranslations() {
    const { i18n } = useTranslation();
    const tr = (i18n.getResourceBundle(i18n.language, 'translation') ||
        i18n.getResourceBundle('ru', 'translation')) as TranslationType;

    return { tr };
}