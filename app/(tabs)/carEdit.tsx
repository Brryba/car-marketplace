import CarForm from "@/components/ui/CarForm";
import {View} from "react-native";
import {Button} from "react-native-paper";
import {useTheme} from "@/context/UseTheme";

export default function CarEditScreen() {
    const { colors } = useTheme();

    return <View style={{ flex: 1, backgroundColor: colors.background }}>
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
}
