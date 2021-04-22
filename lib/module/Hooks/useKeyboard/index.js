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
    const keyboardShowEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const keyboardHideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    if (isEnable) {
      Keyboard.addListener(keyboardShowEvent, onKeyboardWillShow);
      Keyboard.addListener(keyboardHideEvent, onKeyboardWillHide);
    }

    return () => {
      Keyboard.removeListener(keyboardShowEvent, onKeyboardWillShow);
      Keyboard.removeListener(keyboardHideEvent, onKeyboardWillHide);
    };
  }, [isEnable]);
  return [keyboardHeight];
};

export default useKeyboard;
//# sourceMappingURL=index.js.map
