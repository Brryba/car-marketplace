import CarForm from "@/components/ui/car-form/CarForm";
import { useTheme } from "@/context/UseTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {useTranslations} from "@/context/useTranslations";
import {useCarStorage} from "@/hooks/local-storage/useCarStorage";

export default function CarCreateScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const { saveCar } = useCarStorage();

    return <View style={{ flex: 1, backgroundColor: colors.background }}>
        <CarForm
            mode="create"
            onSubmit={(data) => {
                saveCar(data)
            }}
            actions={
                <>
                    <Button mode="outlined"
                            textColor={colors.accent} style={{ borderColor: colors.accent }}>
                        {tr.buttons.cancel}
                    </Button>
                </>
            }
        />
    </View>
}