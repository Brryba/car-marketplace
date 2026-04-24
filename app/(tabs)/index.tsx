import CarCard from "@/components/ui/CarCard";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import { useTheme } from "@/context/useTheme";
import { useTranslations } from "@/context/useTranslations";
import { ScrollView, View } from 'react-native';
import { Button } from "react-native-paper";
import {useCarStorage} from "@/hooks/useCarStorage";
import {useAsyncPress} from "@/hooks/useAsyncPress";
import {useRouter} from "expo-router";
import ParamsButton from "@/components/ui/ParamsButton";
import {useFilterPanel} from "@/hooks/useFilterPanel";
import CarFilterComponent from "@/components/car-filter/CarFilterComponent";
import {firebaseCarRepository} from "@/db/firebase/car-firebase-repository";
import {useCarSubscription} from "@/hooks/useCarSubscription";

export default function IndexScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const { deleteCar } = useCarStorage(firebaseCarRepository);
    const { cars, loading } = useCarSubscription();
    const { handleAsyncPress } = useAsyncPress();
    const { isOpen: isFilterOpen, toggle } = useFilterPanel();
    const router = useRouter();

    return (
        <LoadingWrapper isLoading={loading}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <CarFilterComponent isOpen={isFilterOpen} />
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
                                                });
                                            }}>
                                        {tr.buttons.delete}
                                    </Button>
                                </View>
                            }
                        />
                    ))}
                </ScrollView>
                <ParamsButton onPress={toggle}/>
            </View>
        </LoadingWrapper>
    );
}