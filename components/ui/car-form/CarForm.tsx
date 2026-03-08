import ControlledInput from "@/components/ui/car-form/ControlledInput";
import ControlledPicker from "@/components/ui/car-form/ControlledPicker";
import { useTheme } from "@/context/UseTheme";
import { CarFormData, carSchema } from "@/schemas/car-schema";
import { BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from "@/types/global-types";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export interface CarFormProps {
    carFormData?: CarFormData;
    actions?: React.ReactNode;
}

const INITIAL_DATA: CarFormData = {
    make: '', model: '', releaseYear: 0, mileage: 0, price: 0,
    city: '', description: '', transmission: TRANSMISSIONS[0], fuelType: FUEL_TYPES[0],
    engineSize: '', color: '', bodyType: BODY_TYPES[0], vin: ''
};

export default function CarForm({ carFormData, actions }: CarFormProps) {
    const [formData, setFormData] = useState<CarFormData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof CarFormData, string>>>({});
    const { colors } = useTheme();

    useEffect(() => {
        if (carFormData) setFormData({ ...carFormData });
    }, [carFormData]);

    const handleChange = (field: keyof CarFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        const result = carSchema.shape[field].safeParse(value);
        setErrors(prev => ({
            ...prev,
            [field]: result.success ? undefined : result.error.issues[0].message,
        }));
    };

    const bind = (field: keyof CarFormData) => ({
        value: String(formData[field]),
        formData: formData,
        handleChange: (text: string) => handleChange(field, text),
        errors: errors,
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                style={{ backgroundColor: colors.background, flex: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1, gap: 12 }}>

                    <View style={styles.row}>
                        <ControlledInput {...bind('releaseYear')} field="releaseYear" label="Year" keyboardType="numeric" flex={1} />
                        <ControlledInput {...bind('mileage')} field="mileage" label="Mileage (km)" keyboardType="numeric" flex={1} />
                    </View>
                    <View style={styles.row}>
                        <ControlledInput {...bind('price')} field="price" label="Price, $" keyboardType="numeric" flex={1} />
                        <ControlledInput {...bind('city')} field="city" label="City" flex={1} />
                    </View>
                    <View style={styles.row}>
                        <ControlledInput {...bind('make')} field="make" label="Make (Brand)" flex={1} />
                        <ControlledInput {...bind('model')} field="model" label="Model" flex={1} />
                    </View>
                    <View style={styles.row}>
                        <ControlledPicker
                            {...bind('transmission')}
                            field="transmission"
                            label="Transmission"
                            onValueChange={(val) => handleChange('transmission', val)}
                            items={TRANSMISSIONS}
                            flex={1}
                        />
                        <ControlledPicker
                            {...bind('fuelType')}
                            field="fuelType"
                            label="Fuel Type"
                            onValueChange={(val) => handleChange('fuelType', val)}
                            items={FUEL_TYPES}
                            flex={1}
                        />
                    </View>
                    <View style={styles.row}>
                        <ControlledInput {...bind('engineSize')} field="engineSize" label="Engine (e.g. 2.0L)" flex={1} />
                        <ControlledInput {...bind('color')} field="color" label="Color" flex={1} />
                    </View>
                    <View style={styles.row}>
                        <ControlledPicker
                            {...bind('bodyType')}
                            field="bodyType"
                            label="Body Type"
                            onValueChange={(val) => handleChange('bodyType', val)}
                            items={BODY_TYPES}
                            flex={1}
                        />
                        <ControlledInput {...bind('vin')} field="vin" label="VIN Number" flex={1} />
                    </View>

                    <ControlledInput {...bind('description')} field="description" label="Description" multiline flex={1} />

                    <View style={{ marginTop: 'auto', paddingTop: 16, gap: 12 }}>
                        {actions}
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: "flex-end",
        gap: 12,
        marginBottom: 8
    },
    multiline: { minHeight: 100 },
});