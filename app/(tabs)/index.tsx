import CarCard from "@/components/ui/CarCard";
import { useTheme } from "@/context/UseTheme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";
import {CarEntity} from "@/schemas/car-schema";
import {BODY_TYPES, FUEL_TYPES, TRANSMISSIONS} from "@/types/global-types";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useState} from "react";

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
    color: 'Pearl White',
    bodyType: BODY_TYPES[0],
    vin: '1HGBH41JXMN109186',
};

export default function IndexScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useTheme();

    return (
        <LoadingWrapper isLoading={isLoading}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView style={{ paddingTop: 10 }}>
                    <CarCard
                        imageSource={require('../../assets/images/malibu-1.png')}
                        car={SAMPLE_CAR}
                        actions={
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Button mode="elevated"
                                        style={[styles.button, { }]}
                                        onPress={() => router.push('/carChange')}
                                >
                                    Edit
                                </Button>
                                <Button
                                    compact
                                    mode="outlined"
                                    style={[styles.button, { }]} onPress={() => {}}
                                >
                                    Remove
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