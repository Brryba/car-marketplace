import AppHeader from "@/components/AppHeader";
import { ThemeProvider } from "@/context/useTheme";
import '@/locales/i18n';
import { LocaleProvider } from "@/context/useTranslations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import {AuthGuard} from "@/components/AuthGuard";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LocaleProvider>
                    <Provider store={store}>
                        <AuthGuard />
                        <AppHeader />
                    </Provider>
                </LocaleProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}