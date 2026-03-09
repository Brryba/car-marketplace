import { useTheme } from "@/context/useTheme";
import { useTranslations } from "@/context/useTranslations";
import { CarEntity } from "@/types/schemas/car-schema";
import { Image } from "expo-image";
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import EmptyPhoto from "@/components/ui/EmptyPhoto";

export interface CarCardProps {
    car: CarEntity;
    actions?: React.ReactNode;
}

export default function CarCard({
    car, actions
}: CarCardProps) {
    const { colors } = useTheme();
    const { tr } = useTranslations();

    const params = [
        { label: tr.car.transmission, value: tr.transmission[car.transmission] },
        { label: tr.car.fuelType, value: tr.fuelType[car.fuelType] },
        { label: tr.car.bodyType, value: tr.bodyType[car.bodyType] },
        { label: tr.car.engineSize, value: car.engineSize },
        { label: tr.car.color, value: tr.color[car.color] }
    ];

    return (
        <Card style={[styles.card, { backgroundColor: colors.content }]} elevation={2}>
            <View>
                {car.photo ? (
                    <Image source={{ uri: car.photo }} style={{ width: '100%', aspectRatio: 16 / 9 }} />
                ) : (
                    <EmptyPhoto/>
                )}

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={[styles.name, { color: colors.text }]}
                                numberOfLines={1}>
                                {car.make} {car.model} {car.releaseYear}
                            </Text>
                            <Text style={[styles.name, { color: colors.accent, fontSize: 18 }]}
                                numberOfLines={1}>
                                {car.price} $
                            </Text>
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textSecondary }}>
                            {car.city}  ● {car.mileage} {tr.helpers.kms}
                        </Text>
                    </View>

                    {car.description ? (
                        <Text style={{ fontSize: 12, color: colors.textSecondary, lineHeight: 17 }}>
                            {car.description}
                        </Text>
                    ) : null}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 6, marginTop: 5, marginBottom: 10 }}>
                        {params.map((p, i) => (
                            <View key={i} style={[styles.paramPill, { backgroundColor: colors.background }]}>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: colors.text, lineHeight: 15 }}>
                                    {p.value}
                                </Text>
                                <Text style={{ fontSize: 10, color: colors.textSecondary, lineHeight: 13 }}>
                                    {p.label}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {car.createdAt ? (
                            <Text style={{ fontSize: 11, color: colors.textSecondary }}>{car.createdAt}</Text>
                        ) : null}
                        {actions ? (
                            <View style={styles.actions}>{actions}</View>
                        ) : null}
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    content: {
        padding: 12,
        gap: 6,
    },
    header: {
        gap: 2,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    params: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 2,
    },
    paramPill: {
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
    },
});