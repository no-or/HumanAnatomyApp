import React, { Component } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View, Platform, Image, Text, Button, Dimensions, Alert } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import colors from "../assets/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants";
import offline from "../Offline";
import { Ionicons } from '@expo/vector-icons';

export default class Quizzes extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam("title"),
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerRight: (
      <TabBarIcon
        style={{marginRight: 15}}
        name={Platform.OS === "ios" ? "ios-information-circle" : "ios-information-circle"}
        onPress={() => navigation.navigate('AboutUs')}
      />
    ),
  });

  state = {
    questions: [
      {
        question: "This is a placeholder",
        answers: ["Right Atrium", "Left Atrium", "Right Ventricle", "Left Ventricle"],
        answerColors: {
          "Right Atrium": "green",
          "Left Atrium": colors.primary,
          "Right Ventricle": colors.primary,
          "Left Ventricle": colors.primary,
        },
        correctAnswer: "Right Atrium",
        image: "https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png",
        chosenAnswer: ""
      }
    ],
    questionIndex: 0,
    score: 0
  }

  /**
   * Function to increment index to move to next question.
   */
  _incrementIndex = () => {
    // if(this.state.questionIndex < (this.state.questions.length - 1)) {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex+1
      }));
    // }
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

  _getExplanation = (questionIndex) => {
    // update this to properly index explanation array!!!!
    Alert.alert("Why " + this.state.questions[questionIndex].correctAnswer + "?", 
                this.state.questions[questionIndex].explanation[0]);
  }

  componentDidMount() {
    this.loadData();
    // this.apiFetch();
  }

  loadData() {
    let off = new offline; // create new offline class
    let subregion = this.props.navigation.getParam("title"); // get subregion 
    let subregionParam = subregion.replace(" ", ""); // remove spaces

    // Promise grabs data for this quiz
    let promise = new Promise((resolve, reject) => {
      resolve(off.grabData(subregionParam, 'quiz'));
    }); 

    promise.then((data) => {
      // console.log(typeof(data));
      if(data == undefined) { // pull data from server
        this.apiFetch();
      } else { // use local data
        var questions = data.map(question => {
          var answerColors = {};
          for (var index in question.options) {
            var answer = question.options[index];
            answerColors[answer] = (answer === question.correctAnswer) ? "green" : colors.primary;
          }
          return {
            question: question.question,
            answers: question.options,
            answerColors: answerColors,
            correctAnswer: question.correctAnswer,
            image: question.imageUrl,
            chosenAnswer: "",
            explanation: question.explanation
          };
        });
  
        this.setState({
          questions: questions
        });
      }
    });
  }

  apiFetch() {
    let subregion = this.props.navigation.getParam("title");
    let subregionParam = subregion.replace(" ", "+");
    var host = HOST_NAME;

    // fetch entire region hierarchy from server
    fetch(host + '/quiz?region=' + subregionParam)
    .then((response) => {
      if(response.status == 200) {
        return response.json();
      } else {
        dummyData = [
          {
            "options": [
                "Placeholder A",
                "Placeholder B",
                "Placeholder C",
                "Placeholder D"
            ],
            "explanation": [
                "No explanation"
            ],
            "imageUrl": "https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png",
            "correctAnswer": "Placeholder A",
            "question": "No quiz available."
          }
        ]
        return dummyData;
      }
    })
    .then((responseJson) => {
      // set up format of data coming in from server
      var questions = responseJson.map(question => {
        var answerColors = {};
        for (var index in question.options) {
          var answer = question.options[index];
          answerColors[answer] = (answer === question.correctAnswer) ? "green" : colors.primary;
        }
        return {
          question: question.question,
          answers: question.options,
          answerColors: answerColors,
          correctAnswer: question.correctAnswer,
          image: question.imageUrl,
          chosenAnswer: "",
          explanation: question.explanation
        };
      });

      this.setState({
        questions: questions
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View>
        {this.state.questionIndex < (this.state.questions.length) ? 
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
                        // disabled={this.state.questions[this.state.questionIndex].chosenAnswer !== ""}
                        onPress={() => this._answerQuestion(answer)}
                        >
                        {answer == this.state.questions[this.state.questionIndex].correctAnswer 
                          && this.state.questions[this.state.questionIndex].chosenAnswer !== "" ?
                        <View style={styles.explanationBtn}>
                          <TouchableOpacity 
                          onPress={() => this._getExplanation(this.state.questionIndex)}
                          style={styles.explanationOpacity}>
                          <Ionicons
                            name={Platform.OS === "ios" ? "ios-help-circle" : "md-help-circle"}
                            size={20}
                            style={{
                              color: "white",
                              opacity: 0.8
                            }}
                            // onPress={() => this._getExplanation(this.state.questionIndex)}
                          />
                          </TouchableOpacity>
                        </View> 
                        :
                        <View></View>}
                        <Text style={styles.buttonTextStyle}>{answer}</Text>
                      </TouchableOpacity>
                    </View>
                  )}

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
                          // backgroundColor: (this.state.questionIndex == (this.state.questions.length - 1)) ? "#cccccc" : colors.primary,
                          backgroundColor: (this.state.questionIndex == (this.state.questions.length - 1)) ? colors.secondary : colors.primary,
                          borderColor: (this.state.questionIndex == (this.state.questions.length - 1)) ? "#999999" : colors.primary,
                          ...styles.nextButton
                        }}
                        onPress={this._incrementIndex}
                        // disabled={this.state.questionIndex == (this.state.questions.length - 1)}
                        >
                        <Text style={styles.buttonTextStyle}>
                          {this.state.questionIndex < (this.state.questions.length-1) ? "Next Question" : "F I N I S H" }
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

              </View>

              <View style={styles.progressIndicator} pointerEvents="none">
                <Text style={styles.progressText}>{(this.state.questionIndex + 1) + "/" + (this.state.questions.length)}</Text>
              </View>
          </View>
          : 
          <View style={styles.scoreStyle}>
            <View style={styles.scoreHeaderContainer}>
              <Text style={styles.finalScoreHeader}>FINAL SCORE</Text>
            </View>
            <View style={styles.scoreNumberContainer}>
              <Text style={styles.scoreNumber}>{"Correct: " + this.state.score}</Text>
              <Text style={styles.scoreNumber}>{"Incorrect: " + (this.state.questions.length - this.state.score)}</Text>
              <Text style={styles.scoreNumber}>{"Percentage: " + (this.state.score/this.state.questions.length*100) + "%"}</Text>
            </View>
          </View>
        }
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
    flex: 3
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
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  },
  prevContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    marginBottom: 5
  },
  nextContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
    marginBottom: 5
  },
  nextButton: {
    height: "100%",
    // paddingTop: 10,
    // paddingBottom: 10,
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
    flex: 1,
    width: Dimensions.get('window').width - 40,
    height: "100%",
    // padding: 10,
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
    // opacity: 10
    // backgroundColor: colors.primary
  },
  buttonTextStyle: {
    color: colors.primaryText
  },
  buttonContainer: {
    flex: 1,
    // flexDirection: "row"
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
    height: "100%",
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
  },
  scoreStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // flex: 1,
    // width: "100%",
    height: "100%",
    backgroundColor: colors.primary
  },
  finalScoreHeader: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  scoreHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  scoreNumberContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryText
  },
  explanationBtn: {
    position: "absolute",
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  explanationOpacity: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 20
  }
});
