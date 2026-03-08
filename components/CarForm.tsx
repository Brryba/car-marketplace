import { useTheme } from "@/context/UseTheme";
import { CarParam } from "@/types/global-types";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, IconButton, TextInput } from 'react-native-paper';

export interface CarFormData {
    name: string;
    releaseYear: string;
    mileage: string;
    description: string;
    price: string;
    city: string;
    params: CarParam[];
}

export interface CarFormProps {
    carFormData?: CarFormData;
    actions?: React.ReactNode;
}

export default function CarForm({ carFormData, actions }: CarFormProps) {
    const { colors } = useTheme();

    const [formData, setFormData] = useState<CarFormData>({
        name: '',
        releaseYear: '',
        mileage: '',
        description: '',
        price: '',
        city: '',
        params: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CarFormData, string>>>({});

    useEffect(() => {
        if (carFormData) {
            setFormData({ ...carFormData });
        }
    }, [carFormData]);

    const validateField = (field: keyof CarFormData, value: string) => {
        let error = '';
        if (!value.trim() && field !== 'description') {
            error = 'This field is required';
        } else if (['releaseYear', 'mileage', 'price'].includes(field)) {
            if (isNaN(Number(value))) {
                error = 'Must be a number';
            } else if (Number(value) < 0) {
                error = 'Must be positive';
            } else if (field === 'releaseYear') {
                const year = Number(value);
                const currentYear = new Date().getFullYear();
                if (year < 1900 || year > currentYear + 1) {
                    error = 'Invalid year';
                }
            }
        }
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleChange = (field: keyof CarFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const addParam = () =>
        setFormData(prev => ({ ...prev, params: [...prev.params, { label: '', value: '' }] }));

    const removeParam = (index: number) =>
        setFormData(prev => ({ ...prev, params: prev.params.filter((_, i) => i !== index) }));

    const handleParamChange = (index: number, field: keyof CarParam, value: string) =>
        setFormData(prev => {
            const params = [...prev.params];
            params[index] = { ...params[index], [field]: value };
            return { ...prev, params };
        });

    const inputStyle = {
        backgroundColor: colors.content,
        marginBottom: 4,
    };

    const containerStyle = { marginBottom: 12 };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                style={{ backgroundColor: colors.background, flex: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1 }}>
                    <View style={containerStyle}>
                        <TextInput
                            label="Car Name"
                            value={formData.name}
                            onChangeText={(text) => handleChange('name', text)}
                            mode="outlined"
                            style={inputStyle}
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                            error={!!errors.name}
                        />
                        {errors.name && <HelperText type="error">{errors.name}</HelperText>}
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                label="Year"
                                value={formData.releaseYear}
                                onChangeText={(text) => handleChange('releaseYear', text)}
                                mode="outlined"
                                style={inputStyle}
                                keyboardType="numeric"
                                outlineColor={colors.border}
                                activeOutlineColor={colors.accent}
                                textColor={colors.text}
                                error={!!errors.releaseYear}
                            />
                            {errors.releaseYear && <HelperText type="error">{errors.releaseYear}</HelperText>}
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                label="Mileage (km)"
                                value={formData.mileage}
                                onChangeText={(text) => handleChange('mileage', text)}
                                mode="outlined"
                                style={inputStyle}
                                keyboardType="numeric"
                                outlineColor={colors.border}
                                activeOutlineColor={colors.accent}
                                textColor={colors.text}
                                error={!!errors.mileage}
                            />
                            {errors.mileage && <HelperText type="error">{errors.mileage}</HelperText>}
                        </View>
                    </View>

                    <View style={containerStyle}>
                        <TextInput
                            label="Price"
                            value={formData.price}
                            onChangeText={(text) => handleChange('price', text)}
                            mode="outlined"
                            style={inputStyle}
                            keyboardType="numeric"
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                            error={!!errors.price}
                        />
                        {errors.price && <HelperText type="error">{errors.price}</HelperText>}
                    </View>

                    <View style={containerStyle}>
                        <TextInput
                            label="City"
                            value={formData.city}
                            onChangeText={(text) => handleChange('city', text)}
                            mode="outlined"
                            style={inputStyle}
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                            error={!!errors.city}
                        />
                        {errors.city && <HelperText type="error">{errors.city}</HelperText>}
                    </View>

                    <View style={containerStyle}>
                        <TextInput
                            label="Description"
                            value={formData.description}
                            onChangeText={(text) => handleChange('description', text)}
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[inputStyle, styles.multiline]}
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                        />
                    </View>

                    <View style={{ gap: 4, marginBottom: 8 }}>
                        {formData.params.map((p, i) => (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    label="Label"
                                    value={p.label}
                                    onChangeText={(v) => handleParamChange(i, 'label', v)}
                                    mode="outlined"
                                    style={[inputStyle, { flex: 1, marginRight: 6 }]}
                                    outlineColor={colors.border}
                                    activeOutlineColor={colors.accent}
                                    textColor={colors.text}
                                />
                                <TextInput
                                    label="Value"
                                    value={p.value}
                                    onChangeText={(v) => handleParamChange(i, 'value', v)}
                                    mode="outlined"
                                    style={[inputStyle, { flex: 1, marginLeft: 6 }]}
                                    outlineColor={colors.border}
                                    activeOutlineColor={colors.accent}
                                    textColor={colors.text}
                                />
                                <IconButton icon="close" onPress={() =>
                                    removeParam(i)} iconColor={colors.textSecondary} />
                            </View>
                        ))}
                        <Button mode="text" icon="plus" onPress={addParam} textColor={colors.accent}>
                            Add param
                        </Button>
                    </View>

                    <View style={{ marginTop: 'auto', paddingTop: 16, gap: 12 }}>
                        {actions}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    multiline: { minHeight: 100 },
});
