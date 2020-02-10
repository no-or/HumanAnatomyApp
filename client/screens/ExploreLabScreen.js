import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";

export default class ExploreLabScreen extends Component {
  
  static navigationOptions = {
    title: 'Explore Lab',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
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
              uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
              cardTitle="Learn"
              callback={() => this.props.navigation.navigate("ExploreLabLearn")}
            />
            <Card
              uri="https://www.simtics.com/media/28745/mlla.jpg"
              cardTitle="Videos"
              callback={() => this.props.navigation.navigate("ExploreLabVideos")}
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
