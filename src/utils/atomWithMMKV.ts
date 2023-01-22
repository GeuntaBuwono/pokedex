import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  /* istanbul ignore next */
  return value ? JSON.parse(value) : null;
}

function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem:
        /* istanbul ignore next */
        () => undefined,
    })),
  );
