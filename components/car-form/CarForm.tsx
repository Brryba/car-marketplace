import ControlledInput from "@/components/car-form/ControlledInput";
import ControlledPicker from "@/components/car-form/ControlledPicker";
import {useTheme} from "@/context/useTheme";
import {CarEntity, CarFormData, useCarSchema} from "@/types/schemas/car-schema";
import {BODY_TYPES, COLORS, FUEL_TYPES, TRANSMISSIONS} from "@/types/car-types";
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslations} from "@/context/useTranslations";
import ImageSelector from "@/components/car-form/ImageSelector";
import {Button} from "react-native-paper";
import {useAsyncPress} from "@/hooks/useAsyncPress";
import {useCarMakes} from "@/hooks/api/useCarMakes";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {useCarModels} from "@/hooks/api/useCarModels";

export type Mode = "create" | "edit";

export interface CarFormProps {
    carEntity?: CarEntity | null;
    actions?: React.ReactNode;
    mode: Mode;
    onSubmit: (data: CarFormData) => void;
}

const INITIAL_DATA: CarFormData = {
    make: '', model: '', releaseYear: 2026, mileage: 0, price: 0,
    city: '', description: '', transmission: TRANSMISSIONS[0], fuelType: FUEL_TYPES[0],
    engineSize: '', color: COLORS[0], bodyType: BODY_TYPES[0], vin: '', photo: ''
};

export default function CarForm({ carEntity, actions, mode, onSubmit }: CarFormProps) {
    const [formData, setFormData] = React.useState<CarFormData>(INITIAL_DATA);
    const [errors, setErrors] = React.useState<Partial<Record<keyof CarFormData, string>>>({});
    const { colors } = useTheme();
    const { carSchema } = useCarSchema();
    const { handleAsyncPress } = useAsyncPress();
    const {data: makes, isLoading: makesLoading, isError: makesError} = useCarMakes();
    const {data: models, isLoading: modelsLoading, isError: modelsError} = useCarModels(formData.make);

    const { tr } = useTranslations();

    useEffect(() => {
        if (carEntity) setFormData({ ...carEntity });
    }, [carEntity]);

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

        await handleAsyncPress(onSubmit, result.data);
    };

    const bind = (field: keyof CarFormData) => ({
        value: String(formData[field] || ''),
        formData: formData,
        handleChange: (text: string) => handleChange(field, text),
        errors: errors,
    });

    if (makesError || modelsError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Text style={{ color: colors.error }}>{tr.errors.loadFailed}</Text>
            </View>
        );
    }

    return (
        <LoadingWrapper isLoading={makesLoading || modelsLoading}>
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
                            <ControlledPicker
                                {...bind('make')}
                                field="make"
                                label={tr.car.make}
                                onValueChange={(val) => handleChange('make', val) }
                                items={makes ?? []}
                            />
                            <ControlledPicker
                                {...bind('model')}
                                field="model"
                                label={tr.car.model}
                                onValueChange={(val) => handleChange('model', val)}
                                items={models ?? []}
                                enabled={formData.make !== ''}
                            />
                        </View>
                        <View style={styles.row}>
                            <ControlledPicker
                                {...bind('transmission')}
                                field="transmission"
                                label={tr.car.transmission}
                                onValueChange={(val) => handleChange('transmission', val)}
                                items={TRANSMISSIONS}
                            />
                            <ControlledPicker
                                {...bind('fuelType')}
                                field="fuelType"
                                label={tr.car.fuelType}
                                onValueChange={(val) => handleChange('fuelType', val)}
                                items={FUEL_TYPES}
                            />
                        </View>
                        <View style={styles.row}>
                            <ControlledInput {...bind('engineSize')} field="engineSize" label={tr.car.engineSize} flex={1} />
                            <ControlledPicker
                                {...bind('color')}
                                field="color"
                                label={tr.car.color}
                                onValueChange={(val) => handleChange('color', val)}
                                items={COLORS}
                            />
                        </View>
                        <View style={styles.row}>
                            <ControlledPicker
                                {...bind('bodyType')}
                                field="bodyType"
                                label={tr.car.bodyType}
                                onValueChange={(val) => handleChange('bodyType', val)}
                                items={BODY_TYPES}
                            />
                            <ControlledInput {...bind('vin')} field="vin" label={tr.car.vin} flex={1} />
                        </View>

                        <ControlledInput {...bind('description')} field="description" label={tr.car.description} multiline flex={1} />

                        <View style={{ marginTop: 'auto', paddingTop: 16, gap: 12 }}>
                            <Button mode="contained"
                                    style={{ backgroundColor: colors.accent }}
                                    labelStyle={{ color: colors.accentText }}
                                    onPress={handleSubmit}>
                                {mode === "create" ? tr.buttons.create : tr.buttons.save}
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