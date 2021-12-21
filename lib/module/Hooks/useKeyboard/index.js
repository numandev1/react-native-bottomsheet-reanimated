import { useEffect, useState, useRef } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboard = function () {
  let isEnable =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  const showSubscription = useRef();
  const hideSubscription = useRef();
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
      showSubscription.current = Keyboard.addListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );
      hideSubscription.current = Keyboard.addListener(
        keyboardHideEvent,
        onKeyboardWillHide
      );
    }

    return () => {
      var _showSubscription$cur, _hideSubscription$cur;

      (_showSubscription$cur = showSubscription.current) === null ||
      _showSubscription$cur === void 0
        ? void 0
        : _showSubscription$cur.remove();
      (_hideSubscription$cur = hideSubscription.current) === null ||
      _hideSubscription$cur === void 0
        ? void 0
        : _hideSubscription$cur.remove();
    };
  }, [isEnable]);
  return [keyboardHeight];
};

export default useKeyboard;
//# sourceMappingURL=index.js.map
