import * as React from 'react';
import {IconButton} from 'react-native-paper';
import {Stack, useRouter} from "expo-router";
import {View} from "react-native";
import {useTheme} from "@/context/UseTheme";

function AppHeader() {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Автомобили',
                    headerStyle: {
                        backgroundColor: colors.header,
                    },
                    headerTintColor: colors.text,
                    headerRight: () => (
                        <View style={{ flexDirection: "row" }}>
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
                    ),
                }}
            />

            <Stack.Screen
                name="settings"
                options={{
                    title: 'Настройки',
                    headerStyle: {
                        backgroundColor: colors.header,
                    },
                    headerTintColor: colors.text,
                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            iconColor={colors.text}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
        </Stack>
    );
}

export default AppHeader;