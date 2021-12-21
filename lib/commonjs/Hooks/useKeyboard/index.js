'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = require('react');

var _reactNative = require('react-native');

const useKeyboard = function () {
  let isEnable =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  const showSubscription = (0, _react.useRef)();
  const hideSubscription = (0, _react.useRef)();
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
      showSubscription.current = _reactNative.Keyboard.addListener(
        keyboardShowEvent,
        onKeyboardWillShow
      );
      hideSubscription.current = _reactNative.Keyboard.addListener(
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

var _default = useKeyboard;
exports.default = _default;
//# sourceMappingURL=index.js.map
