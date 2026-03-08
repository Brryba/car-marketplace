import {View} from "react-native";
import {ActivityIndicator, MD2Colors} from "react-native-paper";
import {useTheme} from "@/context/UseTheme";

interface LoadingWrapperProps {
    isLoading: boolean;
    children: React.ReactNode;
}

export default function LoadingWrapper( {isLoading, children } : LoadingWrapperProps ) {
    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={{ marginTop: 100, flex: 1 }}>
                <ActivityIndicator animating={true} color={colors.accent} size="large" />
            </View>
        );
    }

    return children;
}