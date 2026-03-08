import CarCard from "@/components/ui/CarCard";
import { useTheme } from "@/context/UseTheme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";

const CAR_PARAMS = [
    { label: 'p[fvfkvmeos', value: '300' },
    { label: 'resgrgrsefre', value: '32' },
    { label: 'egsrgegreg', value: '5.2s' },
    { label: 'p[fvfkvmeos', value: '300' },
    { label: 'resgrgrsefre', value: '32' },
    { label: 'egsrgegreg', value: '5.2s' },
    { label: 'p[fvfkvmeos', value: '300' },
    { label: 'resgrgrsefre', value: '32' },
    { label: 'egsrgegreg', value: '5.2s' },
    { label: 'p[fvfkvmeos', value: '300' },
    { label: 'resgrgrsefre', value: '32' },
    { label: 'egsrgegreg', value: '5.2s' },
];

export default function IndexScreen() {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView style={{ paddingTop: 10 }}>
                <CarCard
                    imageSource={require('../../assets/images/malibu-1.png')}
                    name="Chevrolet Malibu"
                    releaseYear="2023"
                    mileage="50000"
                    description="Comfortable mid-size sedan with adaptive cruise and heated seats. Comfortable mid-size sedan with adaptive cruise and heated seats. Comfortable mid-size sedan with adaptive cruise and heated seats."
                    city="Minsk"
                    publicationDate="12.01.2025"
                    params={CAR_PARAMS}
                    actions={
                        <>
                            <Button mode="elevated" compact onPress={() => router.push('/carChange')}>
                                Edit
                            </Button>
                            <Button mode="outlined" compact onPress={() => { }}>
                                Remove
                            </Button>
                        </>
                    }
                />

                <CarCard
                    imageSource={require('../../assets/images/malibu-1.png')}
                    name="Chevrolet Malibu"
                    releaseYear="2023"
                    mileage="50000"
                    description="Next service due in 1,200 miles."
                    params={[
                        { label: 'Miles', value: '34,210' },
                        { label: 'Service', value: 'Due' },
                    ]}
                    publicationDate="12.01.2025"
                    actions={
                        <>
                            <Button mode="elevated" compact onPress={() => router.push('/carEdit')}>
                                Edit
                            </Button>
                            <Button mode="outlined" compact onPress={() => { }}>
                                Remove
                            </Button>
                        </>
                    }
                />
            </ScrollView>
        </View>
    );
}