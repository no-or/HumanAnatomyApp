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
    questions: [
      {
        question: "What is highlighted in the image above?",
        answers: ["Right Atrium", "Left Atrium", "Right Ventricle", "Left Ventricle"],
        correctAnswer: "Right Atrium",
        image: "http://www.aljanh.net/data/archive/img/3085128125.jpeg"
      },
      {
        question: "Name the highlighted region?",
        answers: ["Superior Vena Cava", "Pulmonary Trunk", "Moderator Band", "Trabeculae Carneae"],
        correctAnswer: "Moderator Band",
        image: "http://www.aljanh.net/data/archive/img/3085128125.jpeg"
      },
      {
        question: "What part of the heart is highlighted?",
        answers: ["Aortic Valve", "Pulmonary Valve", "Epicardium", "Myocardium"],
        correctAnswer: "Aortic Valve",
        image: "http://www.aljanh.net/data/archive/img/3085128125.jpeg"
      },
    ],
    questionIndex: 0,
    question: "What is highlighted in the image above?",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 5"],
    correctAnswer: "Answer 1"
  }

  _incrementIndex = () => {
    if(this.state.questionIndex < (this.state.questions.length - 1)) {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex+1
      }));
    }
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
              <Image style={styles.image} source={{ uri: this.state.questions[this.state.questionIndex].image }} />
            </ReactNativeZoomableView>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.textContainer}>
            
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                {this.state.questions[this.state.questionIndex].question}
              </Text>
            </View>
            
            <View style={styles.answers}>
              {this.state.questions[this.state.questionIndex].answers.map(answer => 
                <View style={styles.buttonContainer} key={answer}>
                  <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => null}
                    >
                    <Text style={styles.buttonTextStyle}>{answer}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.nextQuestionContainer}>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={this._incrementIndex}
                >
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
