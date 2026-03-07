import AppHeader from "@/components/ui/AppHeader";
import {ThemeProvider} from "@/context/UseTheme";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AppHeader/>
        </ThemeProvider>
    );
}