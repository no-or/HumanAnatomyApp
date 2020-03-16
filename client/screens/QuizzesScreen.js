import React, { Component } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View, Platform } from "react-native";
import Card from "../components/Card";
import colors from "../assets/colors";
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants";
import Accordion from '../components/Accordion';

export default class Quizzes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    }
  };

  componentDidMount() {
    this.apiFetch();
  }
  
  apiFetch() {
    var host = HOST_NAME;

    // fetch entire region hierarchy from server
    fetch(host+'/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({menu: responseJson[0]});
    })
    .catch((error) => {
      console.log(error);
      console.error(error);
    });
  }

  // Set name and add info button for topbar
  static navigationOptions = ({navigation}) => ({
    title: "Quizzes",
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
    const items = [];
    if (this.state.menu) {
      this.state.menu.regions.map((item) => {
        items.push(
          <Accordion
              title = {item.region}
              data = {item.subRegions}
              key = {item.region}
              id = {item.region}
              image = {item.imageUrl}
              path = "Quiz"
              navigation = {this.props.navigation}
              type = "quiz"
          />
        );
      })
    }
    return items;
  //   return (
  //       <SafeAreaView style={styles.wrapper}>
  //         <View style={styles.content}>
  //           <ScrollView style={styles.container}>
  //             <Card
  //               uri="http://www.aljanh.net/data/archive/img/3085128125.jpeg"
  //               cardTitle="Heart"
  //               callback={() => this.props.navigation.navigate("Quiz", {
  //                 questions: this.state.heart
  //               })}
  //             />
  //             <Card
  //               uri="https://cayugaent.com/wp-content/uploads/2016/01/Cayuga-ENT-HeadandNeckCancer.jpg"
  //               cardTitle="Head & Neck"
  //               callback={() => this.props.navigation.navigate("Quiz", {
  //                 questions: this.state.heart
  //               })}
  //             />
  //             <Card
  //               uri="https://www.simtics.com/media/28745/mlla.jpg"
  //               cardTitle="Lower Limb"
  //               callback={() => this.props.navigation.navigate("Quiz", {
  //                 questions: this.state.heart
  //               })}
  //             />
  //             <Card
  //               uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
  //               cardTitle="Upper Limb"
  //               callback={() => this.props.navigation.navigate("Quiz", {
  //                 questions: this.state.heart
  //               })}
  //             />
  //             <Card
  //               uri="https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg"
  //               cardTitle="The Metacarpals"
  //               callback={() => this.props.navigation.navigate("Quiz", {
  //                 questions: this.state.heart
  //               })}
  //             />
  //           </ScrollView>
  //         </View>
  //       </SafeAreaView>
  //   );
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
