import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboard = (isEnable = true) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardWillShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardWillHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    if (isEnable) {
      const keyboardShowEvent =
        Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
      const keyboardHideEvent =
        Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
      const showSubscription = Keyboard.addListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );
      const hideSubscription = Keyboard.addListener(
        keyboardHideEvent,
        onKeyboardWillHide
      );
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [isEnable]);
  return [keyboardHeight];
};

export default useKeyboard;
//# sourceMappingURL=index.js.map
