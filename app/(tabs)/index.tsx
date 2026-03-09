import CarCard from "@/components/ui/CarCard";
import { useTheme } from "@/context/UseTheme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";
import {CarEntity} from "@/schemas/car-schema";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useState} from "react";
import {BODY_TYPES, COLORS, FUEL_TYPES, TRANSMISSIONS} from "@/types/car-types";
import {useTranslations} from "@/hooks/useTranslations";

const SAMPLE_CAR: CarEntity = {
    id: '1',
    createdAt: '2024-03-01',
    ownerId: 'user_1',
    make: 'Toyota',
    model: 'Camry',
    releaseYear: 2021,
    mileage: 45000,
    price: 24500,
    city: 'Minsk',
    description: 'Well maintained, one owner, full service history.',
    transmission: TRANSMISSIONS[0],
    fuelType: FUEL_TYPES[0],
    engineSize: '2.5L',
    color: COLORS[0],
    bodyType: BODY_TYPES[0],
    vin: '1HGBH41JXMN109186',
};

export default function IndexScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();
    const { tr } = useTranslations();

    return (
        <LoadingWrapper isLoading={isLoading}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <CarCard
                        imageSource={require('../../assets/images/malibu-1.png')}
                        car={SAMPLE_CAR}
                        actions={
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Button mode="outlined"
                                        textColor={colors.accent}
                                        style={{ borderColor: colors.accent }}>
                                    {tr.buttons.edit}
                                </Button>
                                <Button mode="outlined" style={{
                                    borderColor: colors.error }}
                                    labelStyle={{ color: colors.error }}>
                                    {tr.buttons.delete}
                                </Button>
                            </View>
                        }
                    />
                </ScrollView>
            </View>
        </LoadingWrapper>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 120,
    }
})