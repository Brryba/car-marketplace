import AppHeader from "@/components/AppHeader";
import { ThemeProvider } from "@/context/useTheme";
import '@/locales/i18n';
import {LocaleProvider} from "@/context/useTranslations";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <LocaleProvider>
                <AppHeader />
            </LocaleProvider>
        </ThemeProvider>
    );
}