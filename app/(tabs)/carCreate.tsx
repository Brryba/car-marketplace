import CarForm from "@/components/car-form/CarForm";
import { useTheme } from "@/context/useTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {useTranslations} from "@/context/useTranslations";
import {useCarStorage} from "@/hooks/local-storage/useCarStorage";
import {useRouter} from "expo-router";

export default function CarCreateScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const { saveCar } = useCarStorage();
    const router = useRouter();

    return <View style={{ flex: 1, backgroundColor: colors.background }}>
        <CarForm
            mode="create"
            onSubmit={async (data) => {
                await saveCar(data);
                router.push('/');
            }}
            actions={
                <>
                    <Button mode="outlined"
                            textColor={colors.accent} style={{ borderColor: colors.accent }}
                            onPress={() => router.push('/')}>
                        {tr.buttons.cancel}
                    </Button>
                </>
            }
        />
    </View>
}