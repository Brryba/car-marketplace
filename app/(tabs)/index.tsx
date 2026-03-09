import CarCard from "@/components/ui/CarCard";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import { useTheme } from "@/context/useTheme";
import { useTranslations } from "@/context/useTranslations";
import { CarEntity } from "@/types/schemas/car-schema";
import {useEffect, useState} from "react";
import { ScrollView, View } from 'react-native';
import { Button } from "react-native-paper";
import {useCarStorage} from "@/hooks/local-storage/useCarStorage";
import {useAsyncPress} from "@/hooks/useAsyncPress";
import {useRouter} from "expo-router";


export default function IndexScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const { deleteCar, getAllCars } = useCarStorage();
    const { handleAsyncPress } = useAsyncPress();
    const router = useRouter();
    const [cars, setCars] = useState<CarEntity[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getAllCars()
            .then(setCars)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <LoadingWrapper isLoading={isLoading}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    {cars.map(car => (
                        <CarCard
                            key={car.id}
                            car={car}
                            actions={
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    <Button mode="outlined"
                                            textColor={colors.accent}
                                            style={{ borderColor: colors.accent }}
                                            onPress={() => {
                                                router.push({ pathname: '/carChange', params: { id: car.id } });
                                            }}>
                                        {tr.buttons.edit}
                                    </Button>
                                    <Button mode="outlined"
                                            style={{ borderColor: colors.error }}
                                            labelStyle={{ color: colors.error }}
                                            onPress={() => {
                                                handleAsyncPress(async () => {
                                                    await deleteCar(car.id);
                                                    setCars(prev => prev.filter(c => c.id !== car.id));
                                                });
                                            }}>
                                        {tr.buttons.delete}
                                    </Button>
                                </View>
                            }
                        />
                    ))}
                </ScrollView>
            </View>
        </LoadingWrapper>
    );
}