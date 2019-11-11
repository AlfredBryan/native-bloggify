import React, { Component } from "react";
import { View, Text } from "react-native";

import Slides from "../components/Slides";

const SLIDE_DATA = [
  {
    text: "Welcome to Bloggify",
    color: "#03A9F4",
    photo:
      "https://res.cloudinary.com/daviluiz/image/upload/v1573493293/blog1.png"
  },
  {
    text: "Recent News on your fingertips",
    color: "#009688",
    photo:
      "https://res.cloudinary.com/daviluiz/image/upload/v1573493311/blog2.jpg"
  },
  {
    text: "Start reading or writing",
    color: "#03A9F4",
    photo:
      "https://res.cloudinary.com/daviluiz/image/upload/v1573493328/blog3.jpg"
  }
];

export class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
