import React, { Component } from "react";
import { Text, View } from "react-native";

class ExampleComponent extends Component {
  render() {
    const { text } = this.props;
    return (
      <View>
        <Text>{text}</Text>
      </View>
    );
  }
}

export { ExampleComponent };