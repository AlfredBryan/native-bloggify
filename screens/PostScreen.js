import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

export class PostScreen extends Component {
  static navigationOptions = {
    title: "Post",
    tabBarIcon: () => {
      return <Icon name="laptop" size={30} />;
    }
  };
  render() {
    return (
      <View>
        <Text>PostScreen</Text>
        <Text>PostScreen</Text>
        <Text>PostScreen</Text>
        <Text>PostScreen</Text>
      </View>
    );
  }
}

export default PostScreen;
