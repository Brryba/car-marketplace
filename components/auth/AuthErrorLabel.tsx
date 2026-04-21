import {Text} from "react-native";
import {useTheme} from "@/context/useTheme";
import {useTranslations} from "@/context/useTranslations";

interface AuthErrorLabelProps {
    error: string;
}

export function AuthErrorLabel({error} : AuthErrorLabelProps) {
    const {colors} = useTheme();
    const { tr } = useTranslations();

    const firebaseErrors: Record<string, string> = {
        'auth/invalid-email': tr.errors.firebase.invalidEmail,
        'auth/user-not-found': tr.errors.firebase.userNotFound,
        'auth/invalid-credential': tr.errors.firebase.wrongPassword,
        'auth/email-already-in-use': tr.errors.firebase.emailAlreadyInUse,
        'auth/invalid-password': tr.errors.firebase.weakPassword,
        'auth/network-request-failed': tr.errors.firebase.networkError,
    };

    return <Text style={{ color: colors.error, fontSize: 13 }}>
        {firebaseErrors[error] ?? error}
    </Text>
}