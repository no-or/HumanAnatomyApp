import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import colors from '../assets/colors';

export default class Quizzes extends Component {

  static navigationOptions = {
    title: 'Quizzes',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container}>
  
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
