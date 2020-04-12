import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import * as FileSystem from 'expo-file-system';

import colors from "../assets/colors";
import Card from "../components/Card";
import OnlineToggle from "../components/OnlineToggle";
import offline from "../Offline.js";
import TabBarIcon from "../components/TabBarIcon"
import {HOST_NAME} from "../constants/Constants"
import Accordion from '../components/Accordion'

export default class FlashcardsScreen extends Component {

  constructor(props) {
    super(props);

    this.state= {
      menu: null,
    }

    //instantiate new instance of Offline class to latch into local storage methods.
    this.off =  new offline;

      //This promise is meant to retrive the hierarchy data from local storage to populate the menu with.
      let promise = new Promise((resolve, reject) => {
          resolve(this.off.FetchHierarchy());
      }) 
      
      promise.then((data) => {
        this.setState({menu: data});
      })
      .catch((error)=> {
        console.error(error);
      });

    };

    componentDidMount() {
      // Unused.
    }
  
    // fetch flashcard data from server as JSON data
    apiFetch() {
      var host = HOST_NAME
  
      fetch(host+'/hierarchy')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({menu: responseJson[0]});
      })
      .catch((error) => {
        console.error(error);
      });
    }

    // top nav bar details
  static navigationOptions = ({navigation}) => ({
    title: "Flashcards",
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

  render() {

    const items = [];
    //generate the region/subregion menu
    if (this.state.menu) {
      this.state.menu.regions.map((item) => {
        items.push(
                <Accordion
                    title = {item.region}
                    data = {item.subRegions}
                    key = {item.region}
                    id = {item.region}
                    image = {item.imageUrl}
                    path = "FlashStack"
                    navigation = {this.props.navigation}
                    type = "flashcard"
                />
            );
      })
    }
    return (
      <ScrollView>
      {items}
      </ScrollView>
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
