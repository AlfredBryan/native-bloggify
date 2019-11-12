import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Icon, Button } from "react-native-elements";
import axios from "axios";

export class BlogScreen extends Component {
  state = {
    comments: [],
    comment: ""
  };
  static navigationOptions = {
    title: "Blog",
    tabBarIcon: () => {
      return <Icon name="book" size={30} color="#03a5fc" />;
    }
  };

  renderComments() {
    return this.state.comments.map(comment => {
      return (
        <View style={styles.commentStyle} key={comment._id}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {comment.comment}
          </Text>
        </View>
      );
    });
  }

  postComment = e => {
    e.preventDefault();
    const {
      navigation: {
        state: {
          params: { blog }
        }
      }
    } = this.props;
    const { comment } = this.state;
    axios
      .post(`https://bloggify.herokuapp.com/api/post/${blog._id}/comment`, {
        comment
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ comment: "" });
        }
      });
  };

  fetchComments = () => {
    const {
      navigation: {
        state: {
          params: { blog }
        }
      }
    } = this.props;
    axios
      .get(`https://bloggify.herokuapp.com/api/post/${blog._id}`)
      .then(res => {
        this.setState({ comments: res.data.comments });
      });
  };

  componentDidMount() {
    this.update = setInterval(() => this.fetchComments(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  handleChange = text => {
    this.setState({ comment: text });
  };

  render() {
    const { comment } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView style={styles.commentContainer}>
          {this.renderComments()}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={comment}
              placeholder="Comment"
              placeholderTextColor="#03a5fc"
              onChangeText={this.handleChange}
            />
            <Button
              title="Comment"
              buttonStyle={styles.buttonStyle}
              onPress={this.postComment}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  commentStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#03a5fc",
    padding: 5,
    borderRadius: 10,
    marginTop: 5
  },
  commentContainer: {
    marginTop: 50
  },
  buttonStyle: {
    borderRadius: 10
  },
  inputContainer: {
    marginTop: 50
  },
  input: {
    margin: 10,
    height: 50,
    borderColor: "#03a5fc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20
  }
});

export default BlogScreen;
