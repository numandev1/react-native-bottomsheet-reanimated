import React, {Component} from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import BottomSheet from "react-native-bottomsheet-reanimated";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

class App extends Component {
  componentDidMount(){
    // console.log(this.refs,"nomi")
  }
  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref="BottomSheet"
          initialPosition={{ y: 300 }}
          snapPoints={[{ y: 100 }, { y: Screen.height }]}
          theme={{ colors: { background:"#ffffff" } }}
          backDrop={true}
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
