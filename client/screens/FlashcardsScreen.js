import React, { Component } from 'react';
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

export default class FlashcardsScreen extends Component {
  
  static navigationOptions = {
    title: 'Flashcards',
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
      <View>

      </View>
    );
  }
}
