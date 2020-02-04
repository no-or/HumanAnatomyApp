import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import colors from "../assets/colors";
import Card from "../components/Card";

export default class FlashcardsScreen extends Component {
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
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <Card
                uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
                cardTitle="Respiratory System"
                callback={() => this.props.navigation.navigate("FlashStack")}
              />
              <Card
                uri="https://www.simtics.com/media/28745/mlla.jpg"
                cardTitle="Lower Limb"
                callback={() => this.props.navigation.navigate("FlashStack")}
              />
              <Card
                uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
                cardTitle="Upper Limb"
                callback={() => this.props.navigation.navigate("FlashStack")}
              />
              <Card
                uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
                cardTitle="Thorax"
                callback={() => this.props.navigation.navigate("FlashStack")}
              />
              <Card
                uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
                cardTitle="The Metacarpals"
                callback={() => this.props.navigation.navigate("FlashStack")}
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
