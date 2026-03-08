import { useTheme } from "@/context/UseTheme";
import { CarFormData } from "@/schemas/car-schema";
import React from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

interface ControlledInputProps {
    field: keyof CarFormData;
    label: string;
    formData: CarFormData;
    errors: Partial<Record<keyof CarFormData, string>>;
    handleChange: (value: string) => void;
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
            value={formData[field]?.toString()}
            onChangeText={(text) => handleChange(text)}
            mode="outlined"
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            style={[
                { backgroundColor: colors.content, height: 56 },
                multiline && styles.multiline,
            ]}
            outlineColor={colors.border}
            activeOutlineColor={colors.accent}
            textColor={colors.text}
            error={!!errors[field]}
        />
        <View style={multiline ? { marginBottom: 12 } : styles.errorContainer}>
            {errors[field] ? (
                <HelperText type="error" visible={true} style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                    {errors[field]}
                </HelperText>
            ) : null}
        </View>
    </View>
}

const styles = StyleSheet.create({
    errorContainer: {
        height: 24,
        justifyContent: 'center',
    },
    multiline: { minHeight: 100 },
});