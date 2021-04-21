'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.normalize = void 0;

var _reactNative = require('react-native');

// Retrieve initial screen's height
let screenHeight = _reactNative.Dimensions.get('window').height;

const normalize = (height) => {
  // Parse string percentage input and convert it to number.
  if (typeof height === 'number') {
    return height;
  } else {
    const elemHeight = parseFloat(height); // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.

    return _reactNative.PixelRatio.roundToNearestPixel(
      (screenHeight * elemHeight) / 100
    );
  }
};

exports.normalize = normalize;
//# sourceMappingURL=index.js.map
