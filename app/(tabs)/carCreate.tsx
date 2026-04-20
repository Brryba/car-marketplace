import CarForm from "@/components/car-form/CarForm";
import { useTheme } from "@/context/useTheme";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {useTranslations} from "@/context/useTranslations";
import {useCarStorage} from "@/hooks/local-storage/useCarStorage";
import {useRouter} from "expo-router";
import {firebaseCarRepository} from "@/db/firebase/car-firebase-repository";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useState} from "react";

export default function CarCreateScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { saveCar } = useCarStorage(firebaseCarRepository);
    const router = useRouter();

    return <LoadingWrapper isLoading={isLoading}>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <CarForm
                mode="create"
                onSubmit={async (data) => {
                    setIsLoading(false);
                    await saveCar(data);
                    router.push('/');
                    setIsLoading(true);
                }}
                actions={
                    <>
                        <Button mode="outlined"
                                textColor={colors.accent} style={{ borderColor: colors.accent }}
                                onPress={() => router.push('/')}>
                            {tr.buttons.cancel}
                        </Button>
                    </>
                }
            />
        </View>
    </LoadingWrapper>
}