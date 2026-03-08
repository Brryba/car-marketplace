import * as React from 'react';
import {IconButton} from 'react-native-paper';
import {Stack, useRouter} from "expo-router";
import {View} from "react-native";
import {useTheme} from "@/context/UseTheme";

function AppHeader() {
    const { colors } = useTheme();
    const router = useRouter();

    const RightHeader = () => {
        return <View style={{ flexDirection: "row" }}>
            <IconButton
                icon="cog"
                iconColor={colors.text}
                onPress={() => {router.push('/settings')}}
            />
            <IconButton
                icon="account-circle"
                iconColor={colors.text}
            />
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
            <Stack.Screen name="index" options={{ title: 'Автомобили', headerLeft: () => null }} />
            <Stack.Screen name="settings" options={{ title: 'Настройки' , headerRight: () => null }} />
            <Stack.Screen name="carEdit" options={{ title: 'Машина' }} />
        </Stack>
    );
}

export default AppHeader;