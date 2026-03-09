import { useTheme } from "@/context/UseTheme";
import { Stack, useRouter } from "expo-router";
import * as React from 'react';
import { View } from "react-native";
import { IconButton } from 'react-native-paper';
import {StatusBar} from "expo-status-bar";
import {useTranslations} from "@/context/useTranslations";

function AppHeader() {
    const { colors, activeTheme } = useTheme();
    const router = useRouter();
    const { tr } = useTranslations();

    const RightHeader = () => {
        return <View style={{ flexDirection: "row" }}>
            <IconButton
                icon="cog"
                iconColor={colors.text}
                onPress={() => { router.push('/settings') }}
            />
            <IconButton
                icon="account-circle"
                iconColor={colors.text}
            />
        </View>
    }

    const RightHeaderWithAddButton = () => {
        return <View style={{ flexDirection: "row" }}>
            <IconButton
                icon="plus"
                iconColor={colors.text}
                onPress={() => router.push('/carCreate')}
            />
            <RightHeader/>
        </View>
    }

    const LeftHeader = () => {
        return <IconButton
            icon="arrow-left"
            iconColor={colors.text}
            onPress={() => router.back()}
        />
    }

    const headerColors = {
        headerStyle: {
            backgroundColor: colors.header,
        },
        headerTintColor: colors.text,
    }

    return (
        <>
            <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{
                ...headerColors,
                headerRight: RightHeader,
                headerLeft: LeftHeader,
            }}>
                <Stack.Screen name="index" options={{ title: tr.headers.index, headerLeft: () => null,
                    headerRight: RightHeaderWithAddButton }}/>
                <Stack.Screen name="settings" options={{ title: tr.headers.settings, headerRight: () => null }} />
                <Stack.Screen name="carCreate" options={{ title: tr.headers.create }} />
                <Stack.Screen name="carChange" options={{ title: tr.headers.edit }} />
            </Stack>
        </>

    );
}

export default AppHeader;