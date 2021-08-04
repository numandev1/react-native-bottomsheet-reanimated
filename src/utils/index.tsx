import { Dimensions, PixelRatio } from 'react-native';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const normalize = (height: number) => {
  if (typeof height === 'number') {
    return height;
  } else {
    const elemHeight = parseFloat(height);
    return PixelRatio.roundToNearestPixel((Screen.height * elemHeight) / 100);
  }
};

export const getOverDragBoundries = (snapPoints: any) => {
  return {
    top: Screen.height - snapPoints[snapPoints.length - 1],
    bounce: 0,
  };
};

export const getNormalizeSnaps = (snapPoints: any) => {
  return snapPoints.map((snapItem: any) => {
    if (typeof snapItem === 'string') {
      const parentValue: any = snapItem.split('%')[0];
      snapItem = (Screen.height / 100) * parentValue;
    }
    return snapItem;
  });
};

export const getSnapPoints = (snapPoints: any) => {
  return snapPoints.map((snapItem: any) => {
    const snapObject = { y: Screen.height - snapItem };
    return snapObject;
  });
};

export const getInitialPosition = (snapPoint: any) => {
  if (typeof snapPoint === 'string') {
    const parentValue: any = snapPoint.split('%')[0];
    snapPoint = (Screen.height / 100) * parentValue;
  }
  const snapObject = { y: Screen.height - snapPoint };
  return snapObject;
};
