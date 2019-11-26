import * as WebBrowser from 'expo-web-browser';
import Card from '../components/Card'

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

import colors from '../assets/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}> */}

        <View>
            <Card cardTitle="Test" uri="http://stmedia.stimg.co/4EMOJI111417.jpg"></Card>
        </View>

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
      display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeButtons: {
    marginBottom: 10, 
    marginTop: 10
  }
});
