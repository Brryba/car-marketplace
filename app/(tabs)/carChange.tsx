import CarForm from "@/components/car-form/CarForm";
import { useTheme } from "@/context/useTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useEffect, useState} from "react";
import {useTranslations} from "@/context/useTranslations";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useCarStorage} from "@/hooks/local-storage/useCarStorage";
import {CarEntity} from "@/types/schemas/car-schema";
import {useAsyncPress} from "@/hooks/useAsyncPress";

export default function CarChange() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const router = useRouter();
    const { handleAsyncPress } = useAsyncPress();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { getCar, editCar, deleteCar } = useCarStorage();
    const [car, setCar] = useState<CarEntity | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getCar(id)
            .then(setCar)
            .finally(() => setIsLoading(false));
    }, [id]);

    return <LoadingWrapper isLoading={isLoading}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CarForm
                actions={
                    <>
                        <Button mode="contained" style={{ backgroundColor:colors.error,
                            borderColor: colors.content }}
                            labelStyle={{ color: colors.accentText }}
                            onPress={() => handleAsyncPress(async () => {
                                await deleteCar(car!.id);
                                router.push('/')
                            })}
                            disabled={!!car}>
                            {tr.buttons.delete}
                        </Button>
                        <Button mode="outlined"
                                textColor={colors.accent} style={{ borderColor: colors.accent }}
                                onPress={() => {
                                    router.push('/')

                                }}>
                            {tr.buttons.cancel}
                        </Button>
                    </>
                }
             mode="edit"
            onSubmit={async (data) => {
                await editCar(id, { ...car!, ...data });
                router.push('/');
            }}
             carEntity={car}
            />
        </View>
    </LoadingWrapper>
}
