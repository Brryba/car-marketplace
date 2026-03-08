import AppHeader from "@/components/AppHeader";
import { ThemeProvider } from "@/context/UseTheme";
import "@/locales/i18n";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AppHeader />
        </ThemeProvider>
    );
}