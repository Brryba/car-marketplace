import ControlledInput from "@/components/ui/car-form/ControlledInput";
import ControlledPicker from "@/components/ui/car-form/ControlledPicker";
import { useTheme } from "@/context/UseTheme";
import { CarFormData, carSchema } from "@/types/schemas/car-schema";
import {BODY_TYPES, COLORS, FUEL_TYPES, TRANSMISSIONS} from "@/types/car-types";
import React, { useEffect } from 'react';
import {Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslations} from "@/context/useTranslations";
import ImageSelector from "@/components/ui/car-form/ImageSelector";
import {Button} from "react-native-paper";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import delay = Animated.delay;

export type Mode = "create" | "edit";

export interface CarFormProps {
    carFormData?: CarFormData;
    actions?: React.ReactNode;
    mode: Mode;
    onSubmit: (data: CarFormData) => void;
}

const INITIAL_DATA: CarFormData = {
    make: '', model: '', releaseYear: 0, mileage: 0, price: 0,
    city: '', description: '', transmission: TRANSMISSIONS[0], fuelType: FUEL_TYPES[0],
    engineSize: '', color: COLORS[0], bodyType: BODY_TYPES[0], vin: '', photo: ''
};

export default function CarForm({ carFormData, actions, mode, onSubmit }: CarFormProps) {
    const [formData, setFormData] = React.useState<CarFormData>(INITIAL_DATA);
    const [errors, setErrors] = React.useState<Partial<Record<keyof CarFormData, string>>>({});
    const [loading, setLoading] = React.useState<boolean>(false);
    const { colors } = useTheme();

    const { tr } = useTranslations();

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

    const handleSubmit = async () => {
        const result = carSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof CarFormData, string>> = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0] as keyof CarFormData;
                if (field) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            setLoading(true);
            await onSubmit(result.data);
        } finally {
            setLoading(false);
        }
    };

    const bind = (field: keyof CarFormData) => ({
        value: String(formData[field] || ''),
        formData: formData,
        handleChange: (text: string) => handleChange(field, text),
        errors: errors,
    });

    return (
        <LoadingWrapper isLoading={loading}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                    style={{ backgroundColor: colors.background, flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <ImageSelector
                        formData={formData}
                        handleChange={(uri: string) => handleChange("photo", uri)}
                    />
                    <View style={{ flex: 1, gap: 12 }}>

                        <View style={styles.row}>
                            <ControlledInput {...bind('releaseYear')} field="releaseYear" label={tr.car.releaseYear} keyboardType="numeric" flex={1} />
                            <ControlledInput {...bind('mileage')} field="mileage" label={tr.car.mileage} keyboardType="numeric" flex={1} />
                        </View>
                        <View style={styles.row}>
                            <ControlledInput {...bind('price')} field="price" label={tr.car.price} keyboardType="numeric" flex={1} />
                            <ControlledInput {...bind('city')} field="city" label={tr.car.city} flex={1} />
                        </View>
                        <View style={styles.row}>
                            <ControlledInput {...bind('make')} field="make" label={tr.car.make} flex={1} />
                            <ControlledInput {...bind('model')} field="model" label={tr.car.model} flex={1} />
                        </View>
                        <View style={styles.row}>
                            <ControlledPicker
                                {...bind('transmission')}
                                field="transmission"
                                label={tr.car.transmission}
                                onValueChange={(val) => handleChange('transmission', val)}
                                items={TRANSMISSIONS}
                                flex={1}
                            />
                            <ControlledPicker
                                {...bind('fuelType')}
                                field="fuelType"
                                label={tr.car.fuelType}
                                onValueChange={(val) => handleChange('fuelType', val)}
                                items={FUEL_TYPES}
                                flex={1}
                            />
                        </View>
                        <View style={styles.row}>
                            <ControlledInput {...bind('engineSize')} field="engineSize" label={tr.car.engineSize} flex={1} />
                            <ControlledInput {...bind('color')} field="color" label={tr.car.color} flex={1} />
                        </View>
                        <View style={styles.row}>
                            <ControlledPicker
                                {...bind('bodyType')}
                                field="bodyType"
                                label={tr.car.bodyType}
                                onValueChange={(val) => handleChange('bodyType', val)}
                                items={BODY_TYPES}
                                flex={1}
                            />
                            <ControlledInput {...bind('vin')} field="vin" label={tr.car.vin} flex={1} />
                        </View>

                        <ControlledInput {...bind('description')} field="description" label={tr.car.description} multiline flex={1} />

                        <View style={{ marginTop: 'auto', paddingTop: 16, gap: 12 }}>
                            <Button mode="contained"
                                    style={{ backgroundColor: colors.accent }}
                                    labelStyle={{ color: colors.accentText }}
                                    onPress={handleSubmit}
                                    disabled={loading}>
                                {mode === "create" ? tr.buttons.create : tr.buttons.edit}
                            </Button>
                            {actions}
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LoadingWrapper>
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
    photoContainer: {
        width: '100%',
        marginBottom: 8,
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    photoPlaceholder: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        margin: 0,
    },
    removePhotoButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        margin: 0,
    },
});