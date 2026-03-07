import {Colors} from '@/constants/theme';
import {useColorScheme} from "react-native";
import {createContext, ReactNode, useContext, useState} from "react";
import {ResolvedTheme, ThemePreference} from "@/types/global-types";

interface ThemeContextType {
    theme: ThemePreference;
    setTheme: (theme: ThemePreference) => void;
    activeTheme: ResolvedTheme;
    colors: typeof Colors['light'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemePreference>('system');
    const systemTheme = useColorScheme() ?? 'light';

    const activeTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;
    const colors = Colors[activeTheme];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, activeTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) { throw Error('useTheme must be used within a ThemeProvider'); }
    return context;
}