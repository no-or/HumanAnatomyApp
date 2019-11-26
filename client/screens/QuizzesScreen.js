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

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <Card
                style={styles.card}
                uri="http://www.aljanh.net/data/archive/img/3085128125.jpeg"
                cardTitle="Heart"
                callback={() => this.props.navigation.navigate("Quiz")}
              />
              <Card
                style={styles.card}
                uri="https://cayugaent.com/wp-content/uploads/2016/01/Cayuga-ENT-HeadandNeckCancer.jpg"
                cardTitle="Head & Neck"
                callback={() => this.props.navigation.navigate("Quiz")}
              />
              <Card
                uri="https://www.simtics.com/media/28745/mlla.jpg"
                cardTitle="Lower Libm"
                callback={() => this.props.navigation.navigate("Flash")}
              />
              <Card
                uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
                cardTitle="Upper Limb"
                callback={() => this.props.navigation.navigate("Quiz")}
              />
              <Card
                uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
                cardTitle="The Metacarpals"
                callback={() => this.props.navigation.navigate("Quiz")}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
