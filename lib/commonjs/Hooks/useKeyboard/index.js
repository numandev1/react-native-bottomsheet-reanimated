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
    const keyboardShowEvent =
      _reactNative.Platform.OS === 'android'
        ? 'keyboardDidShow'
        : 'keyboardWillShow';
    const keyboardHideEvent =
      _reactNative.Platform.OS === 'android'
        ? 'keyboardDidHide'
        : 'keyboardWillHide';

    if (isEnable) {
      _reactNative.Keyboard.addListener(keyboardShowEvent, onKeyboardWillShow);

      _reactNative.Keyboard.addListener(keyboardHideEvent, onKeyboardWillHide);
    }

    return () => {
      _reactNative.Keyboard.removeListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );

      _reactNative.Keyboard.removeListener(
        keyboardHideEvent,
        onKeyboardWillHide
      );
    };
  }, [isEnable]);
  return [keyboardHeight];
};

var _default = useKeyboard;
exports.default = _default;
//# sourceMappingURL=index.js.map
