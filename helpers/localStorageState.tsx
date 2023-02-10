// hook.js
import React from 'react';

interface PropsLocalStorageState {
  key: string;
  value: object;
}

export const useLocalStorageState: any = ({
  key,
  value
}: PropsLocalStorageState) => {
  let formStorage = {};
  if (typeof window !== 'undefined') {
    formStorage = JSON.parse(localStorage.getItem(key) || '{}');
  }
  const initialValue =
    Object.keys(formStorage).length > 0 ? formStorage : value;
  const [localStorageState, setLocalStorageState] =
    React.useState(initialValue);
  const handleUpdateLocalStorageState = React.useCallback(
    (x: object) => {
      setLocalStorageState(x);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(x));
      }
    },
    [key]
  );
  return [localStorageState, handleUpdateLocalStorageState];
};
