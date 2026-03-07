import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useTheme} from "@/context/UseTheme";

interface ItemProps {
    label: string;
    value: string;
}

interface SettingsPickerProps {
    name: string;
    initialValue: string;
    onChange: (value: any) => void;
    items: ItemProps[];
}

export function SettingsPicker({initialValue, onChange, name, items}: SettingsPickerProps) {
    const {colors} = useTheme();

    return <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{marginLeft: 20, fontSize: 16, color: colors.text}}>
            {name}
        </Text>
        <View style={{width: 175}}>
            <Picker
                selectedValue={initialValue}
                onValueChange={onChange}
                style={{color: colors.text}}
                dropdownIconColor={colors.textSecondary}
                mode="dropdown"
            >
                {items.map((item) => (
                    <Picker.Item
                        label={item.label}
                        key={item.value}
                        value={item.value}
                        color={colors.text}
                        style={{ backgroundColor: colors.background, fontSize: 16 }}
                    />
                ))}
            </Picker>
        </View>
    </View>
}