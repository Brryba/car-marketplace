import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/context/useTheme';
import {Colors} from "@/constants/theme";

interface Props {
    name: string;
    onPress: (date: Date) => void;
}

export function SettingsCalendarButton({ name, onPress }: Props) {
    const { colors } = useTheme();
    const [show, setShow] = useState(false);
    const [scheduled, setScheduled] = useState<Date | null>(null);

    const handleChange = async (_: any, date?: Date) => {
        setShow(false);
        if (!date) return;
        onPress(date);
        setScheduled(date);
    };

    const label = scheduled
        ? `${name}: ${scheduled.getHours().toString().padStart(2, '0')}:${scheduled.getMinutes().toString().padStart(2, '0')}`
        : name;

    const s = styles(colors);

    return (
        <View>
            <Button
                onPress={() => setShow(true)}
                style={s.button}
                contentStyle={s.content}
                labelStyle={s.label}
            >
                {label}
            </Button>

            {show && (
                <DateTimePicker
                    mode="time"
                    value={scheduled ?? new Date()}
                    onChange={handleChange}
                />
            )}
        </View>
    );
}

const styles = (colors: typeof Colors['light']) => StyleSheet.create({
    button: {
        paddingLeft: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
    },
    content: {
        height: 50,
        justifyContent: 'flex-start',
    },
    label: {
        fontSize: 16,
        color: colors.text,
        fontWeight: '400',
        fontFamily: 'System',
    },
});