import * as React from 'react';
import {IconButton} from 'react-native-paper';
import {Stack} from "expo-router";
import {View} from "react-native";
import {useTheme} from "@/context/UseTheme";

function AppHeader() {
    const { colors } = useTheme();

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
                            />
                            <IconButton
                                icon="account-circle"
                                iconColor={colors.text}
                                onPress={() => {/* open profile */}}
                            />
                        </View>
                    ),
                }}
            />
        </Stack>
    );
}

export default AppHeader;