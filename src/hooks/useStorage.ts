import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

type HandleError = (...args: any[]) => void;

type GetItemProps<T> = {
  handleError?: HandleError;
  defaultValue?: T;
};

export function useStorage(key: string) {
  const getItem = useCallback(
    async <T = any>(props?: GetItemProps<T>): Promise<T> => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item) {
          try {
            return JSON.parse(item) as T;
          } catch {
            return item as T;
          }
        } else {
          return props?.defaultValue!;
        }
      } catch (err) {
        if (props?.handleError) props.handleError(err);
        return null as T;
      }
    },
    [AsyncStorage]
  );

  const setItem = useCallback(
    async <T>(data: T, handleError?: HandleError) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        if (handleError) handleError(err);
      }
    },
    [AsyncStorage]
  );

  const clearStorage = useCallback(
    async (handleError?: HandleError) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (err) {
        if (handleError) handleError(err);
      }
    },
    [AsyncStorage]
  );

  return {
    getItem,
    setItem,
    clearStorage,
  };
}
