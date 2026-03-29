import {useNetworkStatus} from "@/hooks/useNetworkStatus";
import {View, Text, StyleSheet} from "react-native";
import {useTranslations} from "@/context/useTranslations";
import {useTheme} from "@/context/useTheme";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export function NoInternetBanner() {
    const { isConnected } = useNetworkStatus();
    const { tr } = useTranslations();
    const { colors } = useTheme();

    if (isConnected) return null;

    return (
        <View style={[styles.container, { borderBottomColor: colors.error, backgroundColor: colors.background }]}>
            <MaterialCommunityIcons name="wifi-off" size={16} color={colors.error} />
            <Text style={[styles.text, { color: colors.error }]}>
                {tr.errors.noInternet}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderBottomWidth: 3,
    },
    text: {
        fontSize: 13,
        fontWeight: '500',
    },
});