import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FlatlistComponent from './components/flatlist';

import BottomSheet from 'react-native-bottomsheet-reanimated';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const snapPoints = [0, Screen.height / 2, '70%', '100%'];
class App extends Component {
  onOpenBottomSheetHandler = (index) => {
    this.refs.BottomSheet.snapTo(index);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.boxWrapper}>
          <TouchableOpacity onPress={() => this.onOpenBottomSheetHandler(0)}>
            <View style={styles.box}>
              <Text>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onOpenBottomSheetHandler(1)}>
            <View style={styles.box}>
              <Text>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onOpenBottomSheetHandler(2)}>
            <View style={styles.box}>
              <Text>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onOpenBottomSheetHandler(3)}>
            <View style={styles.box}>
              <Text>4</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheet
          bottomSheerColor="#FFFFFF"
          // backDropColor="red"
          ref="BottomSheet"
          initialPosition={'50%'}
          snapPoints={snapPoints}
          isBackDrop={true}
          isBackDropDismissByPress={true}
          isRoundBorderWithTipHeader={true}
          // overDrag={false}
          // keyboardAware
          // isModal
          // containerStyle={{backgroundColor:"red"}}
          // tipStyle={{backgroundColor:"red"}}
          // headerStyle={{backgroundColor:"red"}}
          // bodyStyle={{backgroundColor:"red",flex:1}}
          header={
            <View>
              <Text style={styles.text}>Header</Text>
            </View>
          }
          body={
            <View style={styles.body}>
              <Text style={styles.text}>Body</Text>
              <TextInput style={{ width: '100%', backgroundColor: 'gray' }} />
              <FlatlistComponent />
            </View>
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  boxWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
