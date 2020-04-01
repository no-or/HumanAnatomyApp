import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Platform, ScrollView, StyleSheet, SafeAreaView, View, Button } from "react-native";
import TabBarIcon from "../components/TabBarIcon";

import colors from "../assets/colors";
import HomeCard from "../components/HomeCard";
import {HOST_NAME} from "../constants/Constants"

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: null,
      regionArray: null,
    }
  }

  componentDidMount() {
    this.apiFetch();
  }

  apiFetch() {
    var host = HOST_NAME
    fetch(host+'/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({response: responseJson[0]});
      this.randomRegions();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  randomRegions = () => {
    regionArray = [];
    this.state.response.regions.map((region) => {
      region.subRegions.forEach(subregion => {
        regionArray.push(subregion.subRegion)
      })
    })
    this.setState({regionArray: regionArray})
  }

  randomPath = (path) => {
    let {regionArray} = this.state
    let randomRegionIndex = Math.floor(Math.random()*regionArray.length)
    let randomRegion = regionArray[randomRegionIndex]
    this.props.navigation.push(path, {
      title: randomRegion,
      navigation: this.props.navigation
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
          >
            <HomeCard
              uri={'randomQuizImage'}
              cardTitle="Random Quizzes"
              callback={() => this.randomPath("Quiz")}
            />
            <HomeCard
              uri={'randomFlashcardImage'}
              cardTitle="Random Flashcards"
              callback={() => this.randomPath("FlashStack")}
            />
            <HomeCard
              uri={'randomExploreImage'}
              cardTitle="Random Explore Cards"
              callback={() => this.randomPath("ExploreLabLearnDropdownOption")}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: "Human Anatomy Teaching App",
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
