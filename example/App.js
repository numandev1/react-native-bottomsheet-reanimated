import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import BottomSheet from "react-native-bottomsheet-reanimated";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
// -100, "35%"
const snapPoints = [0,"50%","70%","100%"];
class App extends Component {
  onOpenBottomSheetHandler = (index) => {
    this.refs.BottomSheet.snapTo({ index });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.boxWrapper}>
        <TouchableOpacity onPress={()=>this.onOpenBottomSheetHandler(0)}>
          <View style={styles.box}>
            <Text>1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onOpenBottomSheetHandler(1)}>
          <View style={styles.box}>
            <Text>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onOpenBottomSheetHandler(2)}>
          <View style={styles.box}>
            <Text>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onOpenBottomSheetHandler(3)}>
          <View style={styles.box}>
            <Text>4</Text>
          </View>
        </TouchableOpacity>
      </View>

        <BottomSheet
          bottomSheerColor="#FFFFFF"
          // backDropColor="red"
          ref="BottomSheet"
          initialPosition={{ y: 300 }}
          snapPoints={snapPoints}
          isBackDrop={true}
          // isModal
          isBackDismisByPress={true}
          header={
            <View>
              <Text>nomi</Text>
            </View>
          }
          body={
            <View>
              <Text>nomi</Text>
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
    // justifyContent: "center",
    // alignItems: "center",
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  boxWrapper:{
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row"
  }
});

export default App;
