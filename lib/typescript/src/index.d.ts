import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare type BottomSheetProps = {
  isBackDropDismissByPress: boolean;
  initialPosition: object | any;
  onChangeSnap: (data: object) => void;
  onChangeKeyboardAwareSnap: (data: object) => void;
  snapPoints: Array<any>;
  bottomSheerColor: string;
  backDropColor: string;
  isRoundBorderWithTipHeader: boolean;
  tipHeaderRadius: number;
  header: React.ReactNode;
  body: React.ReactNode | any;
  isBackDrop: boolean;
  isModal: boolean;
  dragEnabled: boolean;
  isAnimatedYFromParent: boolean;
  animatedValueY: any;
  containerStyle: StyleProp<ViewStyle>;
  bodyContainerStyle: StyleProp<ViewStyle>;
  tipStyle: StyleProp<ViewStyle>;
  headerStyle: StyleProp<ViewStyle>;
  bodyStyle: StyleProp<ViewStyle>;
  onClose: () => void;
  bounce: number;
  keyboardAware?: boolean;
  keyboardAwareExtraSnapHeight?: number;
  keyboardAwareDrag?: boolean;
  overDrag?: boolean;
};
declare const Index: React.ForwardRefExoticComponent<
  BottomSheetProps & React.RefAttributes<unknown>
>;
export default Index;
