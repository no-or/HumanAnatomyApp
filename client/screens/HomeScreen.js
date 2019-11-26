import * as WebBrowser from "expo-web-browser";
import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";

import colors from "../assets/colors";
import Card from "../components/Card";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <Card
              uri="http://www.aljanh.net/data/archive/img/3085128125.jpeg"
              cardTitle="New Quiz"
              callback={() => this.props.navigation.navigate("QuizzesStack")}
            />
            <Card
              uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
              cardTitle="Recommended Quiz"
            />
            <Card
              uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
              cardTitle="Recommended Flashcards"
            />
            <Card
              uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
              cardTitle="New Flashcards"
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  title: "Human Anatomy App",
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.primaryText,
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fff"
  },
  homeButtons: {
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  cardText: {
    padding: 10,
    fontSize: 16
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#002145"
  },
  content: {
    height: "100%",
    width: "100%"
  }
});
