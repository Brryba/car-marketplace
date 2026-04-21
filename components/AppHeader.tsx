import { NoInternetBanner } from "@/components/ui/NoInternetBanner";
import { useTheme } from "@/context/useTheme";
import { useTranslations } from "@/context/useTranslations";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import { useState } from 'react';
import { View } from "react-native";
import { IconButton, Menu } from 'react-native-paper';
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { signOut } from 'firebase/auth';
import { auth } from '@/db/firebase/fireBaseConfig';
import {AuthGuard} from "@/components/AuthGuard";

export default function AppHeader() {
    const { colors, activeTheme } = useTheme();
    const router = useRouter();
    const { tr } = useTranslations();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const user = useSelector((state: RootState) => state.user.user);
    const [menuVisible, setMenuVisible] = useState(false);

    const UserIcon = () => (
        <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentStyle={{ marginTop: 48, marginRight: -16, backgroundColor: colors.header }}
            anchor={
                <IconButton
                    icon="account-circle"
                    iconColor={colors.text}
                    onPress={() => setMenuVisible(true)}
                />
            }
        >
            <Menu.Item title={user!.email} titleStyle={{ color: colors.text }} disabled />
            <Menu.Item
                title={tr.helpers.logout}
                titleStyle={{ color: colors.text }}
                onPress={() => {
                    setMenuVisible(false);
                    signOut(auth);
                }}
            />
        </Menu>
    )

    const RightHeader = () => (
        <View style={{ flexDirection: "row" }}>
            <IconButton icon="cog" iconColor={colors.text} onPress={() => router.push('/settings')} />
            {isLoggedIn ? (
                <UserIcon />
            ) : undefined}
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
            <AuthGuard />
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
                <Stack.Screen name="auth" options={{ title: tr.headers.auth, headerLeft: () => null, headerRight: () => null }} />
            </Stack>
        </>
    );
}