import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import QuizzesScreen from '../screens/QuizzesScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import ExploreLabScreen from '../screens/ExploreLabScreen';
import colors from '../assets/colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  }, 
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const ExploreLabStack = createStackNavigator(
  {
    ExploreLab: ExploreLabScreen,
  },
  config
);

ExploreLabStack.navigationOptions = {
  tabBarLabel: 'Explore Lab',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-body' : 'md-body'} />
  ),
};

ExploreLabStack.path = '';

const QuizzesStack = createStackNavigator(
  {
    Quizzes: QuizzesScreen,
  },
  config
);

QuizzesStack.navigationOptions = {
  tabBarLabel: 'Quizzes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'} />
  ),
};

QuizzesStack.path = '';

const FlashcardsStack = createStackNavigator(
  {
    Flashcards: FlashcardsScreen,
  },
  config
);

FlashcardsStack.navigationOptions = {
  tabBarLabel: 'Flashcards',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'} />
  ),
};

FlashcardsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ExploreLabStack,
  QuizzesStack,
  FlashcardsStack,
},
{tabBarOptions: {
  activeTintColor: colors.tabActive,
  activeBackgroundColor: colors.primary,
  inactiveBackgroundColor: colors.primary,
  inactiveTintColor: colors.tabInactive
}});

tabNavigator.path = '';

export default tabNavigator;
