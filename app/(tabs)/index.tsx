import CarCard from "@/components/ui/CarCard";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import { useTheme } from "@/context/UseTheme";
import { useTranslations } from "@/context/useTranslations";
import { CarEntity } from "@/types/schemas/car-schema";
import { BODY_TYPES, COLORS, FUEL_TYPES, TRANSMISSIONS } from "@/types/car-types";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";

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
    photo: "file:///data/user/0/host.exp.exponent/cache/ImagePicker/9d12b4d2-21d8-4310-9723-ff917c32ef81.jpeg"
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