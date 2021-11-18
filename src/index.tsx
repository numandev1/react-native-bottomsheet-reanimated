import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Animated, { Extrapolate } from 'react-native-reanimated';
import Interactable from 'react-native-interactable-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useKeyboard } from './Hooks';
import {
  normalize,
  getSnapPoints,
  getInitialPosition,
  getOverDragBoundries,
  getNormalizeSnaps,
} from './utils';
const OFFSET = 15;
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
type BottomSheetProps = {
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
const Index = forwardRef(
  (
    {
      isBackDropDismissByPress,
      initialPosition = { y: 0 },
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
    }: BottomSheetProps,
    ref
  ) => {
    const [keyboardHeight] = useKeyboard(keyboardAware);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [currentSnap, setCurrentSnap] = useState(initialPosition);
    const currentNomalizeSnap = useMemo(() => normalize(currentSnap), [
      currentSnap,
    ]);
    const normalizeSnap = useMemo(() => getNormalizeSnaps(snapPoints), [
      snapPoints,
    ]);
    const [_deltaY] = useState(new Animated.Value(Screen.height));
    const bottomPanel = useRef<any>();
    const _snapPoints = useMemo(() => getSnapPoints(normalizeSnap), [
      normalizeSnap,
    ]);
    const boundaries = useMemo(
      () =>
        overDrag
          ? { top: isModal ? 0 : -300, bounce: bounce }
          : getOverDragBoundries(normalizeSnap),
      [overDrag, isModal, bounce, normalizeSnap]
    );
    const _initialPosition = useMemo(
      () => getInitialPosition(initialPosition),
      [initialPosition]
    );
    const isDismissWithPress = isBackDropDismissByPress
      ? isBackDropDismissByPress
      : false;
    const [
      isBottomSheetDismissed,
      setIsBottomSheetDismissed,
    ] = useState<boolean>(initialPosition === 0 || initialPosition === '0%');

    const onDrawerSnap = (snap: any) => {
      const index = snap.nativeEvent.index;
      const value = snapPoints[index];
      setCurrentSnap(value); //
      if (value === 0 || value === '0%') {
        setIsBottomSheetDismissed(true);
        onClose && onClose();
      } else {
        setIsBottomSheetDismissed(false);
      }
      onChangeSnap && onChangeSnap({ index, value });
    };

    const dismissBottomSheet = () => {
      let index = snapPoints.findIndex(
        (x: number | string) => x === 0 || x === '0%'
      );
      if (index !== -1) {
        bottomPanel.current.snapTo({ index });
        onClose && onClose();
      }
      Keyboard.dismiss();
    };

    const snapTo = (index: number) => {
      if (snapPoints.findIndex((x) => x === 0 || x === '0%') !== -1) {
        Keyboard.dismiss();
      }
      bottomPanel.current.snapTo({ index });
      const value = snapPoints[index];
      onChangeSnap && onChangeSnap({ index, value });
    };

    useImperativeHandle(ref, () => ({
      snapTo,
      dismissBottomSheet,
    }));

    useEffect(() => {
      if (keyboardAware) {
        const currentSnapHeight = normalize(currentSnap);
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

    return (
      <View style={styles.panelContainer} pointerEvents={'box-none'}>
        {/* Backdrop */}
        {isBackDrop && (
          <Animated.View
            pointerEvents={!isBottomSheetDismissed ? 'auto' : 'box-none'}
            style={[
              styles.panelContainer,
              {
                backgroundColor: backDropColor,
                opacity: isAnimatedYFromParent
                  ? animatedValueY.interpolate({
                      inputRange: [0, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight: Extrapolate.CLAMP,
                    })
                  : _deltaY.interpolate({
                      inputRange: [0, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight: Extrapolate.CLAMP,
                    }),
              },
            ]}
          />
        )}

        <Interactable.View
          dragEnabled={isModal ? false : dragHandler()}
          verticalOnly={true}
          ref={bottomPanel}
          snapPoints={_snapPoints}
          initialPosition={_initialPosition}
          boundaries={boundaries}
          animatedValueY={isAnimatedYFromParent ? animatedValueY : _deltaY}
          onSnap={onDrawerSnap}
        >
          {!isModal && isDismissWithPress && !isBottomSheetDismissed && (
            <TapGestureHandler
              enabled={isBackDrop}
              onActivated={dismissBottomSheet}
            >
              <View
                style={{
                  height: Screen.height,
                  marginTop: -Screen.height,
                }}
              />
            </TapGestureHandler>
          )}

          <View
            style={[
              isModal ? styles.modal : styles.panel,
              { backgroundColor: bottomSheerColor },
              isRoundBorderWithTipHeader
                ? [
                    {
                      backgroundColor: '#FFFFFF',
                      shadowColor: '#000000',
                      shadowOffset: { width: 0, height: 0 },
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
            ]}
          >
            <View
              style={[
                isModal ? styles.modal : styles.panel,
                bodyContainerStyle,
              ]}
            >
              {!isModal && isRoundBorderWithTipHeader && (
                <View style={[styles.panelHandle, tipStyle]} />
              )}
              {!isModal && (
                <View
                  style={[styles.panelHeader, headerStyle]}
                  onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
                >
                  {header}
                </View>
              )}
              <View style={bodyStyle}>
                {React.cloneElement(body, {
                  style: {
                    ...body?.props?.style,
                    height: currentNomalizeSnap - headerHeight + OFFSET,
                  },
                })}
              </View>
            </View>
          </View>
        </Interactable.View>
      </View>
    );
  }
);

export default Index;

const styles = StyleSheet.create({
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
