import { SettingsPicker } from "@/components/ui/SettingsPicker";
import { useTheme } from "@/context/useTheme";
import { LOCALE_PREFERENCES, THEME_PREFERENCES } from "@/types/global-types";
import { ScrollView } from 'react-native';
import { Divider } from "react-native-paper";
import { useTranslations } from "@/context/useTranslations";
import { useQueryClient } from "@tanstack/react-query";
import {SettingsButton} from "@/components/ui/SettingsButton";

export default function SettingsScreen() {
    const { colors } = useTheme();
    const { theme, setTheme } = useTheme();
    const { tr, locale, setLocale } = useTranslations();
    const queryClient = useQueryClient();

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <SettingsPicker
                name={tr.settings.themeLabel}
                initialValue={theme}
                onChange={(theme) => setTheme(theme)}
                items={THEME_PREFERENCES.map(type =>
                    ({ label: tr.settings.theme[type], value: type }))}
            />
            <Divider />
            <SettingsPicker
                name={tr.settings.languageLabel}
                initialValue={locale}
                onChange={(locale) => setLocale(locale)}
                items={LOCALE_PREFERENCES.map(type =>
                    ({ label: tr.settings.language[type], value: type }))}
            />
            <Divider />
            <SettingsButton
                name={tr.settings.clearCache}
                onPress={() => queryClient.invalidateQueries()}
            />
            <Divider />
        </ScrollView>
    );
}