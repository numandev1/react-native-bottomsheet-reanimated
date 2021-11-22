import { useEffect, useState, useRef } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  EmitterSubscription,
} from 'react-native';

const useKeyboard = (isEnable = true): [number] => {
  const showSubscription = useRef<EmitterSubscription>();
  const hideSubscription = useRef<EmitterSubscription>();
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
      showSubscription.current = Keyboard.addListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );
      hideSubscription.current = Keyboard.addListener(
        keyboardHideEvent,
        onKeyboardWillHide
      );
    }
    return (): void => {
      showSubscription.current?.remove();
      hideSubscription.current?.remove();
    };
  }, [isEnable]);

  return [keyboardHeight];
};
export default useKeyboard;
