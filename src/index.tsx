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
type Porps = {
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
    }: Porps,
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
