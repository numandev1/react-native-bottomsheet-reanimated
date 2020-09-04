"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeInteractableReanimated = _interopRequireDefault(require("react-native-interactable-reanimated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Screen = {
  width: _reactNative.Dimensions.get('window').width,
  height: _reactNative.Dimensions.get('window').height
};

const getSnapPoints = snapPoints => {
  return snapPoints.map(snapItem => {
    if (typeof snapItem === 'string') {
      const parentValue = snapItem.split('%')[0];
      snapItem = Screen.height / 100 * parentValue;
    }

    const snapObject = {
      y: Screen.height - snapItem
    };
    return snapObject;
  });
};

const getInitialPosition = snapPoint => {
  if (typeof snapPoint === 'string') {
    const parentValue = snapPoint.split('%')[0];
    snapPoint = Screen.height / 100 * parentValue;
  }

  const snapObject = {
    y: Screen.height - snapPoint
  };
  return snapObject;
};

class BottomPanel extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDrawerSnap", snap => {
      const {
        snapPoints
      } = this.props;

      if (snapPoints[snap.nativeEvent.index] === 0 || snapPoints[snap.nativeEvent.index] === '0%') {
        this.setState({
          isBottomSheetDismissed: true
        });
      } else {
        this.setState({
          isBottomSheetDismissed: false
        });
      }
    });

    _defineProperty(this, "dismissBottomSheet", () => {
      const {
        snapPoints
      } = this.props;
      let index = snapPoints.findIndex(x => x === 0 || x === '0%');

      if (index !== -1) {
        this.refs.bottomPanel.snapTo({
          index
        });
      }
    });

    _defineProperty(this, "snapTo", index => {
      const {
        snapPoints
      } = this.props;

      if (snapPoints.findIndex(x => x === 0 || x === '0%') !== -1) {
        _reactNative.Keyboard.dismiss();
      }

      this.refs.bottomPanel.snapTo({
        index
      });
    });

    this._deltaY = new _reactNativeReanimated.default.Value(Screen.height);
    this.state = {
      snapToIndex: 0,
      points: 100,
      scrollValueY: new _reactNativeReanimated.default.Value(0),
      isDismissWithPress: props.isBackDropDismissByPress ? props.isBackDropDismissByPress : false,
      isBottomSheetDismissed: props.initialPosition === 0 || props.initialPosition === '0%'
    };
  }

  render() {
    const {
      bottomSheerColor = '#FFFFFF',
      backDropColor = '#000000',
      isRoundBorderWithTipHeader = false,
      header,
      body,
      isBackDrop = false,
      isModal,
      isAnimatedYFromParent,
      animatedValueY,
      containerStyle,
      tipStyle,
      headerStyle,
      bodyStyle
    } = this.props;
    let {
      snapPoints,
      initialPosition = {
        y: 0
      }
    } = this.props;
    snapPoints = getSnapPoints(snapPoints);
    initialPosition = getInitialPosition(initialPosition);
    const {
      isDismissWithPress,
      isBottomSheetDismissed
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.panelContainer,
      pointerEvents: 'box-none'
    }, isBackDrop && /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: !isBottomSheetDismissed ? 'auto' : 'box-none',
      style: [styles.panelContainer, {
        backgroundColor: backDropColor,
        opacity: isAnimatedYFromParent ? animatedValueY.interpolate({
          inputRange: [0, Screen.height - 100],
          outputRange: [1, 0],
          extrapolateRight: 'clamp'
        }) : this._deltaY.interpolate({
          inputRange: [0, Screen.height - 100],
          outputRange: [1, 0],
          extrapolateRight: 'clamp'
        })
      }]
    }), /*#__PURE__*/_react.default.createElement(_reactNativeInteractableReanimated.default.View, {
      dragEnabled: isModal ? false : true,
      verticalOnly: true,
      ref: "bottomPanel",
      snapPoints: snapPoints,
      initialPosition: initialPosition,
      boundaries: {
        top: isModal ? 0 : -300,
        bounce: isModal ? 0 : 0.5
      },
      animatedValueY: isAnimatedYFromParent ? animatedValueY : this._deltaY,
      onSnap: this.onDrawerSnap
    }, !isModal && isDismissWithPress && !isBottomSheetDismissed && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: this.dismissBottomSheet,
      disabled: isBackDrop ? false : true
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: Screen.height,
        marginTop: -Screen.height
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [isModal ? styles.modal : styles.panel, {
        backgroundColor: bottomSheerColor
      }, isRoundBorderWithTipHeader ? {
        backgroundColor: '#f7f5eee8',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 5,
        shadowOpacity: 0.4
      } : {}, containerStyle]
    }, !isModal && isRoundBorderWithTipHeader && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.panelHandle, tipStyle]
    }), !isModal && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.panelHeader, headerStyle]
    }, header), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: bodyStyle
    }, body))));
  }

}

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  panelHandle: {
    position: 'absolute',
    alignSelf: 'center',
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginVertical: 8
  },
  panel: {
    height: Screen.height + 300
  },
  modal: {
    height: Screen.height + 300
  },
  panelHeader: {
    padding: 16
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

var _default = BottomPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map