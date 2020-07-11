/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

import Interactable from './src/components/Interactable'

const Screen = {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height
};

class BottomPanel extends Component {
	constructor(props) {
		super(props);
		this._deltaY = new Animated.Value(Screen.height);
		this.state = {
			snapToIndex: 0,
			points: 100,
			scrollValueY: new Animated.Value(0),
			showDismisButton: false
		};
	}

	onDrawerSnap = (snap) => {
		if (snap.nativeEvent.index > -1) {
			this.setState({ showDismisButton: true });
		}
		const { snapPoints } = this.props;
		if (snap.nativeEvent.index === snapPoints.length - 1) {
			this.setState({ showDismisButton: false });
		}
	};

	onDismisHandler = () => {
		const { snapPoints } = this.props;
		this.refs.bottomPanel.snapTo({ index: snapPoints.length - 1 });
	};

	render() {
		const {
			toggleTheme,
			theme,
			theme: { colors: { background } },
			header,
			body,
			snapPoints,
			initialPosition,
			backDrop,
			isModal,
			isAnimatedXFromParent,
			animatedValueY
		} = this.props;
		const { colors } = theme;
		const { dark: isDarkTheme } = theme;
		const { showDismisButton } = this.state;
		let isBackDrop = backDrop;
		if (isBackDrop === undefined) {
			isBackDrop = true;
		}

		return (
				<View style={styles.panelContainer} pointerEvents={'box-none'}>
					{/* Backdrop */}
					{isBackDrop && (
						<Animated.View
							pointerEvents={'box-none'}
							style={[
								styles.panelContainer,
								{
									backgroundColor: "red",
									opacity: isAnimatedXFromParent
										? animatedValueY.interpolate({
												inputRange: [ 0, Screen.height - 100 ],
												outputRange: [ 1, 0 ],
												extrapolateRight: 'clamp'
											})
										: this._deltaY.interpolate({
												inputRange: [ 0, Screen.height - 100 ],
												outputRange: [ 1, 0 ],
												extrapolateRight: 'clamp'
											})
								}
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
						{!isModal &&
						showDismisButton && (
							<TouchableWithoutFeedback
								onPress={this.onDismisHandler}
								disabled={isBackDrop ? false : true}
							>
								<View
									style={{
										height: snapPoints[0].y,
										marginTop: -snapPoints[0].y
									}}
								/>
							</TouchableWithoutFeedback>
						)}

						<View style={[ isModal ? styles.modal : styles.panel, { backgroundColor: background } ]}>
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
		position: 'absolute',
		alignSelf: 'center',
		width: 40,
		height: 6,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginVertical: 8
	},
	panel: {
		height: Screen.height + 300,
		// backgroundColor: '#f7f5eee8',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 5,
		shadowOpacity: 0.4
	},
	modal: {
		height: Screen.height + 300
	},
	panelHeader: {
		padding: 30
	},
	panelContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});
// BottomPanel.BottomPanelOffset = 80;
export default BottomPanel;
