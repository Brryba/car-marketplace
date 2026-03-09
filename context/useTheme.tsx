import { Colors } from '@/constants/theme';
// Refresh types
import { ResolvedTheme, ThemePreference } from "@/types/global-types";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useColorScheme } from "react-native";
import {useThemeStorage} from "@/hooks/local-storage/useThemeStorage";

interface ThemeContextType {
    theme: ThemePreference;
    setTheme: (theme: ThemePreference) => void;
    activeTheme: ResolvedTheme;
    colors: typeof Colors['light'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const { getTheme, saveTheme } = useThemeStorage();
    const [theme, setTheme] = useState<ThemePreference>('system');
    const systemTheme = useColorScheme() ?? 'light';

    useEffect(() => {
        const setUpTheme = async () => {
            const stored = await getTheme();
            if (stored) setTheme(stored as ThemePreference);
        }

        setUpTheme();
    }, [])

    const handleThemeChange = (newTheme: ThemePreference) => {
        setTheme(newTheme);
        saveTheme(newTheme);
    }

    const activeTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;
    const colors = Colors[activeTheme];

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, activeTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) { throw Error('useTheme must be used within a ThemeProvider'); }
    return context;
}