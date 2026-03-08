import { useTheme } from "@/context/UseTheme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface LoadingScreenProps {
    message?: string;
}

export default function LoadingScreen({ message = "Загрузка..." }: LoadingScreenProps) {
    const { colors, activeTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
            <View style={styles.content}>
                <ActivityIndicator
                    animating={true}
                    color={colors.accent}
                    size="large"
                    style={styles.spinner}
                />
                {message && (
                    <Text variant="titleMedium" style={{ color: colors.textSecondary, marginTop: 16 }}>
                        {message}
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        transform: [{ scale: 1.5 }],
    }
});
