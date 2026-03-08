import {KeyboardTypeOptions, StyleSheet, View} from "react-native";
import {HelperText, TextInput} from "react-native-paper";
import React from "react";
import {CarFormData} from "@/components/ui/CarForm";
import {useTheme} from "@/context/UseTheme";

interface ControlledInputProps {
    field: keyof CarFormData;
    label: string;
    formData: CarFormData;
    errors: Partial<Record<keyof CarFormData, string>>;
    handleChange: (field: keyof CarFormData, value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    flex?: number;
}

export default function ControlledInput({
                             field, label, formData, errors, handleChange, keyboardType = 'default', multiline = false, flex
                         }: ControlledInputProps) {
    const { colors } = useTheme();

    return <View style={{ flex: flex || 1, marginBottom: multiline ? 12 : 0 }}>
        <TextInput
            label={label}
            value={formData[field]}
            onChangeText={(text) => handleChange(field, text)}
            mode="outlined"
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            style={[
                { backgroundColor: colors.content, marginBottom: 4 },
                multiline && styles.multiline
            ]}
            outlineColor={colors.border}
            activeOutlineColor={colors.accent}
            textColor={colors.text}
            error={!!errors[field]}
        />
        {errors[field] && <HelperText type="error" style={{ paddingVertical: 0 }}>{errors[field]}</HelperText>}
    </View>
}

const styles = StyleSheet.create({
    multiline: { minHeight: 100 },
});