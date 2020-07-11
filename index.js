import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Animated from "react-native-reanimated";

import Interactable from "./src/components/Interactable";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const showDismisButton=(props)=>{

	if(props.isBackDismisByPress&&props.isBackDrop)
	{
		return true;
	}
	else
	{
		return false
	}
}

const getSnapPoints=(snapPoints)=>{
	return snapPoints.map(snapItem=>{
		if(typeof snapItem === "string")
		{
			const parentValue=snapItem.split("%")[0];
			snapItem=(Screen.height/100)*parentValue;
		}
		const snapObject={y:Screen.height-snapItem};
		return snapObject;
	})
}

class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height);
    this.state = {
      snapToIndex: 0,
      points: 100,
      scrollValueY: new Animated.Value(0),
			showDismisButton: showDismisButton(props)
    };
	}

  onDrawerSnap = (snap) => {
    if (snap.nativeEvent.index > -1) {
			if(showDismisButton(this.props))
      this.setState({ showDismisButton: true });
    }
    if (snap.nativeEvent.index === 0) {
			if(showDismisButton(this.props))
      this.setState({ showDismisButton: false });
    }
  };

  onDismisHandler = () => {
    const { snapPoints } = this.props;
    this.refs.bottomPanel.snapTo({ index: 0 });
  };

  snapTo = (indexObject) => {
    this.refs.bottomPanel.snapTo(indexObject);
  };

  render() {
    const {
      bottomSheerColor="#FFFFFF",
			backDropColor = "#000000",
			isBackDismisByPress,
      header,
      body,
      initialPosition,
      isBackDrop=false,
      isModal,
      isAnimatedXFromParent,
      animatedValueY,
		} = this.props;
		let {snapPoints}=this.props;
		snapPoints=getSnapPoints(snapPoints);
    const { showDismisButton } = this.state;

    return (
      <View style={styles.panelContainer} pointerEvents={"box-none"}>
        {/* Backdrop */}
        {isBackDrop && (
          <Animated.View
            pointerEvents={"box-none"}
            style={[
              styles.panelContainer,
              {
                backgroundColor: backDropColor,
                opacity: isAnimatedXFromParent
                  ? animatedValueY.interpolate({
                      inputRange: [0, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight: "clamp",
                    })
                  : this._deltaY.interpolate({
                      inputRange: [0, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight: "clamp",
                    }),
              },
            ]}
          />
        )}

        {/* Bottom Panel */}
        <Interactable.View
          dragEnabled={isModal ? false : true}
          verticalOnly={true}
          ref="bottomPanel"
          snapPoints={snapPoints}
          initialPosition={initialPosition}
          boundaries={{ top: isModal ? 0 : -300, bounce: isModal ? 0 : 0.5 }}
          animatedValueY={isAnimatedXFromParent ? animatedValueY : this._deltaY}
          haptics={true}
          onSnap={this.onDrawerSnap}
        >
          {!isModal && showDismisButton && (
            <TouchableWithoutFeedback
              onPress={this.onDismisHandler}
              disabled={isBackDrop ? false : true}
            >
              <View
                style={{
                  height: Screen.height,
									marginTop: -Screen.height
                }}
              />
            </TouchableWithoutFeedback>
          )}

          <View
            style={[
              isModal ? styles.modal : styles.panel,
              { backgroundColor: bottomSheerColor },
            ]}
          >
            {!isModal && <View style={styles.panelHandle} />}
            {!isModal && <View style={styles.panelHeader}>{header}</View>}
            {body}
          </View>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelHandle: {
    position: "absolute",
    alignSelf: "center",
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginVertical: 8,
  },
  panel: {
    height: Screen.height + 300,
    // backgroundColor: '#f7f5eee8',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  modal: {
    height: Screen.height + 300,
  },
  panelHeader: {
    padding: 30,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
// BottomPanel.BottomPanelOffset = 80;
export default BottomPanel;
