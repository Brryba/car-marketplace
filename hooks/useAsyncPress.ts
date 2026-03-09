import { useState } from 'react';
import { Alert } from 'react-native';

export function useAsyncPress() {

  const handleAsyncPress =
      async (fn: (...args: any[]) => Promise<void> | void, ...args: any[]) => {
    try {
      await fn(...args);
    } catch (error) {
      Alert.alert(
          'Error',
          error instanceof Error ? error.message : 'Something went wrong',
          [{ text: 'OK' }]
      );
    }
  };

  return { handleAsyncPress };
}