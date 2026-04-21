import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useTheme} from '@/context/useTheme';

interface Props {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

export function AuthInput({label, placeholder, value, onChangeText, secureTextEntry}: Props) {
    const {colors} = useTheme();
    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, {color: colors.textSecondary}]}>{label}</Text>
            <TextInput
                style={[styles.input, {
                    backgroundColor: colors.content,
                    borderColor: colors.border,
                    color: colors.text
                }]}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 6
    },
    label: {
        fontSize: 13
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15
    },
});