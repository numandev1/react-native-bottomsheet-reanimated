'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.normalize =
  exports.getSnapPoints =
  exports.getOverDragBoundries =
  exports.getNormalizeSnaps =
  exports.getInitialPosition =
    void 0;

var _reactNative = require('react-native');

const Screen = {
  width: _reactNative.Dimensions.get('window').width,
  height: _reactNative.Dimensions.get('window').height,
};

const normalize = (height) => {
  if (typeof height === 'number') {
    return height;
  } else {
    const elemHeight = parseFloat(height);
    return _reactNative.PixelRatio.roundToNearestPixel(
      (Screen.height * elemHeight) / 100
    );
  }
};

exports.normalize = normalize;

const getOverDragBoundries = (snapPoints) => {
  return {
    top: Screen.height - snapPoints[snapPoints.length - 1],
    bounce: 0,
  };
};

exports.getOverDragBoundries = getOverDragBoundries;

const getNormalizeSnaps = (snapPoints) => {
  return snapPoints.map((snapItem) => {
    if (typeof snapItem === 'string') {
      const parentValue = snapItem.split('%')[0];
      snapItem = (Screen.height / 100) * parentValue;
    }

    return snapItem;
  });
};

exports.getNormalizeSnaps = getNormalizeSnaps;

const getSnapPoints = (snapPoints) => {
  return snapPoints.map((snapItem) => {
    const snapObject = {
      y: Screen.height - snapItem,
    };
    return snapObject;
  });
};

exports.getSnapPoints = getSnapPoints;

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

exports.getInitialPosition = getInitialPosition;
//# sourceMappingURL=index.js.map
