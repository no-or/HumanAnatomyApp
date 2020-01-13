import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";

export default class ExploreLabLearnScreen extends Component {
  
  static navigationOptions = {
    title: 'Learn',
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
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
            <Card
                uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
                cardTitle="Head & Back"
            />
            <Card
                uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
                cardTitle="Upper Limb"
            />
            <Card
                uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
                cardTitle="Lower Limb"
            />
            <Card
                uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
                cardTitle="Trunk"
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
