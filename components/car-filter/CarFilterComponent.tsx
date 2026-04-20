import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/context/useTheme';
import { CarFilters } from "@/types/car-filters";
import { useTranslations } from "@/context/useTranslations";
import {useCarMakes} from "@/hooks/api/useCarMakes";
import {useCarModels} from "@/hooks/api/useCarModels";
import LoadingWrapper from "@/components/ui/LoadingWrapper";

export const EMPTY_FILTERS: CarFilters = {
    make: undefined,
    model: undefined,
    yearFrom: undefined,
    yearTo: undefined,
    city: undefined,
    sortBy: undefined,
    sortOrder: undefined,
};

interface Props {
    isOpen: boolean;
    onSubmitClick: (filters: CarFilters) => void;
}

export default function CarFilterComponent({ isOpen, onSubmitClick }: Props) {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const [filters, setFilters] = useState<CarFilters>(EMPTY_FILTERS);
    const {data: makes, isLoading: makesLoading, isError: makesError} = useCarMakes();
    const {data: models, isLoading: modelsLoading, isError: modelsError} = useCarModels(filters.make);

    const SORT_OPTIONS = [
        { label: tr.filter.sorting.noSorting,       sortBy: null,      sortOrder: 'asc'  },
        { label: tr.filter.sorting.mileageAsc,      sortBy: 'mileage', sortOrder: 'asc'  },
        { label: tr.filter.sorting.mileageDesc,     sortBy: 'mileage', sortOrder: 'desc' },
        { label: tr.filter.sorting.releaseYearAsc,  sortBy: 'year',    sortOrder: 'asc'  },
        { label: tr.filter.sorting.releaseYearDesc, sortBy: 'year',    sortOrder: 'desc' },
    ] as const;

    const handleChange = (field: keyof CarFilters, value: CarFilters[keyof CarFilters]) => {
        setFilters(prev => ({
            ...prev,
            [field]: value,
            ...(field === 'make' ? { model: '' } : {}),
        }));
    };

    const handleSortChange = (label: string) => {
        const option = SORT_OPTIONS.find(o => o.label === label);
        if (!option) return;
        setFilters(prev => ({ ...prev, sortBy: option.sortBy, sortOrder: option.sortOrder }));
    };

    const currentSortLabel = SORT_OPTIONS.find(
        o => o.sortBy === filters.sortBy && o.sortOrder === filters.sortOrder
    )?.label ?? tr.filter.sorting.noSorting;

    const handleSave = () => onSubmitClick(filters);

    const handleReset = () => {
        setFilters(EMPTY_FILTERS);
        onSubmitClick(EMPTY_FILTERS);
    };

    const s = styles(colors);

    if (!isOpen) return null;

    if (makesError || modelsError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Text style={{ color: colors.error, textAlign: 'center' }}>{tr.errors.loadFailed}</Text>
            </View>
        );
    }

    return (
        <LoadingWrapper isLoading={makesLoading || modelsLoading}>
            <View style={s.container}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                    {/* Make and Model */}
                    <View style={s.row}>
                        <View style={{ flex: 1, marginRight: 6 }}>
                            <Text style={s.label}>{tr.filter.labels.make}</Text>
                            <View style={s.pickerWrap}>
                                <Picker
                                    selectedValue={filters.make}
                                    onValueChange={v => handleChange('make', v)}
                                    style={s.picker}
                                    dropdownIconColor={colors.text}
                                    mode="dropdown"
                                >
                                    {['', ...(makes ?? [])].map(m => (
                                        <Picker.Item
                                            key={m}
                                            label={m || tr.filter.labels.anyMake}
                                            value={m}
                                            color={colors.text}
                                            style={{ backgroundColor: colors.content }}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{ flex: 1, marginLeft: 6 }}>
                            <Text style={s.label}>{tr.filter.labels.model}</Text>
                            <View style={s.pickerWrap}>
                                <Picker
                                    selectedValue={filters.model ?? ''}
                                    onValueChange={v => handleChange('model', v)}
                                    style={s.picker}
                                    dropdownIconColor={colors.text}
                                    enabled={!!filters.make}
                                    mode="dropdown"
                                >
                                    {['', ...(models ?? [])].map(m => (
                                        <Picker.Item
                                            key={m}
                                            label={m || tr.filter.labels.anyModel}
                                            value={m}
                                            color={colors.text}
                                            style={{ backgroundColor: colors.content }}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* Year */}
                    <Text style={s.label}>{tr.filter.labels.releaseYear}</Text>
                    <View style={s.row}>
                        <TextInput
                            style={[s.input, { flex: 1, marginRight: 6 }]}
                            value={filters.yearFrom ? String(filters.yearFrom) : ''}
                            onChangeText={v => {
                                const num = v.replace(/[^0-9]/g, '');
                                handleChange('yearFrom', num ? Number(num) : undefined);
                            }}
                            placeholder={tr.filter.labels.from}
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            maxLength={4}
                        />

                        <TextInput
                            style={[s.input, { flex: 1, marginLeft: 6 }]}
                            value={filters.yearTo ? String(filters.yearTo) : ''}
                            onChangeText={v => {
                                const num = v.replace(/[^0-9]/g, '');
                                handleChange('yearTo', num ? Number(num) : undefined);
                            }}
                            placeholder={tr.filter.labels.to}
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                    </View>

                    {/* City */}
                    <Text style={s.label}>{tr.filter.labels.city}</Text>
                    <TextInput
                        style={[s.input, { marginBottom: 20 }]}
                        value={filters.city}
                        onChangeText={v => handleChange('city', v)}
                        placeholder={tr.filter.labels.enterCity}
                        placeholderTextColor={colors.textSecondary}
                    />

                    {/* Sorting */}
                    <Text style={s.label}>{tr.filter.labels.sortingLabel}</Text>
                    <View style={[s.pickerWrap, { marginBottom: 20 }]}>
                        <Picker
                            selectedValue={currentSortLabel}
                            onValueChange={handleSortChange}
                            style={s.picker}
                            dropdownIconColor={colors.text}
                            mode="dropdown"
                        >
                            {SORT_OPTIONS.map(o => (
                                <Picker.Item
                                    key={o.label}
                                    label={o.label}
                                    value={o.label}
                                    color={colors.text}
                                    style={{ backgroundColor: colors.content }}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Buttons */}
                    <View style={s.row}>
                        <TouchableOpacity style={s.resetBtn} onPress={handleReset}>
                            <Text style={s.resetText}>{tr.filter.buttons.clear}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.accent }]} onPress={handleSave}>
                            <Text style={s.saveText}>{tr.filter.buttons.submit}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </LoadingWrapper>
    );
}

const styles = (colors: any) => StyleSheet.create({
    container: {
        backgroundColor: colors.content,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.textSecondary,
        marginBottom: 2,
        marginLeft: 4,
    },
    pickerWrap: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.border,
        backgroundColor: colors.content,
        height: 56,
        justifyContent: 'center',
        marginBottom: 10,
    },
    picker: {
        color: colors.text,
        height: 56,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.border,
        backgroundColor: colors.content,
        color: colors.text,
        height: 52,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    resetBtn: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    resetText: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    saveBtn: {
        flex: 2,
        height: 44,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
});