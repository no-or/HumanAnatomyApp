import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../assets/colors";
import Flashcard from "../components/Flashcard";
import normalize from 'react-native-normalize';

export default class FlashStack extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [{
        "title": "Brown eggs",
        "answer": "data1"
      }, {
        "title": "Sweet fresh stawberry",
        "answer": "data2"
      }],
      right: 0
    };
  }

  static navigationOptions = {
    title: "FlashStack",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  handleSwipe(val) {
    this.setState({ right: this.state.right + val });
  };

  render() {

    var stack = [];

    this.state.data.forEach(function (tmp) {
        stack.push(
          <Flashcard
          uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
          cardTitle="Respiratory System"
          answer={tmp.answer}
          key={tmp.title}
          handleSwipe={this.handleSwipe.bind(this)}
          />
        );
    }.bind(this));

    return (
        //<TouchableOpacity onPress={alert("dsf")}> 
            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              
              {stack}
              <Text>{this.state.right}</Text>
            </View>
        //</TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(15),
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
