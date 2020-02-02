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
        answerColors: {
          "Right Atrium": "green",
          "Left Atrium": colors.primary,
          "Right Ventricle": colors.primary,
          "Left Ventricle": colors.primary,
        },
        correctAnswer: "Right Atrium",
        image: "http://www.aljanh.net/data/archive/img/3085128125.jpeg",
        chosenAnswer: ""
      },
      {
        question: "Name the highlighted region?",
        answers: ["Superior Vena Cava", "Pulmonary Trunk", "Moderator Band", "Trabeculae Carneae"],
        answerColors: {
          "Superior Vena Cava": colors.primary,
          "Pulmonary Trunk": colors.primary,
          "Moderator Band": "green",
          "Trabeculae Carneae": colors.primary,
        },
        correctAnswer: "Moderator Band",
        image: "https://www.kiwikidsnews.co.nz/wp-content/uploads/2014/08/mana-hone.jpeg",
        chosenAnswer: ""
      },
      {
        question: "What part of the heart is highlighted?",
        answers: ["Aortic Valve", "Pulmonary Valve", "Epicardium", "Myocardium"],
        answerColors: {
          "Aortic Valve": "green",
          "Pulmonary Valve": colors.primary,
          "Epicardium": colors.primary,
          "Myocardium": colors.primary,
        },
        correctAnswer: "Aortic Valve",
        image: "http://www.aljanh.net/data/archive/img/3085128125.jpeg",
        chosenAnswer: ""
      },
    ],
    questionIndex: 0,
    score: 0
  }

  /**
   * Function to increment index to move to next question.
   */
  _incrementIndex = () => {
    if(this.state.questionIndex < (this.state.questions.length - 1)) {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex+1
      }));
    }
  }

  /**
   * Function to decrement index to move to previous question.
   */
  _decrementIndex = () => {
    if(this.state.questionIndex > 0) {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex-1
      }));
    }
  }

  _answerQuestion = (answer) => {
    if(this.state.questions[this.state.questionIndex].chosenAnswer === "") {

      let scoreIncrement = 1;

      let questionsArr = this.state.questions;
      questionsArr[this.state.questionIndex].chosenAnswer = answer;

      if(answer !== this.state.questions[this.state.questionIndex].correctAnswer) {
        questionsArr[this.state.questionIndex].answerColors[answer] = "red";
        scoreIncrement = 0;
      }

      this.setState(prevState => ({
        questions: questionsArr,
        score: prevState.score + scoreIncrement
      }))

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
                    style={{
                      backgroundColor: this.state.questions[this.state.questionIndex].chosenAnswer === "" ? colors.primary : this.state.questions[this.state.questionIndex].answerColors[answer],
                      ...styles.buttonStyle
                    }}
                    disabled={this.state.questions[this.state.questionIndex].chosenAnswer !== ""}
                    onPress={() => this._answerQuestion(answer)}
                    >
                    <Text style={styles.buttonTextStyle}>{answer}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.nextQuestionContainer}>
              <View style={styles.prevContainer}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: (this.state.questionIndex == 0) ? "#cccccc" : colors.primary,
                    borderColor: (this.state.questionIndex == 0) ? "#999999" : colors.primary,
                    ...styles.nextButton
                  }}
                  onPress={this._decrementIndex}
                  disabled={this.state.questionIndex == 0}
                  >
                  <Text style={styles.buttonTextStyle}>Prev Question</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.nextContainer}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: (this.state.questionIndex == (this.state.questions.length - 1)) ? "#cccccc" : colors.primary,
                    borderColor: (this.state.questionIndex == (this.state.questions.length - 1)) ? "#999999" : colors.primary,
                    ...styles.nextButton
                  }}
                  onPress={this._incrementIndex}
                  disabled={this.state.questionIndex == (this.state.questions.length - 1)}
                  >
                  <Text style={styles.buttonTextStyle}>Next Question</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>{(this.state.questionIndex + 1) + "/" + (this.state.questions.length)}</Text>
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
    flex: 3,
    backgroundColor: "#f0f0f0",
    overflow: "hidden"
  },
  divider: {
    flex: 0.005,
    backgroundColor: "#0004"
  },
  textContainer: {
    flex: 4
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
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10
  },
  nextQuestionContainer: {
    flexDirection: "row",
    margin: 20
  },
  prevContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "flex-start"
  },
  nextContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "flex-end"
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
    // backgroundColor: colors.primary
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
    // backgroundColor: colors.primary
  },
  buttonTextStyle: {
    color: colors.primaryText
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row"
  },
  progressIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    paddingTop: 5,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    alignContent: "flex-start",
    flex: 1,
    width: "100%",
    height: "100%"
  },
  progressText: {
    backgroundColor: "#fff",
    opacity: 0.7,
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 1
  }
});
