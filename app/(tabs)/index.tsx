import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from "@/context/UseTheme";

export default function TabTwoScreen() {
    const { colors } = useTheme();

    return (
        <View style={{ backgroundColor: colors.background }}>
            <Text style={{ color: colors.text }}>
                Testing
            </Text>
        </View>
    );
}
