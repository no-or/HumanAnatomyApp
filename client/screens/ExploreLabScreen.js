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
import TabBarIcon from "../components/TabBarIcon";

export default class ExploreLabScreen extends Component {
  
  static navigationOptions = ({navigation}) => ({
    title: 'Explore Lab',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerRight: (
      <TabBarIcon
        style={{marginRight: 15}}
        name={Platform.OS === "ios" ? "ios-information-circle" : "ios-information-circle"}
        onPress={() => navigation.navigate('AboutUs')}
      />
    ),
  });

  // This code is in charge of rendering all the content in this file
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            {/* These are the elements responsible for showing the Learn and Videos pages */}
            <Card
              uri={'randomExploreImage'}
              cardTitle="Learn"
              callback={() => this.props.navigation.navigate("ExploreLabLearn")}
            />
            <Card
              uri={'randomVideoImage'}
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
