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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

const Screen = {
  width: _reactNative.Dimensions.get('window').width,
  height: _reactNative.Dimensions.get('window').height,
};
const Index = /*#__PURE__*/ (0, _react.forwardRef)(
  (
    {
      isBackDropDismissByPress,
      initialPosition = {
        y: 0,
      },
      onChangeSnap,
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
    },
    ref
  ) => {
    const [_deltaY] = (0, _react.useState)(
      new _reactNativeReanimated.default.Value(Screen.height)
    );
    const bottomPanel = (0, _react.useRef)();

    const _snapPoints = getSnapPoints(snapPoints);

    const _initialPosition = getInitialPosition(initialPosition);

    const isDismissWithPress = isBackDropDismissByPress
      ? isBackDropDismissByPress
      : false;
    const [isBottomSheetDismissed, setIsBottomSheetDismissed] = (0,
    _react.useState)(initialPosition === 0 || initialPosition === '0%');

    const onDrawerSnap = (snap) => {
      const index = snap.nativeEvent.index;
      const value = snapPoints[index];

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
                      extrapolateRight:
                        _reactNativeReanimated.Extrapolate.CLAMP,
                    })
                  : _deltaY.interpolate({
                      inputRange: [0, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight:
                        _reactNativeReanimated.Extrapolate.CLAMP,
                    }),
              },
            ],
          }
        ),
      /*#__PURE__*/ _react.default.createElement(
        _reactNativeInteractableReanimated.default.View,
        {
          dragEnabled: isModal ? false : dragEnabled,
          verticalOnly: true,
          ref: bottomPanel,
          snapPoints: _snapPoints,
          initialPosition: _initialPosition,
          boundaries: {
            top: isModal ? 0 : -300,
            bounce: bounce,
          },
          animatedValueY: isAnimatedYFromParent ? animatedValueY : _deltaY,
          onSnap: onDrawerSnap,
        },
        !isModal &&
          isDismissWithPress &&
          !isBottomSheetDismissed &&
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            {
              onPress: dismissBottomSheet,
              disabled: isBackDrop ? false : true,
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
                      backgroundColor: '#f7f5eee8',
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
              style: [
                isModal ? styles.modal : styles.panel,
                bodyContainerStyle,
              ],
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
                },
                header
              ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: bodyStyle,
              },
              body
            )
          )
        )
      )
    );
  }
);
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

const getSnapPoints = (snapPoints) => {
  return snapPoints.map((snapItem) => {
    if (typeof snapItem === 'string') {
      const parentValue = snapItem.split('%')[0];
      snapItem = (Screen.height / 100) * parentValue;
    }

    const snapObject = {
      y: Screen.height - snapItem,
    };
    return snapObject;
  });
};

const getInitialPosition = (snapPoint) => {
  if (typeof snapPoint === 'string') {
    const parentValue = snapPoint.split('%')[0];
    snapPoint = (Screen.height / 100) * parentValue;
  }

  const snapObject = {
    y: Screen.height - snapPoint,
  };
  return snapObject;
};
//# sourceMappingURL=index.js.map
