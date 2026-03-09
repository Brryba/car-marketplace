import { useTheme } from '@/context/UseTheme';
import { CarFormData } from "@/schemas/car-schema";
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import {useTranslations} from "@/context/useTranslations";

interface ControlledPickerProps {
    field: keyof CarFormData;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    items: readonly string[];
    errors: Partial<Record<keyof CarFormData, string>>;
    flex?: number;
}

export default function ControlledPicker({
    field, label, value, onValueChange, items, errors, flex
}: ControlledPickerProps) {
    const { colors } = useTheme();
    const { tr } = useTranslations();

    // @ts-ignore
    return (
        <View style={{ flex: flex || 1 }}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            <View style={[
                styles.pickerContainer,
                {
                    backgroundColor: colors.content,
                    borderColor: errors[field] ? colors.error : colors.border,
                }
            ]}>
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onValueChange(itemValue as string)}
                    style={{ color: colors.text, height: 56, width: '100%', backgroundColor: 'transparent' }}
                    dropdownIconColor={colors.text}
                    mode="dropdown"
                    numberOfLines={100}
                >
                    {items.map((item) => (
                        <Picker.Item
                            key={item}
                            label={(tr[field as keyof typeof tr] as Record<string, string>)?.[item]}
                            value={item}
                            color={colors.text}
                            style={{ backgroundColor: colors.content }}
                        />
                    ))}
                </Picker>
            </View>
            <View style={styles.errorContainer}>
                {errors[field] ? (
                    <HelperText type="error" visible={true} style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                        {errors[field]}
                    </HelperText>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        marginBottom: 2,
        marginLeft: 10,
        fontWeight: '500',
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 4,
        height: 56,
        justifyContent: 'center',
    },
    errorContainer: {
        height: 24,
        justifyContent: 'center',
    },
});
