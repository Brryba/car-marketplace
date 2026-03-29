import { NoInternetBanner } from "@/components/ui/NoInternetBanner";
import { useTheme } from "@/context/useTheme";
import { useTranslations } from "@/context/useTranslations";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import { View } from "react-native";
import { IconButton } from 'react-native-paper';

function AppHeader() {
    const { colors, activeTheme } = useTheme();
    const router = useRouter();
    const { tr } = useTranslations();

    const RightHeader = () => (
        <View style={{ flexDirection: "row" }}>
            <IconButton icon="cog" iconColor={colors.text} onPress={() => router.push('/settings')} />
            <IconButton icon="account-circle" iconColor={colors.text} />
        </View>
    );

    const RightHeaderWithAddButton = () => (
        <View style={{ flexDirection: "row" }}>
            <IconButton icon="plus" iconColor={colors.text} onPress={() => router.push('/carCreate')} />
            <RightHeader />
        </View>
    );

    const LeftHeader = () => (
        <IconButton
            icon="arrow-left"
            iconColor={colors.text}
            onPress={() => router.back()}
            style={{ marginLeft: 0, marginRight: 15 }}
        />
    );

    const headerColors = {
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.text,
    };

    return (
        <>
            <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    ...headerColors,
                    headerRight: RightHeader,
                    headerLeft: LeftHeader,
                    headerBackVisible: false,
                }}
                screenLayout={({ children }) => (
                    <>
                        <NoInternetBanner />
                        {children}
                    </>
                )}
            >
                <Stack.Screen name="index" options={{ title: tr.headers.index, headerLeft: () => null, headerRight: RightHeaderWithAddButton }} />
                <Stack.Screen name="settings" options={{ title: tr.headers.settings, headerRight: () => null }} />
                <Stack.Screen name="carCreate" options={{ title: tr.headers.create }} />
                <Stack.Screen name="carChange" options={{ title: tr.headers.edit }} />
            </Stack>
        </>
    );
}

export default AppHeader;