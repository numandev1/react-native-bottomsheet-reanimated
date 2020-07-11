import React, {Component} from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";

import BottomSheet from "react-native-bottomsheet-reanimated";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

class App extends Component {
  onOpenBottomSheetHandler=()=>{
    this.refs.BottomSheet.snapTo({ index: 1 });
  }
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={this.onOpenBottomSheetHandler}>
      <View>
      <Text>nomi</Text>
      </View>
      </TouchableOpacity>
        <BottomSheet
          ref="BottomSheet"
          initialPosition={{ y: 300 }}
          snapPoints={[{ y:Screen.height/2  }, { y: Screen.height }]}
          theme={{ colors: { background:"#ffffff" } }}
          backDrop={true}
          backDropColor="#000000"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
