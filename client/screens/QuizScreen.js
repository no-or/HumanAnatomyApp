import React, { Component } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, Button, Dimensions } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import colors from "../assets/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Quizzes extends Component {
  static navigationOptions = {
    title: "Quiz",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {

  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ReactNativeZoomableView 
              maxZoom={2.5}
              minZoom={1.0}
              zoomStep={0.1}
              initialZoom={1.0}
              bindToBorders={true}
              style={styles.zoomableView}
            >
              <Image style={styles.image} source={{ uri: "http://www.aljanh.net/data/archive/img/3085128125.jpeg" }} />
            </ReactNativeZoomableView>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.textContainer}>
            
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                What is highlighted in the image above?
              </Text>
            </View>
            
            <View style={styles.answers}>
              {["Answer 1", "Answer 2", "Answer 3", "Answer 4"].map(question => 
                <View style={styles.buttonContainer} key={question}>
                  <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>{question}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Hello</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text>Hello</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text>Hello</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text>Hello</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text>Hello</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.nextQuestionContainer}>
              <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.buttonTextStyle}>Next Question</Text>
              </TouchableOpacity>
            </View>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    overflow: "hidden"
  },
  divider: {
    flex: 0.005,
    backgroundColor: "#0004"
  },
  textContainer: {
    flex: 2
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  zoomableView: {
    alignContent: "center",
    alignItems: 'center',
  },
  questionContainer: {
    alignContent: "center",
    padding: 10
  },
  nextQuestionContainer: {
    alignContent: "center",
    alignItems: "flex-end",
    // padding: 10,
    // margin: 10
  },
  nextButton: {
    height: 45,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: colors.primary
  },
  question: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  answers: {
    alignContent: "center",
    alignItems: 'center',
    justifyContent: "space-around",
    flex: 1,
  },
  buttonStyle: {
    // flex: 1,
    width: Dimensions.get('window').width - 40,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.primary
  },
  buttonTextStyle: {
    color: colors.primaryText
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row"
  }
});
