import { useTheme } from "@/context/UseTheme";
import { Stack, useRouter } from "expo-router";
import * as React from 'react';
import { View } from "react-native";
import { IconButton } from 'react-native-paper';

function AppHeader() {
    const { colors } = useTheme();
    const router = useRouter();

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
        <Stack screenOptions={{
            ...headerColors,
            headerRight: RightHeader,
            headerLeft: LeftHeader,
        }}>
            <Stack.Screen name="index" options={{ title: 'Автомобили', headerLeft: () => null,
                headerRight: RightHeaderWithAddButton }}/>
            <Stack.Screen name="settings" options={{ title: 'Настройки', headerRight: () => null }} />
            <Stack.Screen name="carCreate" options={{ title: 'Добавить машину' }} />
            <Stack.Screen name="carChange" options={{ title: 'Изменить машину' }} />
        </Stack>
    );
}

export default AppHeader;