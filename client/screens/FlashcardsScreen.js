import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import colors from "../assets/colors";
import Card from "../components/Card";
import TabBarIcon from "../components/TabBarIcon";

export default class FlashcardsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Flashcards",
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

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <Card
              uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
              cardTitle="Respiratory System"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Heart"})}
            />
            <Card
              uri="https://www.simtics.com/media/28745/mlla.jpg"
              cardTitle="Lower Limb"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Thorax"})}
            />
            <Card
              uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
              cardTitle="Upper Limb"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Heart"})}
            />
            <Card
              uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
              cardTitle="Thorax"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Thorax"})}
            />
            <Card
              uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
              cardTitle="The Metacarpals"
              callback={() => this.props.navigation.navigate("FlashStack", {region: "Heart"})}
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
