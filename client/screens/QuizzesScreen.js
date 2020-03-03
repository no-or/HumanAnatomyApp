import React, { Component } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";
import Card from "../components/Card";
import colors from "../assets/colors";

export default class Quizzes extends Component {
  static navigationOptions = {
    title: "Quizzes",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {
    heart: [
      {
        question: "What region is labelled by the letter O?",
        answers: ["Right Atrium", "Left Atrium", "Pulmonary Valve", "Left Ventricle"],
        answerColors: {
          "Right Atrium": colors.primary,
          "Left Atrium": colors.primary,
          "Pulmonary Valve": "green",
          "Left Ventricle": colors.primary,
        },
        correctAnswer: "Pulmonary Valve",
        image: "http://d1tjf70w3r56al.cloudfront.net/1582915594990",
        chosenAnswer: ""
      },
      {
        question: "What region is labelled by the letter G?",
        answers: ["Superior Vena Cava", "Auricle R", "Mitral Valve", "Trabeculae Carneae"],
        answerColors: {
          "Superior Vena Cava": colors.primary,
          "Mitral Valve": colors.primary,
          "Auricle R": "green",
          "Trabeculae Carneae": colors.primary,
        },
        correctAnswer: "Auricle R",
        image: "http://d1tjf70w3r56al.cloudfront.net/1582915819797",
        chosenAnswer: ""
      },
      {
        question: "What region is labelled by the letter O?",
        answers: ["Right Atrium", "Left Atrium", "Pulmonary Valve", "Left Ventricle"],
        answerColors: {
          "Right Atrium": colors.primary,
          "Left Atrium": colors.primary,
          "Pulmonary Valve": "green",
          "Left Ventricle": colors.primary,
        },
        correctAnswer: "Pulmonary Valve",
        image: "http://d1tjf70w3r56al.cloudfront.net/1582915594990",
        chosenAnswer: ""
      },
      {
        question: "What region is labelled by the letter G?",
        answers: ["Superior Vena Cava", "Auricle R", "Mitral Valve", "Trabeculae Carneae"],
        answerColors: {
          "Superior Vena Cava": colors.primary,
          "Mitral Valve": colors.primary,
          "Auricle R": "green",
          "Trabeculae Carneae": colors.primary,
        },
        correctAnswer: "Auricle R",
        image: "http://d1tjf70w3r56al.cloudfront.net/1582915819797",
        chosenAnswer: ""
      },
    ],

  }

  componentDidMount() {
    // console.log("hello");

    // fetch("http://128.189.89.238:8080/quiz?region=Heart").then(res => console.log(res));
  }

  render() {
    return (
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ScrollView style={styles.container}>
              <Card
                uri="http://www.aljanh.net/data/archive/img/3085128125.jpeg"
                cardTitle="Heart"
                callback={() => this.props.navigation.navigate("Quiz", {
                  questions: this.state.heart
                })}
              />
              <Card
                uri="https://cayugaent.com/wp-content/uploads/2016/01/Cayuga-ENT-HeadandNeckCancer.jpg"
                cardTitle="Head & Neck"
                callback={() => this.props.navigation.navigate("Quiz", {
                  questions: this.state.heart
                })}
              />
              <Card
                uri="https://www.simtics.com/media/28745/mlla.jpg"
                cardTitle="Lower Limb"
                callback={() => this.props.navigation.navigate("Quiz", {
                  questions: this.state.heart
                })}
              />
              <Card
                uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
                cardTitle="Upper Limb"
                callback={() => this.props.navigation.navigate("Quiz", {
                  questions: this.state.heart
                })}
              />
              <Card
                uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
                cardTitle="The Metacarpals"
                callback={() => this.props.navigation.navigate("Quiz", {
                  questions: this.state.heart
                })}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrapper: {
    flex: 1
  },
  content: {
    height: "100%",
    width: "100%"
  }
});
