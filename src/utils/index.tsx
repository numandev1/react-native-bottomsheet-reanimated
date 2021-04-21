import { Dimensions, PixelRatio } from 'react-native';

// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

export const normalize = (height: number) => {
  // Parse string percentage input and convert it to number.
  if (typeof height === 'number') {
    return height;
  } else {
    const elemHeight = parseFloat(height);
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  }
};
