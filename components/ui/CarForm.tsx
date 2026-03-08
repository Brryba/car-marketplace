import { useTheme } from "@/context/UseTheme";
import { CarParam } from "@/types/global-types";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';

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

    useEffect(() => {
        if (carFormData) {
            setFormData({ ...carFormData });
        }
    }, [carFormData]);

    const handleChange = (field: keyof CarFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
        marginBottom: 12,
    };

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
                    <TextInput
                        label="Car Name"
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        mode="outlined"
                        style={inputStyle}
                        outlineColor={colors.border}
                        activeOutlineColor={colors.accent}
                        textColor={colors.text}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            label="Year"
                            value={formData.releaseYear}
                            onChangeText={(text) => handleChange('releaseYear', text)}
                            mode="outlined"
                            style={[inputStyle, { flex: 1, marginRight: 6 }]}
                            keyboardType="numeric"
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                        />
                        <TextInput
                            label="Mileage (km)"
                            value={formData.mileage}
                            onChangeText={(text) => handleChange('mileage', text)}
                            mode="outlined"
                            style={[inputStyle, { flex: 1, marginLeft: 6 }]}
                            keyboardType="numeric"
                            outlineColor={colors.border}
                            activeOutlineColor={colors.accent}
                            textColor={colors.text}
                        />
                    </View>

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
                    />

                    <TextInput
                        label="City"
                        value={formData.city}
                        onChangeText={(text) => handleChange('city', text)}
                        mode="outlined"
                        style={inputStyle}
                        outlineColor={colors.border}
                        activeOutlineColor={colors.accent}
                        textColor={colors.text}
                    />

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