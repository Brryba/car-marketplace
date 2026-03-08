import { SettingsPicker } from "@/components/ui/SettingsPicker";
import { useTheme } from "@/context/UseTheme";
import { LOCALE_PREFERENCES, THEME_PREFERENCES } from "@/types/global-types";
import { ScrollView } from 'react-native';
import { Divider } from "react-native-paper";

export default function SettingsScreen() {
    const { colors } = useTheme();
    const { theme, setTheme } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <SettingsPicker
                name="Theme"
                initialValue={theme}
                onChange={(theme) => setTheme(theme)}
                items={THEME_PREFERENCES.map(type =>
                    ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }))}
            />
            <Divider />
            <SettingsPicker
                name="Language"
                initialValue={theme}
                onChange={(theme) => setTheme(theme)}
                items={LOCALE_PREFERENCES.map(type =>
                    ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }))}
            />
        </ScrollView>
    );
}
