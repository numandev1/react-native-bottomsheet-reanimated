'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _reactNativeReanimated = _interopRequireWildcard(
  require('react-native-reanimated')
);

var _reactNativeInteractableReanimated = _interopRequireDefault(
  require('react-native-interactable-reanimated')
);

var _reactNativeGestureHandler = require('react-native-gesture-handler');

var _Hooks = require('./Hooks');

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

const OFFSET = 15;
const Screen = {
  width: _reactNative.Dimensions.get('window').width,
  height: _reactNative.Dimensions.get('window').height,
};
const Index = /*#__PURE__*/ (0, _react.forwardRef)((_ref, ref) => {
  var _body$props;

  let {
    isBackDropDismissByPress,
    initialPosition = {
      y: 0,
    },
    onChangeSnap,
    onChangeKeyboardAwareSnap,
    snapPoints,
    bottomSheerColor = '#FFFFFF',
    backDropColor = '#000000',
    isRoundBorderWithTipHeader = false,
    tipHeaderRadius = 12,
    header,
    body,
    isBackDrop = false,
    isModal,
    dragEnabled = true,
    isAnimatedYFromParent,
    animatedValueY,
    containerStyle,
    bodyContainerStyle = {},
    tipStyle,
    headerStyle,
    bodyStyle,
    onClose,
    bounce = 0.5,
    keyboardAware = false,
    keyboardAwareExtraSnapHeight = 0,
    keyboardAwareDrag = false,
    overDrag = true,
  } = _ref;
  const [keyboardHeight] = (0, _Hooks.useKeyboard)(keyboardAware);
  const [headerHeight, setHeaderHeight] = (0, _react.useState)(0);
  const [currentSnap, setCurrentSnap] = (0, _react.useState)(initialPosition);
  const currentNomalizeSnap = (0, _react.useMemo)(
    () => (0, _utils.normalize)(currentSnap),
    [currentSnap]
  );
  const normalizeSnap = (0, _react.useMemo)(
    () => (0, _utils.getNormalizeSnaps)(snapPoints),
    [snapPoints]
  );
  const [_deltaY] = (0, _react.useState)(
    new _reactNativeReanimated.default.Value(Screen.height)
  );
  const bottomPanel = (0, _react.useRef)();

  const _snapPoints = (0, _react.useMemo)(
    () => (0, _utils.getSnapPoints)(normalizeSnap),
    [normalizeSnap]
  );

  const boundaries = (0, _react.useMemo)(
    () =>
      overDrag
        ? {
            top: isModal ? 0 : -300,
            bounce: bounce,
          }
        : (0, _utils.getOverDragBoundries)(normalizeSnap),
    [overDrag, isModal, bounce, normalizeSnap]
  );

  const _initialPosition = (0, _react.useMemo)(
    () => (0, _utils.getInitialPosition)(initialPosition),
    [initialPosition]
  );

  const isDismissWithPress = isBackDropDismissByPress
    ? isBackDropDismissByPress
    : false;
  const [isBottomSheetDismissed, setIsBottomSheetDismissed] = (0,
  _react.useState)(initialPosition === 0 || initialPosition === '0%');

  const onDrawerSnap = (snap) => {
    const index = snap.nativeEvent.index;
    const value = snapPoints[index];
    setCurrentSnap(value); //

    if (value === 0 || value === '0%') {
      setIsBottomSheetDismissed(true);
      onClose && onClose();
    } else {
      setIsBottomSheetDismissed(false);
    }

    onChangeSnap &&
      onChangeSnap({
        index,
        value,
      });
  };

  const dismissBottomSheet = () => {
    let index = snapPoints.findIndex((x) => x === 0 || x === '0%');

    if (index !== -1) {
      bottomPanel.current.snapTo({
        index,
      });
      onClose && onClose();
    }

    _reactNative.Keyboard.dismiss();
  };

  const snapTo = (index) => {
    if (snapPoints.findIndex((x) => x === 0 || x === '0%') !== -1) {
      _reactNative.Keyboard.dismiss();
    }

    bottomPanel.current.snapTo({
      index,
    });
    const value = snapPoints[index];
    onChangeSnap &&
      onChangeSnap({
        index,
        value,
      });
  };

  (0, _react.useImperativeHandle)(ref, () => ({
    snapTo,
    dismissBottomSheet,
  }));
  (0, _react.useEffect)(() => {
    if (keyboardAware) {
      const currentSnapHeight = (0, _utils.normalize)(currentSnap);

      if (keyboardHeight) {
        const newSnapHeight = currentSnapHeight + keyboardHeight;

        if (newSnapHeight > Screen.height) {
          bottomPanel.current.snapToPosition({
            x: 0,
            y: 0 - keyboardAwareExtraSnapHeight,
          });
          onChangeKeyboardAwareSnap &&
            onChangeKeyboardAwareSnap({
              previousSnap: currentSnapHeight,
              nextSnap: 0,
              keyboardHeight,
            });
        } else {
          bottomPanel.current.snapToPosition({
            x: 0,
            y: Screen.height - newSnapHeight - keyboardAwareExtraSnapHeight,
          });
          onChangeKeyboardAwareSnap &&
            onChangeKeyboardAwareSnap({
              previousSnap: currentSnapHeight,
              nextSnap: newSnapHeight,
              keyboardHeight,
            });
        }
      } else {
        bottomPanel.current.snapToPosition({
          x: 0,
          y: Screen.height - currentSnapHeight,
        });
      }
    }
  }, [keyboardHeight]);

  const dragHandler = () => {
    if (dragEnabled) {
      if (!keyboardAwareDrag && keyboardHeight > 0) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  };

  return /*#__PURE__*/ _react.default.createElement(
    _reactNative.View,
    {
      style: styles.panelContainer,
      pointerEvents: 'box-none',
    },
    isBackDrop &&
      /*#__PURE__*/ _react.default.createElement(
        _reactNativeReanimated.default.View,
        {
          pointerEvents: !isBottomSheetDismissed ? 'auto' : 'box-none',
          style: [
            styles.panelContainer,
            {
              backgroundColor: backDropColor,
              opacity: isAnimatedYFromParent
                ? animatedValueY.interpolate({
                    inputRange: [0, Screen.height - 100],
                    outputRange: [1, 0],
                    extrapolateRight: _reactNativeReanimated.Extrapolate.CLAMP,
                  })
                : _deltaY.interpolate({
                    inputRange: [0, Screen.height - 100],
                    outputRange: [1, 0],
                    extrapolateRight: _reactNativeReanimated.Extrapolate.CLAMP,
                  }),
            },
          ],
        }
      ),
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeInteractableReanimated.default.View,
      {
        dragEnabled: isModal ? false : dragHandler(),
        verticalOnly: true,
        ref: bottomPanel,
        snapPoints: _snapPoints,
        initialPosition: _initialPosition,
        boundaries: boundaries,
        animatedValueY: isAnimatedYFromParent ? animatedValueY : _deltaY,
        onSnap: onDrawerSnap,
      },
      !isModal &&
        isDismissWithPress &&
        !isBottomSheetDismissed &&
        /*#__PURE__*/ _react.default.createElement(
          _reactNativeGestureHandler.TapGestureHandler,
          {
            enabled: isBackDrop,
            onActivated: dismissBottomSheet,
          },
          /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
            style: {
              height: Screen.height,
              marginTop: -Screen.height,
            },
          })
        ),
      /*#__PURE__*/ _react.default.createElement(
        _reactNative.View,
        {
          style: [
            isModal ? styles.modal : styles.panel,
            {
              backgroundColor: bottomSheerColor,
            },
            isRoundBorderWithTipHeader
              ? [
                  {
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.4,
                  },
                  {
                    borderTopLeftRadius: tipHeaderRadius,
                    borderTopRightRadius: tipHeaderRadius,
                  },
                ]
              : {},
            containerStyle,
          ],
        },
        /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [isModal ? styles.modal : styles.panel, bodyContainerStyle],
          },
          !isModal &&
            isRoundBorderWithTipHeader &&
            /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
              style: [styles.panelHandle, tipStyle],
            }),
          !isModal &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [styles.panelHeader, headerStyle],
                onLayout: (e) => setHeaderHeight(e.nativeEvent.layout.height),
              },
              header
            ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: bodyStyle,
            },
            /*#__PURE__*/ _react.default.cloneElement(body, {
              style: {
                ...(body === null || body === void 0
                  ? void 0
                  : (_body$props = body.props) === null ||
                    _body$props === void 0
                  ? void 0
                  : _body$props.style),
                height: currentNomalizeSnap - headerHeight + OFFSET,
              },
            })
          )
        )
      )
    )
  );
});
var _default = Index;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  panelHandle: {
    position: 'absolute',
    alignSelf: 'center',
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginVertical: 8,
  },
  panel: {
    height: Screen.height + 300,
  },
  modal: {
    height: Screen.height + 300,
  },
  panelHeader: {
    padding: 16,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
//# sourceMappingURL=index.js.map
