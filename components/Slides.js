import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View style={styles.alignButton}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Continue"
            raised
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Image source={{ uri: slide.photo }} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: "#0288D1"
  },
  alignButton: {
    width: 150,
    marginLeft: 110
  },
  imageStyle: {
    width: 350,
    height: 200,
    marginLeft: 5
  }
};

export default Slides;
