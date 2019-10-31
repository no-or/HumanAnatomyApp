import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

import colors from '../resources/colors';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}> */}

      <View
        style={styles.homeButtons} >
        <Button 
          // onPress={this.printLog} 
          title="Explore Lab"
          color={colors.secondary} />
      </View>

      <View
        style={styles.homeButtons} >
        <Button 
          // onPress={this.addTime} 
          title="Quizzes"
          color={colors.secondary} />
      </View>

      <View
        style={styles.homeButtons} >
        <Button 
          // onPress={this.printLog} 
          title="Flashcards"
          color={colors.secondary} />
      </View>

      <View
        style={styles.homeButtons} >
        <Button 
          // onPress={this.printLog} 
          title="About"
          color={colors.secondary} />
      </View>

      {/* </ScrollView> */}
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'UBC Human Anatomy',
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTintColor: colors.primaryText,
  headerTitleStyle: {
      fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  homeButtons: {
    marginBottom: 10, 
    marginTop: 10
  }
});
