import CarForm from "@/components/ui/car-form/CarForm";
import { useTheme } from "@/context/UseTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useState} from "react";
import {useTranslations} from "@/hooks/useTranslations";

export default function CarChange() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();
    const { tr } = useTranslations();

    return <LoadingWrapper isLoading={isLoading}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CarForm
                actions={
                    <>
                        <Button mode="contained"
                                style={{ backgroundColor: colors.accent }}
                                labelStyle={{ color: colors.accentText }}>
                            {tr.buttons.save}
                        </Button>
                        <Button mode="contained" style={{ backgroundColor:colors.error,
                            borderColor: colors.content }}>
                            {tr.buttons.delete}
                        </Button>
                        <Button mode="outlined"
                                textColor={colors.accent} style={{ borderColor: colors.accent }}>
                            {tr.buttons.cancel}
                        </Button>
                    </>
                }
            />
        </View>
    </LoadingWrapper>
}
