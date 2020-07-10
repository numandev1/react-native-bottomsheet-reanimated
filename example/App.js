import React from "react";
import { StyleSheet, View } from "react-native";

import { ExampleComponent } from "react-native-bottomsheet-reanimated";

const App = () => {
  return (
    <View style={styles.container}>
      <ExampleComponent text="Create Expo Library Example 😄" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
});

export default App;
