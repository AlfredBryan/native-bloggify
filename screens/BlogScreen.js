import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

export class BlogScreen extends Component {
  static navigationOptions = {
    title: "Blog",
    tabBarIcon: () => {
      return <Icon name="book" size={30} />;
    }
  };

  render() {
    return (
      <View>
        <Text>BlogScreen</Text>
        <Text>BlogScreen</Text>
        <Text>BlogScreen</Text>
        <Text>BlogScreen</Text>
      </View>
    );
  }
}

export default BlogScreen;
