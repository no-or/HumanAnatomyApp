import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { fromRight } from "react-navigation-transitions";

import TabBarIcon from "../components/TabBarIcon";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizzesScreen from "../screens/QuizzesScreen";
import FlashcardsScreen from "../screens/FlashcardsScreen";
import ExploreLabScreen from "../screens/ExploreLabScreen";
import colors from "../assets/colors";

//Todo how do we switch from welcome to home
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  { initialRouteName: "Home", transitionConfig: () => fromRight() }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const ExploreLabStack = createStackNavigator(
  {
    ExploreLab: ExploreLabScreen
  },
  { initialRouteName: "ExploreLab", transitionConfig: () => fromRight() }
);

ExploreLabStack.navigationOptions = {
  tabBarLabel: "Explore Lab",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-body" : "md-body"}
    />
  )
};

ExploreLabStack.path = "";

const QuizzesStack = createStackNavigator(
  {
    Quizzes: QuizzesScreen
  },
  { initialRouteName: "Quizzes", transitionConfig: () => fromRight() }
);

QuizzesStack.navigationOptions = {
  tabBarLabel: "Quizzes",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-document" : "md-document"}
    />
  )
};

QuizzesStack.path = "";

const FlashcardsStack = createStackNavigator(
  {
    Flashcards: FlashcardsScreen
  },
  { initialRouteName: "Flashcards", transitionConfig: () => fromRight() }
);

FlashcardsStack.navigationOptions = {
  tabBarLabel: "Flashcards",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-filing" : "md-filing"}
    />
  )
};

FlashcardsStack.path = "";

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ExploreLabStack,
    QuizzesStack,
    FlashcardsStack
  },
  {
    TabBarOptions: {
      activeTintColor: colors.tabActive,
      activeBackgroundColor: colors.primary,
      inactiveBackgroundColor: colors.primary,
      inactiveTintColor: colors.tabInactive
    }
  }
);

TabNavigator.path = "";

// const QuizStackNavigator = createStackNavigator({
//   Quiz: _
// })

const RootNavigator = createSwitchNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Root: TabNavigator
  },
  {
    initialRouteName: "Welcome"
  }
);

export default RootNavigator;
