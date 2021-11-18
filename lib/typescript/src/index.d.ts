import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type BottomSheetProps = {
  /**
   * enable to move bottomsheet to first snappoint by pressing backdrop.
   * @default false
   */
  isBackDropDismissByPress?: boolean;
  /**
   * determines initial position point of bottom sheet. The value outside of snap points.
   */
  initialPosition: object | any;
  /**
   * method call when change any snap.
   */
  onChangeSnap?: (data: object) => void;
  /**
   * when keyboardAware=true then it give keyboard awareview snap. onChangeKeyboardAwareSnap: (previousSnap: number,nextSnap: number,keyboardHeight: number) => void;
   */
  onChangeKeyboardAwareSnap?: (data: object) => void;
  /**
   * e.g. [300, 200, 0]. Points for snapping of bottom sheet coomponent. They define distance from bottom of the screen. Might be number or percent (as string e.g. '20%') for points or percents of screen height from bottom. Note: Array values must be in descending order.
   */
  snapPoints: (string | number)[];
  /**
   * for background color of bottom sheet.
   * @default "#ffffff"
   */
  bottomSheerColor?: string;
  /**
   * for background color of the back drop.
   */
  backDropColor?: string;
  /**
   * give round with tip header style to bottomsheet.
   * @default false
   */
  isRoundBorderWithTipHeader?: boolean;
  /**
   * for tip header border radius.
   * @default 12
   */
  tipHeaderRadius?: number;
  /**
   * method for rendering non-scrollable header of bottom sheet.
   */
  header?: React.ReactNode;
  /**
   * Method for rendering scrollable content of bottom sheet.
   */
  body: React.ReactNode | any;
  /**
   * for show backdrop behind the bottom sheet.
   * @default false
   */
  isBackDrop?: boolean;
  /**
   * to make bottom sheet like modal.
   * @default false
   */
  isModal?: boolean;
  /**
   * for enable/disable drag.
   * @default true
   */
  dragEnabled?: boolean;
  /**
   * if true then give animated value to animatedValueY props.
   */
  isAnimatedYFromParent?: boolean;
  /**
   * if isAnimatedYFromParent will be true then it will give animtedY value to animatedValueY props.
   */
  animatedValueY?: any;
  /**
   * for change style of container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * for change style of body container.
   */
  bodyContainerStyle?: StyleProp<ViewStyle>;
  /**
   * for change style of tip. it is dependted on isRoundBorderWithTipHeader.
   */
  tipStyle?: StyleProp<ViewStyle>;
  /**
   * for change style of header.
   */
  headerStyle?: StyleProp<ViewStyle>;
  /**
   * for change style of body.
   */
  bodyStyle?: StyleProp<ViewStyle>;
  /**
   * method call when bottomsheet close.
   */
  onClose?: () => void;
  /**
   * for increase or decrease bounce effect.
   * @default 0.5
   */
  bounce?: number;
  /**
   * true will avoid current snap when keyboard will open.
   * @default false
   */
  keyboardAware?: boolean;
  /**
   * when keyboardAware=true and this is for adding extra space in snap when keyboard open
   * @default 0
   */
  keyboardAwareExtraSnapHeight?: number;
  /**
   * when keyboardAware=true and this is used for enable or disable drag when keyboard open
   * @default false
   */
  keyboardAwareDrag?: boolean;
  /**
   * false will disable overdrag of last snap, false will also disable bounce' and isModal`.
   * @default true
   */
  overDrag?: boolean;
};
declare const Index: React.ForwardRefExoticComponent<
  BottomSheetProps & React.RefAttributes<unknown>
>;
export default Index;
