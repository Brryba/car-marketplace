import AppHeader from "@/components/AppHeader";
import { ThemeProvider } from "@/context/UseTheme";
import "@/locales/i18n";
import {LocaleProvider} from "@/hooks/useTranslations";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <LocaleProvider>
                <AppHeader />
            </LocaleProvider>
        </ThemeProvider>
    );
}