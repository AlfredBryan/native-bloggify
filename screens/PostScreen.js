import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { Icon, Button, Text } from "react-native-elements";
import axios from "axios";

export class PostScreen extends Component {
  state = {
    author: "",
    title: "",
    post: "",
    image: null
  };

  static navigationOptions = {
    title: "Post",
    tabBarIcon: () => {
      return <Icon name="laptop" size={30} color="#03a5fc" />;
    }
  };

  handleAuthor = text => {
    this.setState({ author: text });
  };

  handleTitle = text => {
    this.setState({ title: text });
  };

  handlePost = text => {
    this.setState({ post: text });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { author, title, post, image } = this.state;
    let formdata = new FormData();
    formdata.append("author", author);
    formdata.append("title", title);
    formdata.append("post", post);
    formdata.append("image", image);
    axios({
      method: "post",
      url: "https://bloggify.herokuapp.com/api/post/add",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formdata
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        throw error;
      });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { author, title, post, image } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView style={styles.inputContainer}>
          <Text h3 style={{ marginBottom: 40, textAlign: "center" }}>
            Create Post
          </Text>
          <TextInput
            style={styles.input}
            value={author}
            placeholder="Author"
            placeholderTextColor="#03a5fc"
            onChangeText={this.handleAuthor}
          />
          <TextInput
            style={styles.input}
            value={title}
            placeholder="Title"
            placeholderTextColor="#03a5fc"
            onChangeText={this.handleTitle}
          />
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.input}
            value={post}
            placeholder="Write Post"
            placeholderTextColor="#03a5fc"
            onChangeText={this.handlePost}
          />
          <Button title="Post" onPress={this.handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 50,
    borderColor: "#03a5fc",
    borderWidth: 1,
    padding: 10
  },
  inputContainer: {
    marginTop: 120
  }
});

export default PostScreen;
