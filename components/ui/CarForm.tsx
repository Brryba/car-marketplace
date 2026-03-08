import { useTheme } from "@/context/UseTheme";
import React, { useEffect, useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import ControlledInput from "@/components/ui/ControlledInput";

export interface CarFormData {
    make: string;
    model: string;
    releaseYear: string;
    mileage: string;
    price: string;
    city: string;
    description: string;
    transmission: string;
    fuelType: string;
    engineSize: string;
    color: string;
    bodyType: string;
    vin: string;
}

export interface CarFormProps {
    carFormData?: CarFormData;
    actions?: React.ReactNode;
}

const INITIAL_DATA: CarFormData = {
    releaseYear: '', mileage: '', price: '', city: '', description: '',
    make: '', model: '', transmission: '', fuelType: '', engineSize: '',
    color: '', bodyType: '', vin: ''
};

export default function CarForm({ carFormData, actions }: CarFormProps) {
    const { colors } = useTheme();
    const [formData, setFormData] = useState<CarFormData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof CarFormData, string>>>({});

    useEffect(() => {
        if (carFormData) setFormData({ ...carFormData });
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

    const inputProps = { formData, errors, handleChange };

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
                <View style={{ flex: 1, gap: 12 }}>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="releaseYear" label="Year" keyboardType="numeric" flex={1} {...inputProps} />
                        <ControlledInput field="mileage" label="Mileage (km)" keyboardType="numeric" flex={1} {...inputProps} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="price" label="Price" keyboardType="numeric" flex={1} {...inputProps} />
                        <ControlledInput field="city" label="City" flex={1} {...inputProps} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="make" label="Make (Brand)" flex={1} {...inputProps} />
                        <ControlledInput field="model" label="Model" flex={1} {...inputProps} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="transmission" label="Transmission" flex={1} {...inputProps} />
                        <ControlledInput field="fuelType" label="Fuel Type" flex={1} {...inputProps} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="engineSize" label="Engine (e.g., 2.0L)" flex={1} {...inputProps} />
                        <ControlledInput field="color" label="Color" flex={1} {...inputProps} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <ControlledInput field="bodyType" label="Body Type" flex={1} {...inputProps} />
                        <ControlledInput field="vin" label="VIN Number" flex={1} {...inputProps} />
                    </View>

                    <ControlledInput field="description" label="Description" multiline flex={1} {...inputProps} />

                    <View style={{ marginTop: 'auto', paddingTop: 16, gap: 12 }}>
                        {actions}
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}