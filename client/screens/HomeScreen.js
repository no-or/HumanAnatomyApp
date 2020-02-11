import * as WebBrowser from "expo-web-browser";
import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";

import colors from "../assets/colors";
import HomeCard from "../components/HomeCard";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            // contentContainerStyle={styles.contentContainer}
          >
            <HomeCard
              uri="http://www.aljanh.net/data/archive/img/3085128125.jpeg"
              cardTitle="New Heart Quiz"
              callback={() => this.props.navigation.navigate("Quiz")}
            />
            <HomeCard
              uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
              cardTitle="New Upper Limb Content"
              callback={() => this.props.navigation.navigate("Explore")}
            />
            <HomeCard
              uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
              cardTitle="New Neck Flashcards"
              callback={() => this.props.navigation.navigate("Flash")}
            />
            <HomeCard
              uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
              cardTitle="New Heart Content"
              callback={() => this.props.navigation.navigate("Explore")}
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
