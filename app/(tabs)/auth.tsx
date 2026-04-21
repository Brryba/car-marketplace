import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth } from '@/db/firebase/fireBaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from '@/context/useTheme';
import { useTranslations } from '@/context/useTranslations';
import {AuthInput} from "@/components/auth/AuthInput";
import {AuthErrorLabel} from "@/components/auth/AuthErrorLabel";

export default function AuthScreen() {
    const { colors } = useTheme();
    const { tr } = useTranslations();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const actions = {
        login: () => signInWithEmailAndPassword(auth, email, password),
        register: () => createUserWithEmailAndPassword(auth, email, password),
    };

    const handle = async (action: keyof typeof actions) => {
        setError(null);
        setLoading(true);
        try {
            await actions[action]();
        } catch (e: any) {
            setError(e.code);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.card, { backgroundColor: colors.content, borderColor: colors.border }]}>
                <AuthInput
                    label={tr.login.email}
                    placeholder={tr.login.enterEmail}
                    value={email}
                    onChangeText={setEmail}
                />
                <AuthInput
                    label={tr.login.password}
                    placeholder={tr.login.enterPassword}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {error && (
                    <AuthErrorLabel error={error}/>
                )}

                {loading ? (
                    <ActivityIndicator color={colors.accent} />
                ) : (
                    <>
                        <TouchableOpacity
                            style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
                            onPress={() => handle('login')}
                        >
                            <Text style={[styles.btnText, { color: colors.accentText }]}>{tr.login.login}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnSecondary, { borderColor: colors.border }]}
                            onPress={() => handle('register')}
                        >
                            <Text style={[styles.btnText, { color: colors.text }]}>{tr.login.register}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        borderWidth: 1,
        padding: 24,
        gap: 16
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8
    },
    error: {
        fontSize: 13
    },
    btnPrimary: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    btnSecondary: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500'
    },
});