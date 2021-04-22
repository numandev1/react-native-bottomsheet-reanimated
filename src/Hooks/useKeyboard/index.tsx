import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

const useKeyboard = (isEnable = true): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardWillShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardWillHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const keyboardHideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    if (isEnable) {
      Keyboard.addListener(keyboardShowEvent, onKeyboardWillShow);
      Keyboard.addListener(keyboardHideEvent, onKeyboardWillHide);
    }
    return (): void => {
      Keyboard.removeListener(keyboardShowEvent, onKeyboardWillShow);
      Keyboard.removeListener(keyboardHideEvent, onKeyboardWillHide);
    };
  }, [isEnable]);

  return [keyboardHeight];
};
export default useKeyboard;
