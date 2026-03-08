import CarForm from "@/components/ui/car-form/CarForm";
import { useTheme } from "@/context/UseTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {useTranslations} from "@/hooks/useTranslations";

export default function CarChangeScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();

    return <View style={{ flex: 1, backgroundColor: colors.background }}>
        <CarForm
            actions={
                <>
                    <Button mode="contained"
                            style={{ backgroundColor: colors.accent }}
                            labelStyle={{ color: colors.accentText }}>
                        {tr.buttons.create}
                    </Button>
                    <Button mode="outlined"
                            textColor={colors.accent} style={{ borderColor: colors.accent }}>
                        {tr.buttons.cancel}
                    </Button>
                </>
            }
        />
    </View>
}