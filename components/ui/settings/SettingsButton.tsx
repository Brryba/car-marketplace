import {Button} from "react-native-paper";
import {useTheme} from "@/context/useTheme";

interface SettingsButtonProps {
    name: string;
    onPress: (value: any) => void;
}

export function SettingsButton({name, onPress} : SettingsButtonProps) {
    const { colors } = useTheme();

    return <Button
        onPress={onPress}
        style={{ paddingLeft: 8, height: 50, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}
        contentStyle={{ height: 50, justifyContent: 'flex-start' }}
        labelStyle={{ fontSize: 16, color: colors.text, fontWeight: '400', fontFamily: 'System' }}
    >
        {name}
    </Button>
}