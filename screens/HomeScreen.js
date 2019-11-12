import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Card, Button } from "react-native-elements";
import axios from "axios";

export class HomeScreen extends Component {
  state = {
    post: [],
    loading: false
  };

  fetchPost = () => {
    this.setState({ loading: true });
    axios
      .get("https://bloggify.herokuapp.com/api/post")
      .then(res => {
        this.setState({ post: res.data, loading: false });
      })
      .catch(err => {
        throw err;
      });
  };

  componentDidMount() {
    this.fetchPost();
  }

  renderPost() {
    return this.state.post.map(blog => {
      return (
        <Card key={blog._id} title={blog.title} image={{ uri: blog.image }}>
          <Text style={{ marginBottom: 10 }}>{blog.post}</Text>
          <Text
            style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}
          >
            Comments ({blog.comments.length})
          </Text>
          <Button
            icon={{ name: "code", color: "white" }}
            style={styles.buttonStyle}
            title="Comment"
            onPress={() => this.props.navigation.navigate("blog", { blog })}
          ></Button>
        </Card>
      );
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <View>
        {loading ? (
          <ActivityIndicator
            style={styles.container}
            size="large"
            color="#0000ff"
          />
        ) : (
          <ScrollView>{this.renderPost()}</ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300
  }
});

export default HomeScreen;
