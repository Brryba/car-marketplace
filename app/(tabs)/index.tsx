import {ScrollView} from 'react-native';
import {useTheme} from "@/context/UseTheme";
import CarCard from "@/components/CarCard";
import {Button} from "react-native-paper";

const CAR_PARAMS = [
    { label: 'HP',   value: '300'  },
    { label: 'MPG',  value: '32'   },
    { label: '0–60', value: '5.2s' },
];

export default function TabTwoScreen() {
    const { colors } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <CarCard
                imageSource={require('../../assets/images/malibu-1.png')}
                name="Chevrolet Malibu"
                releaseYear="2023"
                mileage="50000"
                description="Comfortable mid-size sedan with adaptive cruise and heated seats."
                city="Minsk"
                publicationDate="12.01.2025"
                params={CAR_PARAMS}
            />

            <CarCard
                imageSource={require('../../assets/images/malibu-1.png')}
                name="Chevrolet Malibu"
                releaseYear="2023"
                mileage="50000"
                description="Next service due in 1,200 miles."
                params={[
                    { label: 'Miles',   value: '34,210' },
                    { label: 'Service', value: 'Due'    },
                ]}
                publicationDate="12.01.2025"
                actions={
                    <>
                        <Button mode="elevated" compact onPress={() => {}}>
                            Edit
                        </Button>
                        <Button mode="outlined" compact onPress={() => {}}>
                            Remove
                        </Button>
                    </>
                }
            />
        </ScrollView>
    );
}
