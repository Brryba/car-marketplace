import CarForm from "@/components/ui/car-form/CarForm";
import { useTheme } from "@/context/UseTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useState} from "react";

export default function CarChange() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();

    return <LoadingWrapper isLoading={isLoading}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CarForm
                actions={
                    <>
                        <Button mode="contained"
                                style={{ backgroundColor: colors.accent }}
                                labelStyle={{ color: colors.accentText }}>
                            Create
                        </Button>
                        <Button mode="outlined"
                                textColor={colors.accent} style={{ borderColor: colors.accent }}>
                            Cancel
                        </Button>
                    </>
                }
            />
        </View>
    </LoadingWrapper>
}
