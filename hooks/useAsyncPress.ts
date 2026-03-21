import { Alert } from 'react-native';
import {useTranslations} from "@/context/useTranslations";

export function useAsyncPress() {
  const { tr } = useTranslations();

  const handleAsyncPress =
      async (fn: (...args: any[]) => Promise<void> | void, ...args: any[]) => {
    try {
      await fn(...args);
    } catch (error) {
      Alert.alert(
          tr.errors.errorLabel,
          error instanceof Error ? error.message : tr.errors.default,
          [{ text: 'OK' }]
      );
    }
  };

  return { handleAsyncPress };
}