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
    if (isEnable) {
      const keyboardShowEvent =
        Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
      const keyboardHideEvent =
        Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
      const showSubscription = Keyboard.addListener(keyboardShowEvent, onKeyboardWillShow);
      const hideSubscription = Keyboard.addListener(keyboardHideEvent, onKeyboardWillHide);
      return (): void => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [isEnable]);

  return [keyboardHeight];
};
export default useKeyboard;
