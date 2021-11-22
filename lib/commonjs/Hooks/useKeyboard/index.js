'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = require('react');

var _reactNative = require('react-native');

const useKeyboard = (isEnable = true) => {
  const [keyboardHeight, setKeyboardHeight] = (0, _react.useState)(0);

  function onKeyboardWillShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardWillHide() {
    setKeyboardHeight(0);
  }

  (0, _react.useEffect)(() => {
    if (isEnable) {
      const keyboardShowEvent =
        _reactNative.Platform.OS === 'android'
          ? 'keyboardDidShow'
          : 'keyboardWillShow';
      const keyboardHideEvent =
        _reactNative.Platform.OS === 'android'
          ? 'keyboardDidHide'
          : 'keyboardWillHide';

      const showSubscription = _reactNative.Keyboard.addListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );

      const hideSubscription = _reactNative.Keyboard.addListener(
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

var _default = useKeyboard;
exports.default = _default;
//# sourceMappingURL=index.js.map
