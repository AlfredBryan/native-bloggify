import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import BlogScreen from "./screens/BlogScreen";
import PostScreen from "./screens/PostScreen";

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  home: { screen: HomeScreen },
  main: {
    screen: createBottomTabNavigator({
      blog: { screen: BlogScreen },
      post: { screen: PostScreen }
    })
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
