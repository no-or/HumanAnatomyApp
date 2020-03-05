import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import * as FileSystem from 'expo-file-system';

import colors from "../assets/colors";
import Card from "../components/Card";
import OnlineToggle from "../components/OnlineToggle";
import offline from "../Offline.js";

export default class FlashcardsScreen extends Component {

  constructor(props) {
    super(props);

    };


  static navigationOptions = {
    title: "Flashcards",
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
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <Card
              uri={FileSystem.documentDirectory + 'kittycat.jpg'}
              cardTitle="Heart"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Heart"})}
            ></Card><OnlineToggle region="Heart"></OnlineToggle>
            <Card
              uri="https://www.simtics.com/media/28745/mlla.jpg"
              cardTitle="Trunk"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Trunk"})}
            /><OnlineToggle region="Trunk"></OnlineToggle>
            <Card
              uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
              cardTitle="Upper Limb"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Upper Limb"})}
            /><OnlineToggle region="UpperLimbs"></OnlineToggle>
            <Card
              uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
              cardTitle="Lower Limb"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Lower Limb"})}
            /><OnlineToggle region="LowerLimbs"></OnlineToggle>
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
