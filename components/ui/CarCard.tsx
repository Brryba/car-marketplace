import { useTheme } from "@/context/UseTheme";
import { CarParam } from "@/types/global-types";
import * as React from 'react';
import { ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

export interface CarCardProps {
    name: string;
    mileage: string;
    releaseYear: string;
    description: string;
    params: CarParam[];
    imageSource?: ImageSourcePropType;
    actions?: React.ReactNode;
    city?: string;
    publicationDate?: string;
}

export default function CarCard({
    name,
    releaseYear,
    mileage,
    description,
    params = [],
    imageSource,
    actions,
    city,
    publicationDate,
}: CarCardProps) {
    const { colors } = useTheme();

    return (
        <Card style={[styles.card, { backgroundColor: colors.content }]} elevation={2}>
            <View>
                <Card.Cover source={imageSource} />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.name, { color: colors.text }]}
                            numberOfLines={1}>
                            {name}
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textSecondary }}>
                            {city ? `${city} ● ` : null}{releaseYear} ● {mileage}km
                        </Text>
                    </View>

                    {description ? (
                        <Text style={{ fontSize: 12, color: colors.textSecondary, lineHeight: 17 }}>
                            {description}
                        </Text>
                    ) : null}

                    {params.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 6, marginTop: 2 }}>
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
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {publicationDate ? (
                            <Text style={{ fontSize: 11, color: colors.textSecondary }}>{publicationDate}</Text>
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